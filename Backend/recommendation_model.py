import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/Nowdo")
db = client["Nowdo"]
movies_collection = db["movies"]

# Load Movies from MongoDB
movies = list(movies_collection.find())

# Create a DataFrame
df = pd.DataFrame(movies)

# Fill missing values with empty strings
df.fillna("", inplace=True)

# Combine Features into a Single String
df["features"] = (
    df["type"] + " " + df["crew"] + " " + df["year"] + " " + df["cast"].apply(lambda x: " ".join(x))
)

# Convert Text to Numerical Data
vectorizer = TfidfVectorizer(stop_words="english")
feature_matrix = vectorizer.fit_transform(df["features"])

# Compute Cosine Similarity
cosine_sim = cosine_similarity(feature_matrix)


# Function to Get Movie Recommendations
def get_recommendations(movie_title):
    if movie_title not in df["title"].values:
        return []

    index = df[df["title"] == movie_title].index[0]
    similarity_scores = list(enumerate(cosine_sim[index]))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[1:6]  # Top 5 similar movies
    recommended_movies = [df["title"].iloc[i[0]] for i in similarity_scores]

    return recommended_movies 
