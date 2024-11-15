import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';         // Optional: If using Firebase Authentication
import { getDatabase } from 'firebase/database'; // For Firebase Realtime Database
import { getStorage } from 'firebase/storage';   // Import Firebase Storage

// Firebase configuration object from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBBSoCvTzUnnRcGyE_Kfk30E6-4exHYaxU",
  authDomain: "reacher-latest.firebaseapp.com",
  databaseURL: "https://reacher-latest-default-rtdb.firebaseio.com",
  projectId: "reacher-latest",
  storageBucket: "reacher-latest.appspot.com",  
  messagingSenderId: "973827044242",
  appId: "1:973827044242:web:a8de0050a23efc679ac74b",
  measurementId: "G-ZQH28H6N3P"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);         // Firebase Authentication
const db = getDatabase(app);       // Firebase Realtime Database
const storage = getStorage(app);   // Firebase Storage

// Export Firebase services for use in other parts of your app
export { app, auth, db, storage };
