import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import { MdSettingsVoice } from "react-icons/md";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./Cinema.css";

const Search = ({ allMovies = [], onChange }) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const handleVoiceSearch = () => {
    setIsLoading(true); // Show loading spinner
    setError(""); // Clear previous errors
    setRecommendations([]); // Clear any previous recommendations
  
    // Initialize SpeechRecognition API
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Set language to US English
    recognition.interimResults = false; // Do not show interim results
    recognition.maxAlternatives = 1; // Max alternatives
  
    // When a result is returned from speech recognition
    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript.trim(); // Get the transcript
      transcript = transcript.replace(/[.,!?;]$/, '').trim(); // Clean up the transcript
  
      setSearch(transcript); // Set the search input with the transcript
      onChange({ target: { value: transcript } }); // Propagate the change to parent
      fetchRecommendations(transcript); // Fetch recommendations based on the transcript
    };
  
    // Handle errors in speech recognition
    recognition.onerror = (event) => {
      setIsLoading(false); // Hide loading spinner
      setError("⚠️ Error with speech recognition. Please try again."); // Show error message
      console.error("Speech recognition error:", event.error); // Log the error
    };
  
    // Stop speech recognition once it is complete
    recognition.onend = () => {
      setIsLoading(false); // Hide the loading spinner
    };
  
    // Start the speech recognition process
    recognition.start();
};
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
    onChange(e);
  };
  const fetchRecommendations = async (title) => {
    if (!title.trim()) {
      setError("⚠️ Please enter a movie title.");
      return;
    }

    setError("");
    setRecommendations([]);
    setIsLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:5000/recommend?title=${encodeURIComponent(title)}`);

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      
      if (!data.recommended_movies || data.recommended_movies.length === 0) {
        setError("❌ No recommendations found. Try another movie.");
      } else {
        setRecommendations(data.recommended_movies);
      }
    } catch (error) {
      setError("⚠️ Error fetching recommendations. Please try again.");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchRecommendations(search);
    }
  };

  const filteredMovies = allMovies.filter((movie) =>
    search === "" || movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-container">
      <input
        value={search}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="input1"
        type="text"
        placeholder=" Search Cinemas..."
      />
      <CiSearch className="icon1" />
      <MdSettingsVoice className="Mike" onClick={handleVoiceSearch} />

      {isLoading && (
        <div className="loader-container">
          <PropagateLoader style={{marginTop: '-150px', marginLeft: "-20px"}} loading={true} size={20} color="#ff0000" />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="movie-list">
        {filteredMovies.map((movie, index) => (
          <div key={index} className="movie-item">
            
          </div>
        ))}
      </div>
      {recommendations.length > 0 && (
  <div className="Recommendeddiv">
      <h1>Recommended Movies</h1>
      {recommendations.map((movie, index) => (
          <img 
            key={index}
            src={movie.image} 
            alt={movie.title} 
            // style={{ width: "50px", height: "75px", marginRight: "10px" }} 
          />
        
      ))}
    
  </div>
)}

    </div>
  );
};

export default Search;