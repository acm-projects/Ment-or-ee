const mongoose = require('mongoose');
const UserModel = require('./userModel'); // Import User model

// Create Mentee schema extending the base user schema
const menteeSchema = new mongoose.Schema({
  photo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files'
  },  
  major: { 
    type: String,
    required: true,
  },
  collegeYear: {
    type: String,
    required: true,
    trim: true,
    enum: [
      'First Year',
      'Second Year',
      'Third Year',
      'Fourth Year',
    ]
  },
  // Weights for matching criteria
  weights: {
    location: {
      type: Number,
      default: (100/6) // Default weight for location matching
    },
    languages: {
      type: Number,
      default: (100/6) // Default weight for languages
    },
    personalityType: {
      type: Number,
      default: (100/6) // Default weight for personality type
    },
    university: {
      type: Number,
      default: (100/6) // Default weight for university match
    },
    fields: {
      type: Number,
      default: (100/6) // Default weight for fields of expertise
    },
    industries: {
      type: Number,
      default: (100/6) // Default weight for fields of expertise
    }
  },
// Reference to the User model
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: UserModel,
  required: true,
}
});

const MenteeModel = mongoose.model('Mentee', menteeSchema);

module.exports = MenteeModel;