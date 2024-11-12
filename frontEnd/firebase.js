import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Optional: If you use Firebase Authentication
import { getDatabase } from 'firebase/database'; // Import Realtime Database

// Your Firebase configuration object from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBBSoCvTzUnnRcGyE_Kfk30E6-4exHYaxU",
  authDomain: "reacher-latest.firebaseapp.com",
  databaseURL: "https://reacher-latest-default-rtdb.firebaseio.com",
  projectId: "reacher-latest",
  storageBucket: "reacher-latest.firebasestorage.app",
  messagingSenderId: "973827044242",
  appId: "1:973827044242:web:a8de0050a23efc679ac74b",
  measurementId: "G-ZQH28H6N3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (optional)
const auth = getAuth(app); // For Firebase Authentication
const db = getDatabase(app); // Initialize Realtime Database

export { app, auth, db }; // Export these to use in other parts of your app
