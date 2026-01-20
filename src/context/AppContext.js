import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, getUserProfile, logout as firebaseLogout } from '../firebase/authService';
import { getCart, getOrdersByBuyer } from '../firebase/dataService';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userType, setUserType] = useState('buyer'); // 'buyer' or 'supplier'
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Firebase Auth State
  useEffect(() => {
    console.log('[CONTEXT] Setting up auth listener');
    const unsubscribe = onAuthStateChangedListener(async (firebaseUser) => {
      console.log('[CONTEXT] Auth state changed:', firebaseUser?.uid || 'No user');
      
      if (firebaseUser) {
        setUser(firebaseUser);
        console.log('[CONTEXT] User set, attempting to fetch profile');
        
        // Get user profile from Firestore
        try {
          const profileResult = await getUserProfile(firebaseUser.uid);
          console.log('[CONTEXT] Profile fetch result:', profileResult.success, profileResult.error);
          
          if (profileResult.success && profileResult.data) {
            console.log('[CONTEXT] Profile found and set:', profileResult.data.displayName);
            console.log('[CONTEXT] IMPORTANT - Profile data userType is:', profileResult.data.userType);
            setUserProfile(profileResult.data);
            const finalUserType = profileResult.data.userType || 'buyer';
            console.log('[CONTEXT] IMPORTANT - Setting userType to:', finalUserType);
            setUserType(finalUserType);

            // Load cart for buyers
            if (profileResult.data.userType === 'buyer') {
              try {
                const cartResult = await getCart(firebaseUser.uid);
                if (cartResult.success && cartResult.data.items) {
                  setCart(cartResult.data.items);
                  console.log('[CONTEXT] Cart loaded with', cartResult.data.items.length, 'items');
                }
              } catch (cartError) {
                console.error('[CONTEXT] Cart load error:', cartError);
              }
            }

            // Load orders
            try {
              const ordersResult = await getOrdersByBuyer(firebaseUser.uid);
              if (ordersResult.success) {
                setOrders(ordersResult.data);
                console.log('[CONTEXT] Orders loaded:', ordersResult.data.length);
              }
            } catch (ordersError) {
              console.error('[CONTEXT] Orders load error:', ordersError);
            }
          } else {
            console.warn('⚠️ [CONTEXT] Profile not found, user may be new or profile not saved');
            setUserProfile(null);
            setUserType('buyer');
          }
        } catch (error) {
          console.error('[CONTEXT] Error in auth state handler:', error);
        }
      } else {
        console.log('[CONTEXT] User logged out');
        setUser(null);
        setUserProfile(null);
        setUserType('buyer');
        setCart([]);
        setOrders([]);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (userData, type = 'buyer') => {
    setUser(userData);
    setUserType(type);
  };

  const logout = async () => {
    const result = await firebaseLogout();
    if (result.success) {
      setUser(null);
      setUserProfile(null);
      setUserType('buyer');
      setCart([]);
      setOrders([]);
      return { success: true };
    }
    return result;
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId: product.id, ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    addNotification({
      title: 'Order Placed',
      message: 'Your Order Has Been Placed Successfully',
      type: 'success',
    });
    return newOrder;
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const value = {
    user,
    userProfile,
    userType,
    cart,
    orders,
    notifications,
    isLoading,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    addOrder,
    addNotification,
    markNotificationRead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
