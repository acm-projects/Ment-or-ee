// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// // Route to start the Google OAuth login process
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google OAuth callback URL
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // On successful authentication, redirect to the dashboard or home page
//     res.redirect('/dashboard');
//   }
// );

// // Logout route
// router.get('/logout', (req, res) => {
//   req.logout(err => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

// module.exports = router;


// routes/authentication/google-oauth.routes.js
const express = require('express');
const passport = require('passport');
const { googleAuth, googleAuthCallback } = require('../../controllers/google-oauth.controller');

const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);

module.exports = router;
