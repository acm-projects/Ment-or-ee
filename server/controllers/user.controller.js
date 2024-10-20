const UserModel = require('../models/userModel'); // Adjust the path as necessary

// Create a new user
// const createUser = async (req, res) => {
//   try {
//     const newUser = new UserModel(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
    const { name, email, username, password, dateOfBirth, language, personalityType, educationLevel, role } = req.body;

    // Validate required fields
    if (!name || !email || !username ||!password || !dateOfBirth || !language || !personalityType || !educationLevel || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.create({
            name,
            email,
            username,
            password,
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
