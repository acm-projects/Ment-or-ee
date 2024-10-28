const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../model/userModel');
require('dotenv').config();

// Setting up the Google OAuth strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user already exists in the database
      let user = await UserModel.findOne({ googleId: profile.id });

      if (!user) {
        // If user doesn't exist, create a new one
        user = new UserModel({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value, // Assuming the email is available
          photo: profile.photos[0].value,
          // Any other default values based on your schema
          role: 'Mentee', // Default role, you can change this logic
          password: '', // No password for OAuth, but the field is required
          location: { city: 'Unknown', state: 'Unknown' },
          languages: ['English'], // Default value
          university: 'Unknown', // Default value
          personalityType: 'Introvert', // Default value
          fields: ['Unknown'], // Default value
          bio: 'Google OAuth User', // Default bio for OAuth users
        });
        await user.save();
      }
      
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error, false);
    }
  }
));

// Serialize and deserialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
