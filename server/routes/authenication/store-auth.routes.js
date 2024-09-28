const express = require('express');
const {
    login,
    signup,
    refresh,
    logout
} = require('../../controllers/store-auth.controller');

const router = express.Router();

// Login request
router.post('/login', login);

// Signup request
router.post('/signup', signup);

// Refresh token request
router.get('/refresh', refresh);

// Logout request
router.post('/logout', logout);

module.exports = router;
