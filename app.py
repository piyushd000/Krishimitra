from flask import Flask, send_from_directory, redirect, url_for
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms, datasets
from PIL import Image
import io
import os
import joblib




app = Flask(__name__, static_folder='dist', static_url_path='/')
CORS(app)




# Route for Home Page
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/home')
def redirect_home():
    return redirect(url_for('serve_index'))

# Route for env Page
@app.route('/Prediction')
def serve_predict():
    return send_from_directory(app.static_folder, 'index.html')


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
    

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
from torchvision import datasets, transforms
from torchvision.models.resnet import ResNet
from torch.serialization import add_safe_globals
import joblib
import os


# ---- Device Configuration ----
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ---- Add ResNet class for safe loading ----
add_safe_globals({'torchvision.models.resnet.ResNet': ResNet})

# ---- Load Plant Disease Model ----
def load_disease_model(model_path):
    model = torch.load(model_path, map_location=device, weights_only=False)
    model.to(device)
    model.eval()
    return model

# ---- Load Class Names ----
def load_class_names(dataset_path):
    dataset = datasets.ImageFolder(root=dataset_path)
    return dataset.classes

# ---- Image Transform ----
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# ---- Disease Treatment Info ----
treatment_info = {
    "Tomato___Late_blight": "Use resistant varieties. Apply fungicides regularly.",
    "Tomato___YellowLeaf__Curl_Virus": "Control whiteflies. Remove infected plants.",
    "Apple___Black_rot": "Prune infected branches. Use fungicides like Mancozeb.",
    "Healthy": "No treatment needed. Plant is healthy.",
    # Add more class-treatment pairs if needed
}

def format_label(label):
    return label.replace("___", " - ").replace("_", " ")

# ---- Load Models ----
DISEASE_MODEL_PATH = "models/disease_model.pth"
DATASET_PATH = "models/data/PlantVillage"
ENV_MODEL_PATH = "models/environment_model.pkl"

disease_model = load_disease_model(DISEASE_MODEL_PATH)
env_model = joblib.load(ENV_MODEL_PATH)
class_names = load_class_names(DATASET_PATH)

# ---- Route: Disease Detection from Image ----
@app.route("/load", methods=["POST"])
def load_disease():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        image = Image.open(file.stream).convert("RGB")
        image_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            output = disease_model(image_tensor)
            pred = torch.argmax(output, dim=1).item()
            class_label = class_names[pred]
            pretty_label = format_label(class_label)
            recommendation = treatment_info.get(class_label, "No treatment info available.")

        return jsonify({
            "prediction": pretty_label,
            "treatment": recommendation
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

# ---- Route: Environment-Based Crop Prediction ----
@app.route("/predict", methods=["POST"])
def predict_environment():
    try:
        data = request.get_json()

        features = [
            data["temperature"],
            data["humidity"],
            data["soil_moisture"],
            data["rainfall"],
            data["sunlight"]
        ]

        prediction = env_model.predict([features])[0]

        return jsonify({
            "prediction": prediction
        })

    except KeyError as e:
        return jsonify({
            "error": f"Missing input field: {str(e)}"
        }), 400
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

# ---- Run the App ----
if __name__ == "__main__":
    app.run(debug=True)
