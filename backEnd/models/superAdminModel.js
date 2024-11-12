const admin = require('firebase-admin');
const { db } = require('../config/firebase-admin-config'); // Firebase Admin Realtime Database config

class SuperAdminModel {
  // This method will create a user using Firebase Authentication
  async createUserWithAuth(userData) {
    try {
      const { email, password, firstName, lastName, role, status = 'active' } = userData; // Default status is 'active'
      // Create a user using Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
        disabled: false,
      });

      // Optionally, store additional data in Realtime Database
      const userRef = db.ref('users/' + userRecord.uid);
      await userRef.set({
        firstName,
        lastName,
        role,
        email,
        status, // Add the status field to the database record
      });

      return {
        success: true,
        message: 'User created successfully',
        userId: userRecord.uid,
      };
    } catch (error) {
      throw new Error('Error creating user with authentication: ' + error.message);
    }
  }
}

module.exports = new SuperAdminModel();
