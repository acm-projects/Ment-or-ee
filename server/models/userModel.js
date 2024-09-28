const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  role: { // To differentiate between mentor and mentee
    type: String,
    enum: ['mentor', 'mentee'],
    required: true
  },
  profilePic: {
    type: String,
    required: true, // You can set this to false if the profile pic is optional
    trim: true
  },
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
    trim: true,
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
    enum: ['introvert', 'extrovert'] // Only these values are allowed
  },
  skills: { 
    type: String, 
    required: true, 
    trim: true 
  },
  availability: { 
    type: Boolean, 
    default: true 
  },
  // Array of review IDs where this user is being reviewed
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReviewModel'
  }],
  meetings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MeetingModel' // Reference to the Meeting model
  }]
}, {
  timestamps: true
});

// Compile and export the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;


