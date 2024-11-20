const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reacher-latest-default-rtdb.firebaseio.com/" // Replace with your database URL
});

const db = admin.database(); // Initialize Realtime Database
const auth = admin.auth();

module.exports = { auth, db };
