import torch
import torchvision.transforms as transforms
from PIL import Image
import os


def load_model(model_path, num_classes=None):
    from torchvision.models import ResNet  # 👈 Important for safe globals
    import torch.serialization

    # ✅ Allowlist ResNet model for safe unpickling
    torch.serialization.add_safe_globals({'ResNet': ResNet})

    model = torch.load(model_path, map_location=torch.device('cpu'), weights_only=False)
    model.eval()
    return model



# ---- Load Class Names ----
def load_class_names(dataset_path):
    from torchvision import datasets
    dataset = datasets.ImageFolder(root=dataset_path)
    return dataset.classes

# ---- Image Preprocessing ----
def preprocess_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor()
    ])
    image = Image.open(image_path).convert("RGB")
    return transform(image)

# ---- Pretty Name Conversion ----
def format_label(label):
    return label.replace("___", " - ").replace("_", " ")

# ---- Treatment Info (Add more if needed) ----
treatment_info = {
<<<<<<< HEAD
    "Tomato___Late_blight": "Use resistant varieties. Apply fungicides regularly.",
    "Tomato___YellowLeaf__Curl_Virus": "Control whiteflies. Remove infected plants.",
    "Apple___Black_rot": "Prune infected branches. Use fungicides like Mancozeb.",
    "Healthy": "No treatment needed. Plant is healthy.",
    # Add other classes with their treatments
=======
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

    "Unknown": ""
>>>>>>> f415b1ba3b645dcf85a16e81dc55318e5de3ff34
}

# ---- Predict Function ----
def predict(image_path, model, class_names):
    image_tensor = preprocess_image(image_path).unsqueeze(0)
    with torch.no_grad():
        output = model(image_tensor)
        pred = torch.argmax(output, dim=1).item()
        class_label = class_names[pred]
        pretty_label = format_label(class_label)
        treatment = treatment_info.get(class_label, "No treatment info available.")
        return pretty_label, treatment

# ---- Main ----
if __name__ == "__main__":
    # Set paths
    model_path = "models/disease_model.pth"  # adjust if different
    dataset_path = "models/data/PlantVillage"    # path to dataset root (for label mapping)
    image_path = "test_images/tomato.webp"  # test image

    # Load components
    class_names = load_class_names(dataset_path)
    model = load_model(model_path, len(class_names))

    # Predict
    disease, recommendation = predict(image_path, model, class_names)

    print(f"\n🩺 Disease Detected: {disease}")
    print(f"💡 Recommendation: {recommendation}")
