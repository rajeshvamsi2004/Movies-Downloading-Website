from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import os

# ✅ Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# ✅ Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["Nowdo"]
collection = db["movies"]

# ✅ Define Correct Image Folder Path
IMAGE_FOLDER = os.path.join(os.getcwd(), "public", "pics")  # Ensure it matches your folder structure
app.config["UPLOAD_FOLDER"] = IMAGE_FOLDER

# ✅ Route to serve images
@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# ✅ Define API Route for Recommendations
@app.route('/recommend', methods=['GET'])
def recommend():
    title = request.args.get("title", "").strip()

    if not title:
        return jsonify({"error": "No title provided"}), 400

    print(f"🔍 Searching for movie: {title}")  # Debugging

    # 🔍 Search for the movie in MongoDB (case-insensitive)
    movie_query = collection.find_one({"title": {"$regex": f"^{title}$", "$options": "i"}})

    if not movie_query:
        print("❌ Movie not found in database")  # Debugging
        return jsonify({"error": "Movie not found"}), 404

    print(f"✅ Movie found: {movie_query['title']}")  # Debugging

    # Find movies with the same cast or crew
    movie_cast = set(movie_query.get("cast", []))
    movie_crew = set(movie_query.get("crew", []))

    recommended_movies = []
    for movie in collection.find({}, {"_id": 0, "title": 1, "cast": 1, "crew": 1, "image": 1}):
        if movie["title"].lower() == movie_query["title"].lower():
            continue  # Skip the same movie

        # Check if any cast or crew match
        if movie_cast.intersection(set(movie.get("cast", []))) or movie_crew.intersection(set(movie.get("crew", []))):
            if "image" in movie and movie["image"]:  
                movie["image"] = f"http://127.0.0.1:5000/images/{movie['image']}"
            recommended_movies.append(movie)

    return jsonify({"recommended_movies": recommended_movies[:5]})  # Return top 5 matches

# ✅ Run the Flask App
if __name__ == "__main__":
    app.run(debug=True)
