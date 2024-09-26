const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller'); // Adjust the path as needed

// Create a review
router.post('/', reviewController.createReview);

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get a specific review by ID
router.get('/:id', reviewController.getReviewById);

// Update a review by ID
router.put('/:id', reviewController.updateReview);

// Delete a review by ID
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
