import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

// Sign Up with Email & Password
export const signUp = async (email, password, displayName, userType) => {
  try {
    console.log('🔥 [AUTH] Starting sign up:', { email, displayName, userType });
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('✅ [AUTH] User created:', user.uid);

    // Update profile with display name
    await updateProfile(user, { displayName });
    console.log('✅ [AUTH] Profile updated');

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      userType: userType, // 'buyer' or 'farmer'
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        phone: '',
        address: '',
        city: '',
        country: '',
        profileImage: '',
        bio: '',
      },
      isVerified: false,
    });
    console.log('✅ [AUTH] Firestore user document created');

    return { success: true, user };
  } catch (error) {
    console.error('❌ [AUTH] Sign up error:', error.code, error.message);
    
    // Handle specific Firebase errors
    let message = error.message;
    
    if (error.code === 'auth/email-already-in-use') {
      message = 'This email is already registered. Please sign in instead.';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address';
    }
    
    return { success: false, error: message };
  }
};

// Sign In with Email & Password
export const signIn = async (email, password) => {
  try {
    console.log('🔥 [AUTH] Starting sign in:', { email });
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ [AUTH] Sign in successful:', userCredential.user.uid);
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('❌ [AUTH] Sign in error:', error.code, error.message);
    
    // Handle specific Firebase errors
    let message = error.message;
    
    if (error.code === 'auth/user-not-found') {
      message = 'No account found with this email address';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Incorrect password';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Invalid email address';
    } else if (error.code === 'auth/user-disabled') {
      message = 'This account has been disabled';
    } else if (error.code === 'auth/too-many-requests') {
      message = 'Too many login attempts. Please try again later';
    }
    
    return { success: false, error: message };
  }
};

// Sign Out
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Send Password Reset Email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update Password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    // For security, you'd typically re-authenticate the user first
    // This is a simplified version
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get Current User
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to Auth State Changes
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get User Profile from Firestore
export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'User profile not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
