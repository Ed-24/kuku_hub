// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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

// Initialize Firebase
console.log('🔥 [CONFIG] Initializing Firebase with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
});

let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ [CONFIG] Firebase app initialized successfully');
} catch (error) {
  console.error('❌ [CONFIG] Firebase initialization failed:', error);
}

// Initialize Firebase Authentication and get a reference to the service
let auth;
try {
  auth = getAuth(app);
  console.log('✅ [CONFIG] Firebase Auth initialized');
} catch (error) {
  console.error('❌ [CONFIG] Auth initialization failed:', error);
}

// Initialize Cloud Firestore and get a reference to the service
let db;
try {
  db = getFirestore(app);
  console.log('✅ [CONFIG] Firestore initialized');
} catch (error) {
  console.error('❌ [CONFIG] Firestore initialization failed:', error);
}

// Initialize Cloud Storage and get a reference to the service
let storage;
try {
  storage = getStorage(app);
  console.log('✅ [CONFIG] Storage initialized');
} catch (error) {
  console.error('❌ [CONFIG] Storage initialization failed:', error);
}

export { auth, db, storage };
export default app;
