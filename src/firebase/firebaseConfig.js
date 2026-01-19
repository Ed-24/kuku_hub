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

console.log('🔥 [CONFIG] Firebase config loaded:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
});

// Initialize Firebase - this will throw if config is invalid
const app = initializeApp(firebaseConfig);
console.log('✅ [CONFIG] Firebase app initialized');

// Initialize Firebase Authentication
const auth = getAuth(app);
console.log('✅ [CONFIG] Firebase Auth initialized:', !!auth);

// Initialize Cloud Firestore
const db = getFirestore(app);
console.log('✅ [CONFIG] Firestore initialized:', !!db);

// Initialize Cloud Storage
const storage = getStorage(app);
console.log('✅ [CONFIG] Storage initialized:', !!storage);

// Verify exports
console.log('🔥 [CONFIG] Verifying exports - auth:', !!auth, 'db:', !!db, 'storage:', !!storage);

export { auth, db, storage };
export default app;
