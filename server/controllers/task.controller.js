const TaskModel = require('../models/taskModel');
const MenteeModel = require('../models/menteeModel');
const MentorModel = require('../models/mentorModel');

// Helper function to get MenteeId based on userId
const getMenteeIdByUserId = async (userId) => {
    try {
        const mentee = await MenteeModel.findOne({ user: userId }).exec();
        if (mentee) {
            return mentee._id;
        } else {
            throw new Error('Mentee not found for the provided userId');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving menteeId');
    }
};

const getMentorIdByUserId = async (userId) => {
    try {
        console.log(`Searching for mentor with user ID: ${userId}`);
        
        const mentor = await MentorModel.findOne({ user: userId }).exec();
        
        if (mentor) {
            console.log(`Mentor found: ${mentor._id}`);
            return mentor._id;
        } else {
            console.log(`No mentor found for user ID: ${userId}`);
            throw new Error('Mentor not found for the provided userId');
        }
    } catch (error) {
        console.error('Error in getMentorIdByUserId:', error.message);
        throw new Error('Error retrieving mentorId');
    }
};


// Create a new task
const createTask = async (req, res) => {
    try {
        const { deadline, title, description, check, creator, receiver } = req.body;

        const creatorId = await getMentorIdByUserId(creator);
        const receiverId = await getMenteeIdByUserId(receiver);

        const newTask = new TaskModel({
            deadline,
            title,
            description,
            check,
            creator: creatorId,
            receiver: receiverId
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTasksAssignedToMentee = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Get the Mentee ID based on the provided User ID
        const menteeId = await getMenteeIdByUserId(userId);
        
        // Find tasks assigned to this mentee (where receiver is menteeId)
        const tasks = await TaskModel.find({ receiver: menteeId })
            // Populate the creator as Mentor model and resolve User from Mentor model
            .populate({
                path: 'creator',  // Populate creator (Mentor)
                select: 'name',  // Only select the 'name' field for the Mentor
                populate: {
                    path: 'user',  // Populate the user field of Mentor (which references User model)
                    select: 'name email'  // Select fields from the User model to be populated
                }
            })
            // Populate the receiver as Mentee model and resolve User from Mentee model
            .populate({
                path: 'receiver',  // Populate receiver (Mentee)
                select: 'name',  // Only select the 'name' field for the Mentee
                populate: {
                    path: 'user',  // Populate the user field of Mentee (which references User model)
                    select: 'name email'  // Select fields from the User model to be populated
                }
            })
            .exec();
        
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error.message);
        res.status(500).json({ message: 'Error retrieving tasks assigned to mentee' });
    }
};





// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find().populate('creator').populate('receiver');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id).populate('creator').populate('receiver');
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { deadline, title, description, check } = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { deadline, title, description, check },
            { new: true }
        );

        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
        if (deletedTask) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTasksAssignedToMentee,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
