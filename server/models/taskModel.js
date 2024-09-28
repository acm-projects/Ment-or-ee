// Import mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const taskModelSchema = new Schema({
  deadline: Date,
  title: String,
  description: String,
  check: Boolean
});

// Compile model from schema
const TaskModel = mongoose.model("TaskModel", taskModelSchema);

module.exports = TaskModel;