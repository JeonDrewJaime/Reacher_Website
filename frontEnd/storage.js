import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';         // Optional: If using Firebase Authentication
import { getDatabase } from 'firebase/database'; // For Firebase Realtime Database
import { getStorage } from 'firebase/storage';   // Import Firebase Storage

// Firebase configuration object from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAEXpy-4j8RA-GGiP1kqjDOWYR7IWyx5B0",
    authDomain: "enrollment-system-9e233.firebaseapp.com",
    databaseURL: "https://enrollment-system-9e233-default-rtdb.firebaseio.com",
    projectId: "enrollment-system-9e233",
    storageBucket: "enrollment-system-9e233.appspot.com",
    messagingSenderId: "332165817986",
    appId: "1:332165817986:web:1192d3f3d061c349de369b",
    measurementId: "G-YQKSVHQHYX"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);         // Firebase Authentication
const db = getDatabase(app);       // Firebase Realtime Database
const storage = getStorage(app);   // Firebase Storage

// Export Firebase services for use in other parts of your app
export { app, auth, db, storage };
