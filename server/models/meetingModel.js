const mongoose = require('mongoose');
const MentorModel = require('./mentorModel'); // Import User model
const MenteeModel = require('./menteeModel'); // Import User model
const { Schema } = mongoose;

// Define the Meetings Schema
const meetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',  // Reference to the User model for mentor
    required: false,
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentee',  // Reference to the User model for mentee
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  duration: {
    type: Number,  // Duration of the meeting in minutes
    required: true,
  },
  location: {
    type: String,  // Physical or virtual location (e.g., Zoom link)
    required: false,
  },
  zoomLink: {
    type: String,  // Field to store the Zoom meeting link
    required: true,  // Ensure this field is required
  },
  description: {
    type: String,
    required: false,  // Optional description or agenda
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set creation time
  },
});

// Export the Meetings model
const MeetingModel = mongoose.model('Meeting', meetingSchema);

module.exports = MeetingModel;
