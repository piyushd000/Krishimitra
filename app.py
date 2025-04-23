from flask import Flask, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='dist', static_url_path='/')
CORS(app)

# Route for Home Page
@app.route('/', defaults={'path': 'index.html'})
@app.route('/home', defaults={'path': 'index.html'})
def serve_home(path):
    return send_from_directory(app.static_folder, path)

# Route for Upload Page
@app.route('/upload')
def serve_upload():
    return send_from_directory(app.static_folder, 'index.html')

# Route for Dashboard Page
@app.route('/dashboard')
def serve_dashboard():
    return send_from_directory(app.static_folder, 'index.html')

# Route for About Page
@app.route('/about')
def serve_about():
    return send_from_directory(app.static_folder, 'index.html')

# Route for Contact Page
@app.route('/contact')
def serve_contact():
    return send_from_directory(app.static_folder, 'index.html')

# Route for Auth Page
@app.route('/login')
def serve_auth():
    return send_from_directory(app.static_folder, 'index.html')

# Catch-all route to serve any static file
@app.route('/<path:path>')
def serve_static(path):
    # Check if the requested path is a file in the static folder
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    # Otherwise, serve index.html for React Router to handle
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
