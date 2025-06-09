import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ReviewForm = ({ movie, closeModal, userEmail }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail || !movie?.title || !reviewText || rating === undefined) {
      console.error("❌ Missing required fields!");
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        email: userEmail,
        movieTitle: movie.title,
        reviewText,
        rating
      });

      alert("✅ Review submitted successfully!");
      closeModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("❌ Failed to submit review. Try again.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <input
        style={{width: "250px", height: "250px"}}
          type="number"
          min="0"
          max="10"
          placeholder="Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  movie: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default ReviewForm;
