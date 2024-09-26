const Task = require('../models/task.model'); // Adjust the path as needed
const mongoose = require('mongoose');

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({ deadline: 1 }); // Sort by deadline
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single task by ID
const getTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No task with id: ${id}` });
    }

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'No such Task' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { deadline, title, description, check } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const task = await Task.create({
            deadline,
            title,
            description,
            check: check || false // Default `check` to false if not provided
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Task' });
    }

    try {
        const task = await Task.findOneAndDelete({ _id: id });
        if (!task) {
            return res.status(404).json({ error: 'No such Task' });
        }

        res.status(200).json({ message: 'Task deleted successfully', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Task' });
    }

    try {
        const task = await Task.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true }); // `new: true` returns the updated document

        if (!task) {
            return res.status(404).json({ error: 'No such Task' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
};
