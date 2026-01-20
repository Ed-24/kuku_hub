// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiKUVj-Ug7OntnAQj0Ij4g_L7TA6-r-ls",
  authDomain: "young4chick.firebaseapp.com",
  projectId: "young4chick",
  storageBucket: "young4chick.firebasestorage.app",
  messagingSenderId: "898175860520",
  appId: "1:898175860520:web:3b72d606be19b7deb25a1d"
};

console.log('[CONFIG] Starting Firebase initialization');

let app = null;
let auth = null;
let db = null;
let storage = null;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  console.log('[CONFIG] Firebase app initialized');
  
  // Get auth reference
  auth = getAuth(app);
  console.log('[CONFIG] Auth reference obtained');
  
  // Enable Auth emulator for local development (if not in production)
  if (window.location.hostname === 'localhost' && !auth.emulatorConfig) {
    try {
      console.log('[CONFIG] Attempting to use Auth in localhost environment...');
      // Don't use emulator by default - just let it connect to production Firebase
      // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      // console.log('✅ [CONFIG] Using Auth Emulator for local testing');
    } catch (error) {
      console.warn('⚠️ [CONFIG] Auth emulator not available:', error.message);
    }
  }
  
  // Get firestore reference
  db = getFirestore(app);
  console.log('[CONFIG] Firestore reference obtained');
  
  // Enable persistence for offline support
  try {
    enableIndexedDbPersistence(db);
    console.log('[CONFIG] Firestore persistence enabled');
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.warn('⚠️ [CONFIG] Multiple tabs open, persistence disabled');
    } else if (error.code === 'unimplemented') {
      console.warn('⚠️ [CONFIG] Persistence not supported in this environment');
    } else {
      console.warn('⚠️ [CONFIG] Persistence error:', error.message);
    }
  }
  
  // Get storage reference
  storage = getStorage(app);
  console.log('[CONFIG] Storage reference obtained');
  
  console.log('[CONFIG] All Firebase services initialized successfully!');
  
} catch (error) {
  console.error('[CONFIG] Firebase initialization error:', error.message, error.code);
}

// Export services with validation
const getAuthService = () => {
  if (!auth) {
    console.error('[CONFIG] Auth not initialized!');
    throw new Error('Firebase Auth not initialized');
  }
  return auth;
};

const getDBService = () => {
  if (!db) {
    console.error('[CONFIG] Firestore not initialized!');
    throw new Error('Firebase Firestore not initialized');
  }
  return db;
};

const getStorageService = () => {
  if (!storage) {
    console.error('[CONFIG] Storage not initialized!');
    throw new Error('Firebase Storage not initialized');
  }
  return storage;
};

export { auth, db, storage, getAuthService, getDBService, getStorageService };
export default app;
