// Import mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const reviewModelSchema = new Schema({
  rating: Number,
  text: String,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Compile model from schema
const ReviewModel = mongoose.model("ReviewModel", reviewModelSchema);

module.exports = ReviewModel;