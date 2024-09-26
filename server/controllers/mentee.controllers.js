const Mentee = require('../models/mentee.model'); // Adjust the path as needed
const mongoose = require('mongoose');

// Get all mentees
const getMentees = async (req, res) => {
    try {
        const mentees = await Mentee.find({}).sort({ createdAt: -1 });
        res.status(200).json(mentees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single mentee by ID
const getMentee = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No mentee with id: ${id}` });
    }

    try {
        const mentee = await Mentee.findById(id);
        if (!mentee) {
            return res.status(404).json({ error: 'No such Mentee' });
        }

        res.status(200).json(mentee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new mentee
const createMentee = async (req, res) => {
    const { name, email, username, dateOfBirth, language, personalityType, educationLevel, fieldOfInterest, learningStyle} = req.body;

    if (!name || !email || !username || !dateOfBirth || !language || !personalityType || !educationLevel || !fieldOfInterest || !learningStyle) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const mentee = await Mentee.create({
            name,
            email,
            username,
            dateOfBirth,
            language,
            personalityType,
            educationLevel,
            role: 'mentee', // Assign role as mentee
            fieldOfInterest,
            learningStyle,
            //calendar
        });

        res.status(201).json(mentee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a mentee by ID
const deleteMentee = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Mentee' });
    }

    try {
        const mentee = await Mentee.findOneAndDelete({ _id: id });
        if (!mentee) {
            return res.status(404).json({ error: 'No such Mentee' });
        }

        res.status(200).json({ message: 'Mentee deleted successfully', mentee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a mentee by ID
const updateMentee = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Mentee' });
    }

    try {
        const mentee = await Mentee.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true }); // `new: true` returns the updated document

        if (!mentee) {
            return res.status(404).json({ error: 'No such Mentee' });
        }

        res.status(200).json(mentee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getMentees,
    getMentee,
    createMentee,
    deleteMentee,
    updateMentee
};
