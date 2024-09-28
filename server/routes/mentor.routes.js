const express = require('express');
const {
    getMentors,
    getMentor,
    createMentor,
    deleteMentor,
    updateMentor
} = require('../controllers/mentor.controller'); // Adjust the path as needed

const router = express.Router();

// GET all mentees
router.get('/', getMentors);

// GET a single mentee by ID
router.get('/:id', getMentor);

// POST a new mentee
router.post('/', createMentor);

// DELETE a mentee by ID
router.delete('/:id', deleteMentor);

// UPDATE a mentee by ID
router.patch('/:id', updateMentor);

module.exports = router;
