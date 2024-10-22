const UserModel = require('../models/userModel'); // Adjust the path as necessary

// Create a new user
const createUser = async (req, res) => {
    const { role, name, email, password, location, languages, university, personalityType, fields, availability, bio } = req.body;

    // Validate required fields
    if (!role || !name || !email || !password || !location || !languages || !university || !personalityType || !fields || !availability || !bio) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new user instance with the photo_id if available
        const user = new UserModel({
            role,
            photo_id: req.file ? req.file.id : null, // Save the uploaded photo's ID
            name,
            password,
            email,
            location,
            languages,
            university,
            personalityType,
            fields,
            availability,
            bio,
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().populate('photo_id'); // Populate photo_id to get image details
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('photo_id'); // Populate photo_id to get image details
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
