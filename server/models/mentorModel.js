const mongoose = require('mongoose');
const UserModel = require('./userModel'); // Import User model
const { required } = require('joi');

// Create Mentor schema extending the base user schema
const mentorSchema = new mongoose.Schema({
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
    ref: 'TaskModel' // Reference to the Task model
  }]
});


// Create Mentor model, inheriting from the User model
const MentorModel = UserModel.discriminator('Mentor', mentorSchema);


module.exports = MentorModel;



