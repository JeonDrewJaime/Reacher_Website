import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Optional: If you use Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Optional: If you use Firestore

// Your Firebase configuration object from Firebase Console
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (optional)
const auth = getAuth(app); // For Firebase Authentication
const db = getFirestore(app); // For Firestore Database

export { app, auth, db }; // Export these to use in other parts of your app
