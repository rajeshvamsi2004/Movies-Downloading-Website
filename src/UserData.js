import React, { useEffect, useState } from "react";

const UserData = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch user data");
                
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>User Watch History</h2>
            {userData.watchHistory.length > 0 ? (
                <ul>
                    {userData.watchHistory.map((item, index) => (
                        <li key={index}>
                            {item.movieId?.title || "Unknown Movie"} - Watched on {new Date(item.watchedAt).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No watch history available.</p>
            )}

            <h2>User Reviews</h2>
            {userData.reviews.length > 0 ? (
                <ul>
                    {userData.reviews.map((review, index) => (
                        <li key={index}>
                            <strong>{review.movieId?.title || "Unknown Movie"}</strong> - Rating: {review.rating}/5
                            <p>{review.reviewText}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default UserData;
