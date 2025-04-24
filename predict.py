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
    "Tomato___Late_blight": "Use resistant varieties. Apply fungicides regularly.",
    "Tomato___YellowLeaf__Curl_Virus": "Control whiteflies. Remove infected plants.",
    "Apple___Black_rot": "Prune infected branches. Use fungicides like Mancozeb.",
    "Healthy": "No treatment needed. Plant is healthy.",
    # Add other classes with their treatments
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
