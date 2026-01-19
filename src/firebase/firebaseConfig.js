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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
