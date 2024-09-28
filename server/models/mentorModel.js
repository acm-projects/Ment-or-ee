const mongoose = require('mongoose');
const UserModel = require('./userModel'); // Import User model

// Create Mentor schema extending the base user schema
const mentorSchema = new mongoose.Schema({
  mentorshipExperience: { 
    type: String, 
    required: true 
  },
  teachingStyle: { 
    type: String 
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskModel' // Reference to the Task model
  }]
});

// Create Mentor model, inheriting from the User model
const MentorModel = UserModel.discriminator('Mentor', mentorSchema);

module.exports = MentorModel;


