const express = require('express');
const router = express.Router();
const upload = require('../utils/upload'); // Import the upload middleware directly
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../controllers/user.controller'); // Adjust the path as necessary

// Routes
router.post('/users', upload.single('photo'), createUser); // Create a new user with photo upload
router.get('/users', getAllUsers); // Get all users
router.get('/users/:id', getUserById); // Get user by ID
router.put('/users/:id', updateUserById); // Update user by ID
router.delete('/users/:id', deleteUserById); // Delete user by ID

module.exports = router;
