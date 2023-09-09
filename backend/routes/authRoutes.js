const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const authMiddleware = require('../middlewares/authMiddleware'); // Make sure to import the authMiddleware

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Delete user profile (requires authentication)
// router.delete('/profile', authMiddleware.authenticateToken, authController.deleteUserProfile);

// Get user profile
// router.get('/users', authMiddleware.authenticateToken, authController.getAllUsers);

// Update user profile
// router.put('/profile', authMiddleware.authenticateToken, authController.updateUserProfile);


module.exports = router;