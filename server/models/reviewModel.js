const mongoose = require('mongoose');
const MentorModel = require('./mentorModel'); // Import User model
const MenteeModel = require('./menteeModel'); // Import User model

// Define schema
const Schema = mongoose.Schema;

const reviewModelSchema = new Schema({
  rating: { 
    type: Number, 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MenteeModel, // Reference the User model
    required: true
  },
  reviewedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MentorModel, // Reference the User model
    required: true
  }
});

// Compile model from schema
const ReviewModel = mongoose.model('ReviewModel', reviewModelSchema);
module.exports = ReviewModel;
