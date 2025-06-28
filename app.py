<<<<<<< HEAD
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
=======
from flask import Flask, send_from_directory, redirect, url_for, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import joblib
import tensorflow as tf

# ---- Flask App Setup ----
app = Flask(__name__, static_folder='dist', static_url_path='/')
CORS(app)

# ---- Load TFLite Interpreter ----
TFLITE_MODEL_PATH = "models/model.tflite"
tflite_interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
tflite_interpreter.allocate_tensors()

# ---- Load Class Names from class_names.txt ----
def load_class_names(file_path):
    with open(file_path, 'r') as f:
        return [line.strip() for line in f.readlines()]

class_names = load_class_names("models/class_names.txt")

# ---- Load Crop Environment Model ----
ENV_MODEL_PATH = "models/environment_model.pkl"
env_model = joblib.load(ENV_MODEL_PATH)

# ---- Disease Treatment Information ----
treatment_info = {
    "Apple___Apple_scab": "Use resistant apple varieties and apply fungicides such as captan or mancozeb during the early growing season.",
    "Apple___Black_rot": "Prune infected branches and remove mummified fruit. Apply fungicides like captan or thiophanate-methyl.",
    "Apple___Cedar_apple_rust": "Remove nearby juniper trees. Apply fungicides such as myclobutanil or mancozeb during early season.",
    "Apple___healthy": "No treatment needed. The plant is healthy.",

    "Blueberry___healthy": "No treatment needed. The plant is healthy.",

    "Cherry_(including_sour)___Powdery_mildew": "Apply sulfur-based fungicides and improve air circulation by pruning.",
    "Cherry_(including_sour)___healthy": "No treatment needed. The plant is healthy.",

    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "Use resistant hybrids and practice crop rotation. Apply fungicides like azoxystrobin if needed.",
    "Corn_(maize)___Common_rust_": "Use rust-resistant varieties. Apply fungicides such as propiconazole during early infection.",
    "Corn_(maize)___Northern_Leaf_Blight": "Plant resistant hybrids. Apply fungicides like pyraclostrobin or trifloxystrobin if needed.",
    "Corn_(maize)___healthy": "No treatment needed. The plant is healthy.",

    "Grape___Black_rot": "Remove infected fruit and leaves. Apply fungicides like mancozeb or myclobutanil.",
    "Grape___Esca_(Black_Measles)": "Remove infected vines and avoid over-irrigation. No chemical cure, manage through pruning.",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Apply fungicides like mancozeb and improve air circulation.",
    "Grape___healthy": "No treatment needed. The plant is healthy.",

    "Orange___Haunglongbing_(Citrus_greening)": "Remove and destroy infected trees. Control psyllid population with insecticides. No cure available.",

    "Peach___Bacterial_spot": "Use disease-free planting material and apply copper-based bactericides. Avoid overhead irrigation.",
    "Peach___healthy": "No treatment needed. The plant is healthy.",

    "Pepper,_bell___Bacterial_spot": "Use certified seeds. Apply copper-based sprays and avoid working when foliage is wet.",
    "Pepper,_bell___healthy": "No treatment needed. The plant is healthy.",

    "Potato___Early_blight": "Use certified disease-free seeds and rotate crops. Apply fungicides like chlorothalonil or mancozeb.",
    "Potato___Late_blight": "Apply systemic fungicides like metalaxyl. Destroy infected plants and avoid overhead watering.",
    "Potato___healthy": "No treatment needed. The plant is healthy.",

    "Raspberry___healthy": "No treatment needed. The plant is healthy.",

    "Soybean___healthy": "No treatment needed. The plant is healthy.",

    "Squash___Powdery_mildew": "Use sulfur-based or systemic fungicides. Ensure good air circulation and avoid overhead watering.",

    "Strawberry___Leaf_scorch": "Remove and destroy infected leaves. Apply fungicides like myclobutanil and reduce leaf wetness.",
    "Strawberry___healthy": "No treatment needed. The plant is healthy.",

    "Tomato___Bacterial_spot": "Use copper-based sprays and disease-free seeds. Avoid overhead irrigation.",
    "Tomato___Early_blight": "Rotate crops and apply fungicides like mancozeb or chlorothalonil.",
    "Tomato___Late_blight": "Remove infected plants and apply fungicides such as metalaxyl.",
    "Tomato___Leaf_Mold": "Improve air circulation and apply fungicides like chlorothalonil or copper sprays.",
    "Tomato___Septoria_leaf_spot": "Remove infected leaves. Use fungicides such as mancozeb and ensure dry foliage.",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Use miticides or insecticidal soaps. Keep plants well-watered and stress-free.",
    "Tomato___Target_Spot": "Apply appropriate fungicides and remove affected foliage promptly.",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Control whitefly vectors and remove infected plants. No chemical treatment available.",
    "Tomato___Tomato_mosaic_virus": "Remove infected plants. Disinfect tools and hands. Use resistant tomato varieties.",
    "Tomato___healthy": "No treatment needed. The plant is healthy.",

    "Unknown": "Unrecognized object. Please upload a clear plant leaf image for accurate diagnosis."
}

# ---- Format Class Labels ----
def format_label(label):
    return label.replace("___", " - ").replace("_", " ")

# ---- Static Frontend Routes ----
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

<<<<<<< HEAD
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
=======
@app.route('/<path:path>')
def serve_static(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/home')
@app.route('/about')
@app.route('/contact')
@app.route('/dashboard')
@app.route('/upload')
@app.route('/login')
@app.route('/Prediction')
def route_views():
    return send_from_directory(app.static_folder, 'index.html')

# ---- Route: Plant Disease Detection ----
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
@app.route("/load", methods=["POST"])
def load_disease():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
<<<<<<< HEAD
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
=======
        image = Image.open(file.stream).convert("RGB").resize((224, 224))
        image_array = tf.keras.applications.mobilenet.preprocess_input(np.array(image, dtype=np.float32))
        input_data = np.expand_dims(image_array, axis=0)

        input_details = tflite_interpreter.get_input_details()
        output_details = tflite_interpreter.get_output_details()
        tflite_interpreter.set_tensor(input_details[0]['index'], input_data)
        tflite_interpreter.invoke()
        output = tflite_interpreter.get_tensor(output_details[0]['index'])[0]

        pred_index = int(np.argmax(output))
        confidence = float(np.max(output))

        if confidence < 0.7 or pred_index >= len(class_names):
            return jsonify({
                "prediction": "Unknown or Unrelated Image",
                "confidence": round(confidence * 100, 2),
                "treatment": "Please upload a clear plant leaf image for accurate diagnosis."
            })
        class_label = class_names[pred_index]
        pretty_label = format_label(class_label)
        treatment = treatment_info.get(class_label, "No treatment info available.")

        return jsonify({
            "prediction": pretty_label,
            "confidence": round(confidence * 100, 2),
            "treatment": treatment
        })

    except Exception as e:
        print(f"[ERROR] {e}")
        return jsonify({"error": str(e)}), 500

# ---- Route: Environment-Based Crop Suggestion ----
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
@app.route("/predict", methods=["POST"])
def predict_environment():
    try:
        data = request.get_json()
<<<<<<< HEAD

=======
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
        features = [
            data["temperature"],
            data["humidity"],
            data["soil_moisture"],
            data["rainfall"],
            data["sunlight"]
        ]
<<<<<<< HEAD

=======
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
        prediction = env_model.predict([features])[0]

        return jsonify({
            "prediction": prediction
        })

    except KeyError as e:
<<<<<<< HEAD
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
=======
        return jsonify({"error": f"Missing input field: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---- Start Flask App ----
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
