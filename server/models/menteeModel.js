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
  educationLevel: {
    type: String,
    required: true,
    trim: true,
    enum: [
      'First Year',
      'Second Year',
      'Third Year',
      'Fourth Year',
    ]
  }
});

// Create Mentee model, inheriting from the User model
const MenteeModel = UserModel.discriminator('Mentee', menteeSchema);

module.exports = MenteeModel;
