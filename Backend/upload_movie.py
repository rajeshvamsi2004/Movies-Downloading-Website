from flask import Flask, request, jsonify
from pydrive2.auth import GoogleAuth
from pydrive2.drive import GoogleDrive
import os
import time

app = Flask(__name__)

# 🔹 Debugging: Log available routes once
@app.before_request
def log_routes():
    if not hasattr(app, "logged_routes"):
        print("✅ Flask is running, available routes:")
        print(app.url_map)
        app.logged_routes = True  # Log only once

# 🔐 Authenticate with Google Drive (request refresh token)
gauth = GoogleAuth()
gauth.settings["get_refresh_token"] = True  # Ensure a refresh token is obtained
gauth.LoadCredentialsFile("mycreds.txt")

if gauth.credentials is None:
    gauth.LocalWebserverAuth()  # Will request offline access because get_refresh_token is True
elif gauth.access_token_expired:
    gauth.Refresh()
else:
    gauth.Authorize()

gauth.SaveCredentialsFile("mycreds.txt")
drive = GoogleDrive(gauth)

# Google Drive Folder ID (replace with your actual folder ID)
FOLDER_ID = "1Mdoa3R9dc_sKDq56b4nzvYt0dujd7pBT"

def delete_file(path, retries=3, delay=1):
    for i in range(retries):
        try:
            os.remove(path)
            print(f"🗑️ Deleted local file: {path}")
            return True
        except Exception as e:
            print(f"⚠️ Deletion attempt {i+1} failed: {str(e)}")
            time.sleep(delay)
    return False

@app.route("/upload", methods=["POST"])
def upload_to_drive():
    data = request.json
    file_name = data.get("fileName")
    
    if not file_name:
        return jsonify({"error": "Missing fileName"}), 400

    downloads_path = os.path.join(os.path.expanduser("~"), "Downloads", file_name)
    print(f"🔍 Looking for file at: {downloads_path}")

    # Wait until the file is completely downloaded (max 20 seconds)
    timeout = 70
    while not os.path.exists(downloads_path) and timeout > 0:
        print(f"⏳ Waiting for {file_name} to finish downloading... ({timeout}s left)")
        time.sleep(2)
        timeout -= 2

    if not os.path.exists(downloads_path):
        print(f"❌ Error: File {file_name} not found in Downloads")
        return jsonify({"error": "File not found in Downloads", "checked_path": downloads_path}), 404

    try:
        print(f"🚀 Uploading {file_name} to Google Drive (Folder ID: {FOLDER_ID})...")
        file = drive.CreateFile({"title": file_name, "parents": [{"id": FOLDER_ID}]})
        file.SetContentFile(downloads_path)
        file.Upload()
        print(f"✅ Upload complete: {file_name} is now in Google Drive!")
        
        # Delay to ensure the file handle is released before deletion
        time.sleep(1)
        
        if delete_file(downloads_path):
            print(f"🗑️ {file_name} successfully deleted from local storage.")
        else:
            print(f"⚠️ Could not delete {file_name} after multiple attempts.")
        
        return jsonify({"message": f"✅ {file_name} uploaded & removed locally."})
    except Exception as e:
        print(f"❌ Upload error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Starting Flask server...")
    app.run(debug=True)
