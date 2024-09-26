const ReviewModel = require('../models/reviewModel'); // Adjust the path as needed
const mongoose = require('mongoose');

// Create a new review
const createReview = async (req, res) => {
    const { rating, text, creator, reviewedUser } = req.body;

    if (!rating || !text || !creator || !reviewedUser) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const review = new ReviewModel({
            rating,
            text,
            creator: mongoose.Types.ObjectId(creator),
            reviewedUser: mongoose.Types.ObjectId(reviewedUser),
        });

        const savedReview = await review.save();
        return res.status(201).json(savedReview);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.find().populate('creator reviewedUser', '-password'); // Assuming UserModel has a password field you want to exclude
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get review by ID
const getReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await ReviewModel.findById(id).populate('creator reviewedUser', '-password');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        return res.status(200).json(review);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update a review by ID
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, text } = req.body;

    try {
        const review = await ReviewModel.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.rating = rating || review.rating;
        review.text = text || review.text;

        const updatedReview = await review.save();
        return res.status(200).json(updatedReview);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await ReviewModel.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};
