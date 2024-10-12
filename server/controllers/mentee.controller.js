const MenteeModel = require('../models/menteeModel'); // Adjust the path as necessary

// Create a new mentee
exports.createMentee = async (req, res) => {
  try {
    const mentee = new MenteeModel(req.body);
    await mentee.save();
    res.status(201).json({ message: 'Mentee created successfully', mentee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all mentees
exports.getAllMentees = async (req, res) => {
  try {
    const mentees = await MenteeModel.find();
    res.status(200).json(mentees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single mentee by ID
exports.getMenteeById = async (req, res) => {
  try {
    const mentee = await MenteeModel.findById(req.params.id);
    if (!mentee) return res.status(404).json({ message: 'Mentee not found' });
    res.status(200).json(mentee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a mentee by ID
exports.updateMentee = async (req, res) => {
  try {
    const mentee = await MenteeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mentee) return res.status(404).json({ message: 'Mentee not found' });
    res.status(200).json({ message: 'Mentee updated successfully', mentee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a mentee by ID
exports.deleteMentee = async (req, res) => {
  try {
    const mentee = await MenteeModel.findByIdAndDelete(req.params.id);
    if (!mentee) return res.status(404).json({ message: 'Mentee not found' });
    res.status(200).json({ message: 'Mentee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
