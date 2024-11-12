const express = require('express');
const router = express.Router();
const { createZoomMeeting } = require('../utils/zoomHelper');
const MeetingModel = require('../models/meetingModel'); // Adjust the path as per your folder structure

// Route to create a new meeting
router.post('/create', async (req, res) => {
  try {
    const { title, mentorId, menteeId, date, duration, description } = req.body;

    // Validate inputs
    if (!title || !date || !duration) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a Zoom meeting
    const zoomMeeting = await createZoomMeeting(title, new Date(date).toISOString(), duration);

    // Save meeting details in the database
    const newMeeting = new MeetingModel({
      title,
      mentor: mentorId,
      mentee: menteeId,
      date: new Date(date), // Ensure date is a Date object
      duration,
      location: zoomMeeting.join_url,  // This is where the Zoom link is stored
      zoomLink: zoomMeeting.join_url,  // Add the zoomLink field here
      zoomMeetingId: zoomMeeting.id,
      zoomPassword: zoomMeeting.password,
      description // Include description if provided
    });

    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    console.error('Error creating meeting:', error); // Log the error for debugging
    res.status(500).json({ error: 'Error creating meeting', details: error.message });
  }
});

module.exports = router;
