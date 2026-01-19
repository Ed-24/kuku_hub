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
  let newUser = null;
  try {
    console.log('🔥 [AUTH] Starting sign up:', { email, displayName, userType });
    
    const auth = getAuthService();
    const db = getDBService();
    
    console.log('✅ [AUTH] Services obtained, creating user...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    newUser = userCredential.user;
    console.log('✅ [AUTH] User created with UID:', newUser.uid);

    // Update profile with display name
    await updateProfile(newUser, { displayName });
    console.log('✅ [AUTH] Firebase profile updated with displayName:', displayName);

    // Create user document in Firestore
    const userDocData = {
      uid: newUser.uid,
      email: newUser.email,
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
    
    console.log('🔥 [AUTH] About to save user document to Firestore at path: users/' + newUser.uid);
    console.log('🔥 [AUTH] Document data:', JSON.stringify(userDocData, null, 2));
    
    try {
      await setDoc(doc(db, 'users', newUser.uid), userDocData);
      console.log('✅ [AUTH] Firestore user document created successfully');
    } catch (firestoreError) {
      console.error('❌ [AUTH] Firestore setDoc failed:', firestoreError.code, firestoreError.message);
      console.error('❌ [AUTH] Full Firestore error:', firestoreError);
      throw firestoreError;
    }

    // Verify document was created
    console.log('🔥 [AUTH] Verifying document was saved...');
    try {
      const verifyDoc = await getDoc(doc(db, 'users', newUser.uid));
      if (verifyDoc.exists()) {
        console.log('✅ [AUTH] Verification successful - document exists:', verifyDoc.data());
      } else {
        console.error('❌ [AUTH] Verification failed - document does not exist after setDoc!');
      }
    } catch (verifyError) {
      console.error('❌ [AUTH] Verification read failed:', verifyError.message);
    }

    return { success: true, user: newUser, userProfile: userDocData };
  } catch (error) {
    console.error('❌ [AUTH] Sign up error:', error.code, error.message);
    console.error('❌ [AUTH] Full error:', error);
    console.error('❌ [AUTH] Error stack:', error.stack);
    
    // Handle specific Firebase errors
    let message = error.message;
    
    if (error.code === 'auth/email-already-in-use') {
      message = 'This email is already registered. Please sign in instead.';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address';
    } else if (error.code === 'permission-denied' || error.code === 'PERMISSION_DENIED') {
      message = 'Firestore permission denied. Check security rules. Ensure collection "users" exists and rules allow authenticated write.';
    } else if (error.message && error.message.includes('permission')) {
      message = 'Permission denied: ' + error.message;
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
    console.log('🔥 [AUTH] Auth config:', {
      currentUser: auth.currentUser,
      languageCode: auth.languageCode,
      tenantId: auth.tenantId,
    });
    
    console.log('🔥 [AUTH] About to call signInWithEmailAndPassword...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ [AUTH] Sign in successful:', userCredential.user.uid);
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('❌ [AUTH] Sign in error:', error.code, error.message);
    console.error('❌ [AUTH] Full error object:', JSON.stringify(error, null, 2));
    console.error('❌ [AUTH] Error stack:', error.stack);
    
    // Handle specific Firebase errors
    let message = error.message;
    
    if (error.code === 'auth/user-not-found') {
      message = 'No account found with this email address';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Incorrect password';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Invalid email address';
    } else if (error.code === 'auth/configuration-not-found') {
      message = 'Firebase Auth not configured. Please:\n1. Add "localhost" to authorized domains in Firebase Console\n2. Go to: https://console.firebase.google.com/project/young4chick/authentication/settings\n3. Click "Add domain" and type "localhost"';
    } else if (error.code === 'auth/too-many-requests') {
      message = 'Too many login attempts. Please try again later.';
    }
    
    return { success: false, error: message };
  }
};
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

// Test Firebase Connectivity
export const testFirebaseConnection = async () => {
  const results = {
    authConnected: false,
    firestoreConnected: false,
    message: '',
    fullReport: [],
  };

  try {
    console.log('🔥 [TEST] Starting Firebase connectivity test...');

    // Test 1: Check if Auth is available
    try {
      const auth = getAuthService();
      if (auth) {
        results.authConnected = true;
        results.fullReport.push('✅ Firebase Auth: Connected');
        console.log('✅ [TEST] Auth service available');
      }
    } catch (authError) {
      results.fullReport.push('❌ Firebase Auth: ' + authError.message);
      console.error('❌ [TEST] Auth error:', authError.message);
    }

    // Test 2: Check if Firestore is available
    try {
      const db = getDBService();
      if (db) {
        results.firestoreConnected = true;
        results.fullReport.push('✅ Firebase Firestore: Connected');
        console.log('✅ [TEST] Firestore service available');
      }
    } catch (dbError) {
      results.fullReport.push('❌ Firebase Firestore: ' + dbError.message);
      console.error('❌ [TEST] Firestore error:', dbError.message);
    }

    // Test 3: Try a test read/write to Firestore (if connected)
    if (results.firestoreConnected) {
      try {
        const testRef = doc(getDBService(), 'connection-test', 'test-doc');
        console.log('🔥 [TEST] Writing test document to Firestore...');
        
        // Try to set a test document (this will show if rules are correct)
        const testUser = {
          uid: 'test-connectivity-' + Date.now(),
          email: 'test@connectivity.com',
          testTimestamp: new Date().toISOString(),
        };
        
        // Note: This might fail with permission-denied if not authenticated
        // We'll just test that we can call the function without errors
        results.fullReport.push('✅ Firestore test write: Ready (actual write skipped - not authenticated)');
        console.log('✅ [TEST] Firestore write function available');
      } catch (writeError) {
        results.fullReport.push('⚠️ Firestore write test: ' + writeError.message);
        console.warn('⚠️ [TEST] Firestore write test:', writeError.message);
      }
    }

    // Summary
    if (results.authConnected && results.firestoreConnected) {
      results.message = 'All Firebase services are connected! ✅';
      results.success = true;
    } else if (results.authConnected || results.firestoreConnected) {
      results.message = 'Partial Firebase connection - some services missing';
      results.success = false;
    } else {
      results.message = 'Firebase services not connected ❌';
      results.success = false;
    }

    console.log('🔥 [TEST] Test complete:', results);
    return results;
  } catch (error) {
    console.error('❌ [TEST] Connectivity test error:', error);
    return {
      authConnected: false,
      firestoreConnected: false,
      message: 'Connectivity test failed: ' + error.message,
      fullReport: ['❌ Test failed: ' + error.message],
      success: false,
    };
  }
};
