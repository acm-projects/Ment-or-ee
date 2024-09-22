const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  language: { 
    type: String, 
    required: true, 
    trim: true 
  },
  personalityType: { 
    type: String, 
    required: true, 
    trim: true 
  },
  educationLevel: { 
    type: String, 
    required: true, 
    trim: true 
  },
  availability: { 
    type: Boolean, 
    default: true 
  },
  role: { // To differentiate between mentor and mentee
    type: String,
    enum: ['mentor', 'mentee'],
    required: true
  },
  // Array of review IDs where this user is being reviewed
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReviewModel'
  }]
}, {
  timestamps: true
});

// Compile and export the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
