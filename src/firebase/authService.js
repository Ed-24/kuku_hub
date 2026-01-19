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
import { getAuthService, getDBService } from './firebaseConfig';

console.log('✅ [AUTH] authService.js module loaded');

// Sign Up with Email & Password
export const signUp = async (email, password, displayName, userType) => {
  try {
    console.log('🔥 [AUTH] Starting sign up:', { email, displayName, userType });
    
    const auth = getAuthService();
    const db = getDBService();
    
    console.log('✅ [AUTH] Services obtained, creating user...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('✅ [AUTH] User created with UID:', user.uid);

    // Update profile with display name
    await updateProfile(user, { displayName });
    console.log('✅ [AUTH] Firebase profile updated with displayName:', displayName);

    // Create user document in Firestore
    const userDocData = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      userType: userType, // 'buyer' or 'farmer'
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        phone: '',
        address: '',
        city: '',
        country: '',
        profileImage: '',
        bio: '',
      },
      isVerified: false,
    };
    
    console.log('🔥 [AUTH] Saving user document to Firestore:', userDocData);
    await setDoc(doc(db, 'users', user.uid), userDocData);
    console.log('✅ [AUTH] Firestore user document created successfully at path: users/' + user.uid);

    return { success: true, user };
  } catch (error) {
    console.error('❌ [AUTH] Sign up error:', error.code, error.message);
    console.error('❌ [AUTH] Full error:', error);
    
    // Handle specific Firebase errors
    let message = error.message;
    
    if (error.code === 'auth/email-already-in-use') {
      message = 'This email is already registered. Please sign in instead.';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address';
    } else if (error.code === 'permission-denied') {
      message = 'Firestore permission denied. Check security rules.';
    } else if (error.code === 'PERMISSION_DENIED') {
      message = 'Firestore permission denied. Check security rules.';
    }
    
    return { success: false, error: message };
  }
};

// Sign In with Email & Password
export const signIn = async (email, password) => {
  try {
    console.log('🔥 [AUTH] Starting sign in:', { email });
    
    const auth = getAuthService();
    console.log('✅ [AUTH] Auth service obtained, attempting login...');
    
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
    } else if (error.code === 'auth/configuration-not-found') {
      message = 'Firebase Auth not configured. Please check project settings.';
    }
    
    return { success: false, error: message };
  }
};

// Sign Out
export const logout = async () => {
  try {
    const auth = getAuthService();
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Send Password Reset Email
export const resetPassword = async (email) => {
  try {
    const auth = getAuthService();
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update Password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const auth = getAuthService();
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get Current User
export const getCurrentUser = () => {
  try {
    const auth = getAuthService();
    return auth.currentUser;
  } catch (error) {
    return null;
  }
};

// Listen to Auth State Changes
export const onAuthStateChangedListener = (callback) => {
  try {
    const auth = getAuthService();
    return onAuthStateChanged(auth, callback);
  } catch (error) {
    console.error('❌ [AUTH] Auth listener error:', error);
    return () => {};
  }
};

// Get User Profile from Firestore
export const getUserProfile = async (uid) => {
  try {
    console.log('🔥 [AUTH] Fetching user profile for:', uid);
    const db = getDBService();
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      console.log('✅ [AUTH] User profile found:', userDoc.data());
      return { success: true, data: userDoc.data() };
    } else {
      console.warn('⚠️ [AUTH] User profile not found in Firestore for UID:', uid);
      return { success: false, error: 'User profile not found' };
    }
  } catch (error) {
    console.error('❌ [AUTH] Error fetching user profile:', error.code, error.message);
    return { success: false, error: error.message };
  }
};
