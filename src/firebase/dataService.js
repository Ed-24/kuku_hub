import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getDBService } from './firebaseConfig';

const getDb = () => getDBService();

// ============ PRODUCTS ============
export const addProduct = async (farmerId, productData) => {
  try {
    const productRef = doc(collection(getDb(), 'products'));
    await setDoc(productRef, {
      ...productData,
      farmerId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, id: productRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProducts = async () => {
  try {
    const q = query(collection(getDb(), 'products'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProductsByFarmer = async (farmerId) => {
  try {
    const q = query(
      collection(getDb(), 'products'),
      where('farmerId', '==', farmerId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProduct = async (productId) => {
  try {
    const docSnap = await getDoc(doc(getDb(), 'products', productId));
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: 'Product not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateProduct = async (productId, updateData) => {
  try {
    await updateDoc(doc(getDb(), 'products', productId), {
      ...updateData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(getDb(), 'products', productId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ ORDERS ============
export const createOrder = async (buyerId, orderData) => {
  try {
    const orderRef = doc(collection(getDb(), 'orders'));
    await setDoc(orderRef, {
      ...orderData,
      buyerId,
      orderNumber: `ORD-${Date.now()}`,
      status: 'pending', // pending, confirmed, shipped, delivered
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, id: orderRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getOrdersByBuyer = async (buyerId) => {
  try {
    const q = query(
      collection(getDb(), 'orders'),
      where('buyerId', '==', buyerId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getOrdersByFarmer = async (farmerId) => {
  try {
    const q = query(
      collection(getDb(), 'orders'),
      where('farmerId', '==', farmerId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await updateDoc(doc(getDb(), 'orders', orderId), {
      status,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ CART ============
export const addToCart = async (buyerId, productId, quantity) => {
  try {
    const cartRef = doc(getDb(), 'carts', buyerId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const cart = cartSnap.data();
      const items = cart.items || [];
      const existingItem = items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ productId, quantity });
      }

      await updateDoc(cartRef, {
        items,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(cartRef, {
        buyerId,
        items: [{ productId, quantity }],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCart = async (buyerId) => {
  try {
    const docSnap = await getDoc(doc(getDb(), 'carts', buyerId));
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: true, data: { items: [] } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const removeFromCart = async (buyerId, productId) => {
  try {
    const cartRef = doc(getDb(), 'carts', buyerId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const items = cartSnap.data().items.filter((item) => item.productId !== productId);
      await updateDoc(cartRef, { items, updatedAt: serverTimestamp() });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const clearCart = async (buyerId) => {
  try {
    await updateDoc(doc(getDb(), 'carts', buyerId), {
      items: [],
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ MESSAGES ============
export const sendMessage = async (senderId, receiverId, messageData) => {
  try {
    const messageRef = doc(collection(getDb(), 'messages'));
    await setDoc(messageRef, {
      ...messageData,
      senderId,
      receiverId,
      createdAt: serverTimestamp(),
      read: false,
    });
    return { success: true, id: messageRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getConversation = async (userId1, userId2) => {
  try {
    const q = query(
      collection(getDb(), 'messages'),
      where('senderId', '==', userId1),
      where('receiverId', '==', userId2),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: messages };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ USER PROFILE ============
export const updateUserProfile = async (uid, profileData) => {
  try {
    await updateDoc(doc(getDb(), 'users', uid), {
      ...profileData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ REVIEWS ============
export const addReview = async (productId, buyerId, reviewData) => {
  try {
    const reviewRef = doc(collection(getDb(), 'reviews'));
    await setDoc(reviewRef, {
      ...reviewData,
      productId,
      buyerId,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: reviewRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProductReviews = async (productId) => {
  try {
    const q = query(
      collection(getDb(), 'reviews'),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: reviews };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
