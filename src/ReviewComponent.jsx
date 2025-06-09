import React, { useState, useEffect } from "react";

const ReviewComponent = ({ movieTitle }) => {
  const [reviews, setReviews] = useState([]); 
  const [rating, setRating] = useState(0);  
  const [comment, setComment] = useState("");   
  const [show,setShow] = useState(false)
  const handle=()=>{
    setShow(!show);
  } 
  useEffect(() => {
    console.log(`Fetching reviews for ${movieTitle}`);
    fetch(`http://127.0.0.1:5001/get_reviews?title=${movieTitle}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched reviews:", data);
        if (data.reviews) {
          setReviews(data.reviews);
        } else {
          console.warn("No reviews found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [movieTitle]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      title: movieTitle,
      user: "GuestUser", 
      rating: parseInt(rating), 
      comment: comment.trim(), 
    };

    try {
      // Send the review to the backend (POST request)
      const response = await fetch("http://127.0.0.1:5001/add_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Review added successfully!");

        // Add the new review to the existing list of reviews immediately
        setReviews((prevReviews) => [...prevReviews, reviewData]);

        // Reset comment and rating after submission
        setComment("");
        setRating(0);
      } else {
        alert("❌ Failed to submit review: " + data.error);
      }
    } catch (error) {
      console.error("❌ Network error:", error); // Debug log
      alert("❌ Network error. Could not submit review.");
    }
  };

  console.log("Current reviews:", reviews); // Debug log to see the reviews state

  return (
    <div>
      <button style={{backgroundColor: 'red', width: '150px', left: '40px', color: 'white', position: 'absolute', top: "900px"}} onClick={handle}>showmore</button>
      

      {/* Show a message if no reviews are present */}
      {reviews.length === 0 ? (
        <p></p>
      ) : (
        
        <ul>
          {reviews.map((rev, index) => (
            show && (
             <li style={{color: 'white', position: 'absolute', top: '900px', left: '250px'}} key={index}> 
              <strong>{rev.user}</strong>: {rev.comment} ⭐ {rev.rating}/5
             </li>)
          ))}
        </ul>
      )}
      <form style={{display: 'flex', flexDirection: 'column', border: '2px solid white', width: "300px", marginLeft: "200px", padding: '10px', marginTop: '80px'}} onSubmit={handleSubmit}>
         <h1 style={{color: 'white', position: 'absolute', left: '100px', top: '590px', fontFamily: "sans-serif", fontSize: '25px'}}>Review</h1>
        <label>
          <select style={{outline: 'none'}} value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="0">Select</option>
            <option value="1">1 - Bad</option>
            <option value="2">2 - Okay</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </label>
        <br/>
        <label>
          <textarea style={{fontFamily: "san-serif", outline: 'none'}}
            value={comment}
            placeholder="comment"
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <br/>
        <button style={{width: "100px", height: "25px", marginLeft: "90px", borderRadius: "10px"}} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewComponent;
