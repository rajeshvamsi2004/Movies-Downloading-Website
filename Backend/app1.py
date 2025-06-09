from flask import Flask, send_file, request, jsonify
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.http import MediaIoBaseDownload
import os
import io
import shutil
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

# Initialize the Flask application
app = Flask(__name__)

# Google Drive API authentication
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
MOVIE_DIR = './movies'  # Directory where the movie will be downloaded temporarily
ORIGINAL_FILE_DIR = './original_files'  # Directory where the original movie file will be moved
ENCRYPTED_FILE_DIR = './encrypted_data'  # Directory where the encrypted movie file will be stored

# Ensure these directories exist
os.makedirs(MOVIE_DIR, exist_ok=True)
os.makedirs(ORIGINAL_FILE_DIR, exist_ok=True)
os.makedirs(ENCRYPTED_FILE_DIR, exist_ok=True)

# Google Drive Authentication
def authenticate_google_drive():
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json', SCOPES)
    creds = flow.run_local_server(port=0)
    drive_service = build('drive', 'v3', credentials=creds)
    return drive_service

# Function to download the movie file from Google Drive
def download_file_from_drive(file_id, destination):
    service = authenticate_google_drive()
    request = service.files().get_media(fileId=file_id)
    fh = io.FileIO(destination, 'wb')
    downloader = MediaIoBaseDownload(fh, request)

    done = False
    while done is False:
        status, done = downloader.next_chunk()
        print(f"Download {int(status.progress() * 100)}%.")
    return destination

# Function to encrypt the movie file using AES
def encrypt_file(input_path, output_path, key):
    cipher = AES.new(key, AES.MODE_CBC)
    
    if not os.path.exists(input_path):
        print(f"Error: The file {input_path} does not exist.")
        return False

    with open(input_path, 'rb') as file:
        plaintext = file.read()

    ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))

    with open(output_path, 'wb') as out_file:
        out_file.write(cipher.iv + ciphertext)
    return True

# Route to download and move the movie file
@app.route('/download/<file_id>/<filename>')
def download_movie(file_id, filename):
    local_file_path = os.path.join(MOVIE_DIR, filename)
    original_file_path = os.path.join(ORIGINAL_FILE_DIR, filename)
    encrypted_file_path = os.path.join(ENCRYPTED_FILE_DIR, f'{filename}.enc')

    key = b'1234567890123456'  # AES encryption key (replace with your own secure key)

    # Step 1: Download the movie from Google Drive to the 'movies/' folder
    if not os.path.exists(local_file_path):
        print(f"Downloading {filename} from Google Drive...")
        download_file_from_drive(file_id, local_file_path)
    
    # Step 2: Move the downloaded movie to the 'original_files/' folder
    try:
        shutil.move(local_file_path, original_file_path)
        print(f"File moved successfully to {original_file_path}")
    except Exception as e:
        print(f"Error while moving file: {e}")
        return f"Error: Unable to move the movie file {filename}.", 500
    
    # Step 3: Encrypt the movie file if it doesn't exist already
    if not os.path.exists(encrypted_file_path):
        print(f"Encrypting the movie: {filename}")
        if encrypt_file(original_file_path, encrypted_file_path, key):
            print(f"Encryption successful: {filename} encrypted and saved as {filename}.enc.")
        else:
            print(f"Encryption failed for {filename}.")
            return f"Error: Encryption of {filename} failed.", 500
    else:
        print(f"Encrypted file {filename}.enc already exists, skipping encryption.")
    
    # Step 4: Return the encrypted movie file to the user
    return send_file(encrypted_file_path, as_attachment=True)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
