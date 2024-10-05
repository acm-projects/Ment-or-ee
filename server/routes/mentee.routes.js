const express = require('express');
const {
    getMentees,
    getMentee,
    createMentee,
    deleteMentee,
    updateMentee
} = require('../controllers/mentee.controller'); // Adjust the path as needed

const router = express.Router();

// GET all mentees
router.get('/', getMentees);

// GET a single mentee by ID
router.get('/:id', getMentee);

// POST a new mentee
router.post('/', createMentee);

// DELETE a mentee by ID
router.delete('/:id', deleteMentee);

// UPDATE a mentee by ID
router.patch('/:id', updateMentee);

module.exports = router;
