const mongoose = require('mongoose');
const UserModel = require('./userModel'); // Import User model
const TaskModel = require('./taskModel'); // Import Task model

// Create Mentor schema extending the base user schema
const mentorSchema = new mongoose.Schema({
  photo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files'
  },  
  company: { 
    type: String, 
    required: true 
  },
  jobTitle: { 
    type: String,
    required: true
  },
  degrees: { 
    type: [String],
    required: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: TaskModel // Reference to the Task model
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
     ref: UserModel,
     required: true,
   }
});

const MentorModel = mongoose.model('Mentor', mentorSchema);

module.exports = MentorModel;



