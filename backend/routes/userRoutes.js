const express = require('express');
const router = express.Router();
const user = require('../models/User'); 
const userController = require('../controllers/userController'); // Adjust the path based on your folder structure

// Route to register a user
router.post('/register', userController.registerUser);

// Route to login a user
router.post('/login', userController.loginUser);

// Route to get all users (Admin functionality)
router.get('/users', userController.getAllUsers);

// Route to delete a user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
