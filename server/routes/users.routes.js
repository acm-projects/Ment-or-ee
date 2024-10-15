const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('../controllers/user.controller'); // Adjust the path as necessary

// Routes
router.post('/users', createUser); // Create a new user
router.get('/users', getAllUsers); // Get all users
router.get('/users/:id', getUserById); // Get user by ID
router.put('/users/:id', updateUserById); // Update user by ID
router.delete('/users/:id', deleteUserById); // Delete user by ID

module.exports = router;
