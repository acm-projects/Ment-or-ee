const express = require('express');
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/task.controller'); // Adjust the path as needed

const router = express.Router();

// GET all tasks
router.get('/', getAllTasks);

// GET a single task by ID
router.get('/:id', getTaskById);

// POST a new task
router.post('/', createTask);

// DELETE a task by ID
router.delete('/:id', deleteTask);

// UPDATE a task by ID
router.patch('/:id', updateTask);

module.exports = router;
