const express = require('express');
const {
    login,
    signupBasic,
    signupComplete,
    refresh,
    logout
} = require('../../controllers/store-auth.controller');

const router = express.Router();

// Login request
router.post('/login', login);

// Signup request
//router.post('/signup', signup);
router.post('/signup-basic', signupBasic);

// Route for complete sign-up
router.post('/signup-complete', signupComplete);

// Refresh token request
router.get('/refresh', refresh);

// Logout request
router.post('/logout', logout);

module.exports = router;
