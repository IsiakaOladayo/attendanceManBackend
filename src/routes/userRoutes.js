const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticate = require("../middleware/authMiddleware");

// Create user
router.post('/', userController.createUser);

// Profile route MUST come before /:id
router.get('/profile', authenticate, userController.getProfile);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

module.exports = router;