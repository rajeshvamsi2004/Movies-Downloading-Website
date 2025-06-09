const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// Add a new movie
router.post("/add", async (req, res) => {
  try {
    const { title,type,cast,crew,image } = req.body;
    const newMovie = new Movie({ title, type, cast, crew, image });
    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all movies
router.get("/all", async (req, res) => {
  try {
    const movies = await Movie.find();

    // ✅ Ensure full image URL is sent in the response
    const formattedMovies = movies.map(movie => ({
      ...movie._doc, // Spread existing movie data
      image: movie.image ? `http://localhost:5000/pics/${movie.image}` : null
    }));

    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
