const express = require('express');
const menteeController = require('../controllers/mentee.controller');

const router = express.Router();

router.post('/', menteeController.createMentee); // Create a new mentee
router.get('/', menteeController.getAllMentees); // Get all mentees
router.get('/:id', menteeController.getMenteeById); // Get a single mentee by ID
router.put('/:id', menteeController.updateMentee); // Update a mentee by ID
router.delete('/:id', menteeController.deleteMentee); // Delete a mentee by ID

module.exports = router;
