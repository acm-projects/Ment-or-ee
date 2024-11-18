import React, { useState, useEffect } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { MdOutlineStarHalf } from "react-icons/md";
import { UseAuth } from "../../context/AuthContext";

const existingReviews = [
  {
    name: "Finn Gomez",
    rating: 4.5,
    text: "I’m incredibly grateful for the mentorship I received from this mentor. Their guidance and support were instrumental in helping me secure an internship. They provided valuable advice, constructive feedback, and pushed me to build confidence and sharpen my skills. This mentor not only helped with technical aspects but also shared industry insights and networking tips. I'm excited to apply everything they taught me in my future career. Thank you for your support!",
    date: "2024-10-16",
    id: "67180e89157b3c18a7d20248",
  },
  {
    name: "Alice Nguyen",
    rating: 5,
    text: "Best mentor ever!! I would highly recommend this mentor for anyone interested in tech. Not only are they genuinely passionate about mentoring, but they also had so much experience.",
    date: "2024-9-26",
  },
];

const Stars = ({ rating, totalStars = 5 }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= totalStars; i++) {
      if (i <= fullStars) {
        stars.push(<IoStarSharp key={i} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<MdOutlineStarHalf key={i} />);
      } else {
        stars.push(<IoStarOutline key={i} />);
      }
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

const ReviewForm = ({ onSubmit, onClose }) => {
  const { user } = UseAuth();
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewDate = new Date().toISOString().slice(0, 10);
    const ratingInt = parseInt(rating, 10);
    onSubmit({
      name: user.name,
      rating: ratingInt,
      text: reviews,
      date: reviewDate,
    });
    onClose();
  };

  return (
    <div className="bg-white border-black p-4 rounded-lg shadow">
      <h2 className="text-xl mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Review:</label>
          <textarea
            className="w-full p-2 border rounded"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-lg text-white bg-[#1F2839] rounded flex items-center hover:bg-[#1F2839] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewComponent = ({ selfView }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(existingReviews);
  }, [existingReviews]);

  const handleSubmitReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    // to do: make api calls to backend
  };

  const avgRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const starRating = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(avgRating)) {
      starRating.push(<IoStarSharp key={i} />);
    } else if (i - 0.75 <= avgRating && avgRating < i) {
      starRating.push(<MdOutlineStarHalf key={i} />);
    } else {
      starRating.push(<IoStarOutline key={i} />);
    }
  }

  return (
    <div className="w-full bg-[#D6C7B1] px-5 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 m-6">
        <div className="sm:col-span-1 m-2">
          <h1 className="text-2xl">Mentee Reviews</h1>
          <div className="py-3 flex items-center">
            <div className="flex">{starRating}</div>
            <span className="ml-2">{avgRating.toFixed(2)} out of 5 stars</span>
          </div>
          <div className="py-2">{reviews.length} ratings</div>
        </div>

        <div className="sm:col-span-2 m-2">
          {!selfView && (
            <div>
              <h1 className="text-2xl py-3">Review this mentor</h1>
              <h2 className="text-1xl py-2">
                Share your thoughts with other mentees
              </h2>
              {showReviewForm ? (
                <ReviewForm
                  onSubmit={handleSubmitReview}
                  onClose={() => setShowReviewForm(false)}
                />
              ) : (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-4 py-2 text-lg text-white bg-[#1F2839] rounded-full flex items-center hover:bg-[#1F2839] focus:outline-none focus:ring-2 focus:ring-[#1F2839]"
                >
                  Write a review
                </button>
              )}
              <div className="w-full border-t border-[#1F2839] my-4"></div>
            </div>
          )}

          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <div className="py-4">
                    <p className="text-xl py-1">{review.name}</p>
                    <div className="py-1 flex items-center">
                      <div className="flex">
                        <Stars rating={review.rating} />
                      </div>
                      <span className="ml-2">{review.rating}/5</span>
                    </div>
                    <p className="text-sm py-1 opacity-85">
                      Reviewed on {review.date}
                    </p>
                    <p className="py-1">{review.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
