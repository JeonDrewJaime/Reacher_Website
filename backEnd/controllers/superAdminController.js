const SuperAdminModel = require('../models/SuperAdminModel'); // Import the SuperAdminModel

class SuperAdminController {
  // Controller method to create a user
  async createUser(req, res) {
    try {
      // Get user data from the request body
      const { email, password, firstName, lastName, role, status } = req.body;

      // Call the SuperAdminModel's createUserWithAuth method
      const response = await SuperAdminModel.createUserWithAuth({
        email,
        password,
        firstName,
        lastName,
        role,
        status, // Pass the status as part of the data
      });

      // Send the response to the client
      return res.status(201).json({
        success: response.success,
        message: response.message,
        userId: response.userId,
      });
    } catch (error) {
      // Handle any errors that occur
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new SuperAdminController();
