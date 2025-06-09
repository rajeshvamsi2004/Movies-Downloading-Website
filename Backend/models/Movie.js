const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: [String], required: true }, 
  cast: { type: [String], default: [] },  
  crew: { type: [String], default: [] },  
  image: { type: String, required: true },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
