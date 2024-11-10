const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  googleId: { // For OAuth users
    type: String,
    unique: true,
    sparse: true, // Allows this field to be null for non-Google users
  },
  role: { // To differentiate between mentor and mentee
    type: String,
    enum: ['Mentor', 'Mentee'],
    required: false
  },
  photo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files'
  },  
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  password: { 
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
  location: {
    city: {
      type: String,
      required: false,
      trim: true
    },
    state: {
      type: String,
      required: false,
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
    required: false,
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
    required: false,
    trim: true
  },
  personalityType: {
    type: String,
    required: false,
    trim: true,
    enum: ['Introvert', 'Extrovert'] // Only these values are allowed
  },
  fields: {
    type: [String],
    required: false,
  },
  availability: { 
    type: Boolean, 
    required: false,
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
    required: false,
    trim: true,
  },
  headline: {
    type: String,
    trim: true,
  },
  links: {
    type: [String],
  },
  industries: {
    type: [String],
  },
}, { timestamps: true }); // Correctly placing timestamps option

// Compile and export the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
