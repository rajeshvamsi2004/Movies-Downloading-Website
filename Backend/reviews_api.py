from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import datetime

# ✅ Initialize Flask App for Reviews
app_reviews = Flask(__name__)
CORS(app_reviews)  # Enable CORS for frontend requests

# ✅ Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["Nowdo"]
reviews_collection = db["reviews"]  # Collection for storing reviews

# ✅ API: Add a Review
@app_reviews.route('/add_review', methods=['POST'])
def add_review():
    data = request.json
    title = data.get("title")
    user = data.get("user")
    rating = data.get("rating")
    comment = data.get("comment")

    if not title or not user or not rating or not comment:
        return jsonify({"error": "All fields are required!"}), 400

    review = {
        "title": title,
        "user": user,
        "rating": int(rating),
        "comment": comment,
        "timestamp": datetime.datetime.utcnow()
    }

    reviews_collection.insert_one(review)
    return jsonify({"message": "Review added successfully!"}), 201

# ✅ API: Get Reviews for a Movie
@app_reviews.route('/get_reviews', methods=['GET'])
def get_reviews():
    title = request.args.get("title")

    if not title:
        return jsonify({"error": "No title provided!"}), 400

    reviews = list(reviews_collection.find({"title": title}, {"_id": 0}))  # Exclude _id field
    return jsonify({"reviews": reviews})

# ✅ Run Flask App for Reviews
if __name__ == "__main__":
    app_reviews.run(port=5001, debug=True)  # Runs on port 5001
