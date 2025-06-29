import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
from io import StringIO

# Define the CSV data
data = """temperature,humidity,soil_moisture,rainfall,sunlight,disease_label
28,85,0.6,3.5,7,Tomato___Late_blight
32,60,0.4,0.2,8,Tomato___Healthy
25,90,0.7,4.0,5,Tomato___Early_blight
30,80,0.5,2.5,6,Tomato___Late_blight
33,55,0.3,0.0,9,Tomato___Healthy
26,92,0.6,3.8,4,Tomato___Early_blight
29,75,0.5,2.0,7,Tomato___Late_blight
31,58,0.4,0.5,8,Tomato___Healthy
27,88,0.6,3.2,6,Tomato___Early_blight
28,82,0.5,2.8,6.5,Tomato___Late_blight"""

# Convert the string data into a pandas DataFrame
df = pd.read_csv(StringIO(data))

# Display the DataFrame (optional)
print("Dataset:")
print(df)

# Feature columns and target
X = df[['temperature', 'humidity', 'soil_moisture', 'rainfall', 'sunlight']]
y = df['disease_label']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# Train the model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Evaluate the model
y_pred = clf.predict(X_test)

print("\n🔍 Classification Report:\n")
print(classification_report(y_test, y_pred))
print(f"✅ Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")

# Save the model
os.makedirs('models', exist_ok=True)
joblib.dump(clf, 'models/environment_model.pkl')
print("\n✅ Model saved to: models/environment_model.pkl")
