
# Krishimitra - AI-Based Crop Detection

**Krishimitra** is an AI-powered crop detection system that helps farmers identify diseases, pests, and other crop issues using machine learning. This guide will walk you through the steps to set up and run the project locally.

---

## 🚀 Prerequisites

Before you can run the project, make sure you have the following installed:

- **Python 3.x** (preferably 3.8 or above)
- **pip** (Python package installer)
- **Virtualenv** (Optional but recommended for environment isolation)

---

## 🛠️ Setup Instructions

Follow the steps below to set up the project on your local machine:

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/your-username/krishimitra.git
```

Replace `your-username` with your actual GitHub username.

### 2. Navigate to Project Directory

Move into the project directory:

```bash
cd krishimitra
```

### 3. Create a Virtual Environment (Optional)

Create a virtual environment to keep dependencies isolated:

```bash
python -m venv venv
```

Activate the virtual environment:

- On **Windows**:
  ```bash
  .\venv\Scripts\activate
  ```

- On **Mac/Linux**:
  ```bash
  source venv/bin/activate
  ```

### 4. Install Dependencies

Install the required packages using **pip**:

```bash
pip install -r requirements.txt
```

This will install all the necessary libraries like Flask, TensorFlow, OpenCV, etc.

---

## ⚡ Running the Project Locally

### 1. Start the Flask Server

Run the following command to start the Flask development server:

```bash
python app.py
```

By default, the application will run on **http://127.0.0.1:5000**.

### 2. Access the Web Interface

Open your web browser and go to **http://127.0.0.1:5000** to interact with the project.

---

## 📝 Project Structure

Here’s the layout of the project directory:

```
krishimitra/
│
├── app.py             # Main Flask application file
├── templates/         # HTML files (e.g., index.html)
├── static/            # Static files (CSS, JS)
├── utils/             # Utility functions (e.g., crop detection logic)
├── requirements.txt   # Python dependencies
└── .gitignore         # Git ignore file
```

---

## 📌 Additional Notes

- If you encounter any issues or need to stop the Flask server, press **Ctrl+C** in your terminal.
- The project uses machine learning models that require training data. Make sure the data is available or pre-trained models are present in the `utils/` folder.

---

## 🛠️ Troubleshooting

- If you see issues with missing dependencies, run:
  ```bash
  pip install --upgrade pip
  pip install -r requirements.txt
  ```

- Ensure that your Python version is compatible with the dependencies.



## 📢 Contributing

Feel free to fork the project, make changes, and submit pull requests. Contributions are always welcome!
