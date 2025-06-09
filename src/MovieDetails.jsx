import React, { useEffect, useState } from "react";

const MovieDetails = ({ userId, movie }) => {
    const [review, setReview] = useState({ rating: 0, reviewText: "" });

    useEffect(() => {
        // Fetch user's review for this movie
        const fetchReview = async () => {
            const response = await fetch(`http://localhost:5000/user/${userId}`);
            const data = await response.json();
            const userReview = data.reviews.find(r => r.movieId._id === movie._id);
            if (userReview) {
                setReview(userReview);
            }
        };
        fetchReview();
    }, [userId, movie]);

    return (
        <div>
            <h3>{movie.title}</h3>
            <p>Your Rating: {review.rating}</p>
            <p>Your Review: {review.reviewText}</p>
        </div>
    );
};

export default MovieDetails;
