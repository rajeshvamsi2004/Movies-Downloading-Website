import React, { useState } from "react";
import "./Cinema.css";

const MovieRecommendation = () => {
  const [title, setTitle] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setError("");
    setRecommendations([]);
    setLoading(true);

    if (!title.trim()) {
      setError("⚠️ Please enter a movie title.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/recommend?title=${encodeURIComponent(title)}`
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("📌 API Response:", JSON.stringify(data, null, 2));

      if (!data.recommended_movies || data.recommended_movies.length === 0) {
        setError("❌ No recommendations found. Try another movie.");
      } else {
        setRecommendations(data.recommended_movies);
      }
    } catch (error) {
      setError("⚠️ Error fetching recommendations. Please try again.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendation-container">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input1"
        type="text"
        placeholder="Enter movie title..."
      />
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "🔄 Loading..." : "🎬 Get Recommendations"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="movie-list">
        {recommendations.map((movie, index) => (
          <div key={index} className="movie-item">
            <img
              src={movie.image} 
              onError={(e) => {
                if (!e.target.dataset.error) {
                  console.error("❌ Image load failed:", e.target.src);
                  e.target.dataset.error = "true";
                  e.target.src = "/images/All.jpeg"; 
                }
              }}
              alt={movie.title || "Movie Image"}
              className="movie-image"
            />
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendation;
