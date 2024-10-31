// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
// require('dotenv').config();
// require('./controllers/google-oauth.controller'); // Passport config

// const googleOAuthRoutes = require('./routes/authentication/google-oauth.routes');

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const app = express();

// // Set up sessions (for persistent login)
// app.use(session({
//   secret: process.env.ACCESS_TOKEN_SECRET,
//   resave: false,
//   saveUninitialized: false,
// }));

// // Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/auth', googleOAuthRoutes);

// app.get('/dashboard', (req, res) => {
//   if (!req.user) {
//     return res.redirect('/');
//   }
//   res.send(`<h1>Welcome ${req.user.name}</h1>`);
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });


// // Middleware/passport.js
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/userModel');

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/authentication/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existingUser = await User.findOne({ email: profile.emails[0].value });
//         if (existingUser) {
//           return done(null, existingUser);
//         }

//         // Create new user with Google information
//         const newUser = new User({
//           name: profile.displayName,
//           email: profile.emails[0].value,
//           password: profile.id, // Store Google ID temporarily as a "password"
//         });
//         const savedUser = await newUser.save();
//         done(null, savedUser);
//       } catch (error) {
//         done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => done(err, user));
// });

// module.exports = passport;
