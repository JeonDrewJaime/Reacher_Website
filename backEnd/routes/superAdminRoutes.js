const express = require('express');
const router = express.Router();
const SuperAdminController = require('../controllers/SuperAdminController');

// Define the POST route to create a user
router.post('/create-user', SuperAdminController.createUser);

module.exports = router;
