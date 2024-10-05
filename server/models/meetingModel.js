const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Meetings Schema
const meetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model for mentor
    required: true,
  },
  mentee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model for mentee
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,  // Duration of the meeting in minutes
    required: true,
  },
  zoomLink: {
    type: String,  // Zoom meeting link
    required: true,
  },
  zoomMeetingId: {
    type: String,  // Zoom meeting ID for reference
    required: true,
  },
  zoomPassword: {
    type: String,  // Optional Zoom password
  },
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'canceled'],
    default: 'scheduled',
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
const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
