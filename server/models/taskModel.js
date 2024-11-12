// Import mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const taskModelSchema = new mongoose.Schema({
  deadline: Date,
  title: String,
  description: String,
  check: Boolean,
  creator: { // Store the userId of the mentor
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor', // Reference Mentor model
    required: true
  },
  receiver: { // Store the userId of the mentee
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentee', // Reference Mentee model
    required: true
  }
});


// Compile model from schema
const TaskModel = mongoose.model("TaskModel", taskModelSchema);

module.exports = TaskModel;