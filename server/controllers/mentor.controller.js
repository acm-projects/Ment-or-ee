const MentorModel = require('../models/mentorModel'); // Assuming mentorModel.js is in the models folder

// Create a new mentor
const createMentor = async (req, res) => {
    try {
        const mentor = new MentorModel(req.body);
        await mentor.save();
        res.status(201).json(mentor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all mentors
const getMentors = async (req, res) => {
    try {
        const mentors = await MentorModel.find().populate('tasks');
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get mentor by ID
const getMentor = async (req, res) => {
    const { id } = req.params;
    try {
        const mentor = await MentorModel.findById(id).populate('tasks');
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(200).json(mentor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update mentor by ID
const updateMentor = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMentor = await MentorModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(200).json(updatedMentor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete mentor by ID
const deleteMentor = async (req, res) => {
    const { id } = req.params;
    try {
        const mentor = await MentorModel.findByIdAndDelete(id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(200).json({ message: 'Mentor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMentor,
    getMentors,
    getMentor,
    updateMentor,
    deleteMentor
};
