const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/user.controller'); // Adjust the path as needed

const router = express.Router();

// GET all users
router.get('/', getUsers);

// GET a single user by ID
router.get('/:id', getUser);

// POST a new user
router.post('/', createUser);

// DELETE a user by ID
router.delete('/:id', deleteUser);

// UPDATE a user by ID
router.patch('/:id', updateUser);

module.exports = router;