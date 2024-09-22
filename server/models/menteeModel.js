const mongoose = require('mongoose');
const UserModel = require('./userModel'); // Import User model

// Create Mentee schema extending the base user schema
const menteeSchema = new mongoose.Schema({
  learningStyle: { 
    type: String 
  },
  fieldOfInterest: { 
    type: String 
  },
  calendar: { 
    type: Object // Define the structure of your calendar as needed
  }
});

// Create Mentee model, inheriting from the User model
const MenteeModel = UserModel.discriminator('Mentee', menteeSchema);

module.exports = MenteeModel;