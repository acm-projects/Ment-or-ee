const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  role: { // To differentiate between mentor and mentee
    type: String,
    enum: ['Mentor', 'Mentee'],
    required: true
  },
  profilePic: {
    type: String,
    required: false, // You can set this to false if the profile pic is optional
    trim: true
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  password:{
    type: String,
    required: true,
    trim: true,


  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  location: {
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
        'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
        'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
        'Wisconsin', 'Wyoming'
      ]
    }
  },
  languages: {
    type: [String], // Store languages as an array of strings
    required: true,
    enum: [
      'English',
      'Spanish',
      'Chinese',
      'Tagalog',
      'Vietnamese',
      'Arabic',
      'French',
      'German',
      'Russian',
      'Italian',
      'Portuguese',
      'Japanese',
      'Korean',
      'Hindi',
      'Persian'
    ]
  },
  university: {
    type: String, // String for the university name
    required: true,
    trim: true
  },
  personalityType: {
    type: String,
    required: true,
    trim: true,
    enum: ['Introvert', 'Extrovert'] // Only these values are allowed
  },
  major: {
    type: String,
    required: false,
    trim: true
  },
  skills: { 
    type: String, 
    required: true, 
    trim: true 
  },
  availability: { 
    type: Boolean, 
    required: true,
    default: true 
  },
  reviews: [{ // Array of review IDs where this user is being reviewed
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReviewModel'
  }],
  meetings: [{ // Reference to the Meeting model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MeetingModel'
  }],
  bio: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true }); // Correctly placing timestamps option

// Compile and export the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
