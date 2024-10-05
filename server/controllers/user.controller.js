const User = require('../models/userModel'); // Adjust the path as needed
const mongoose = require('mongoose');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 }).populate('reviews');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No user with id: ${id}` });
    }

    try {
        const user = await User.findById(id).select("-password -orderHistory").populate('reviews');
        if (!user) {
            return res.status(404).json({ error: 'No such User' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { name, email, username, dateOfBirth, language, personalityType, educationLevel, role } = req.body;

    // Validate required fields
    if (!name || !email || !username || !dateOfBirth || !language || !personalityType || !educationLevel || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.create({
            name,
            email,
            username,
            dateOfBirth,
            language,
            personalityType,
            educationLevel,
            role,
            reviews: []
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such User' });
    }

    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({ error: 'No such User' });
        }

        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such User' });
    }

    try {
        const user = await User.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true }); // new: true returns the updated document

        if (!user) {
            return res.status(404).json({ error: 'No such User' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
};
