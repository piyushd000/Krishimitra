(Work under progress!)
The guide may or may not work

---

# 🌾 Krishimitra – AI-Based Crop Detection System

**Krishimitra** is an AI-powered solution designed to help farmers detect crop diseases, pest infestations, and other issues using deep learning and computer vision. This guide walks you through setting up and running the project locally.

---

## ✅ Prerequisites

Ensure you have the following tools installed:

* **Python 3.11**
* **pip** – Python package manager
* **Node.js & npm** – for frontend dependencies
* **Anaconda** *(optional, required if Python 3.11 is not installed)*

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/piyushd000/krishimitra.git
cd krishimitra
```


### 2. Set Up Python 3.11 Environment

> ✅ **Option 1** – *If you already have Python 3.11 installed*:

```bash
python -m venv venv
```

* **Windows**:

  ```bash
  .\venv\Scripts\activate
  ```
* **macOS/Linux**:

  ```bash
  source venv/bin/activate
  ```

> 🛠 **Option 2** – *If you do not have Python 3.11 installed*:

Use **Anaconda** to create a virtual environment with Python 3.11:

```bash
conda create -n krishienv python=3.11
conda activate krishienv
```

---

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Install Frontend Dependencies (npm)

Make sure you are in the root directory and run:

```bash
npm install
```

Then, build the frontend:

```bash
npm run build
```

---

## 🚀 Run the Project Locally

Once the backend and frontend dependencies are set up:

```bash
python app.py
```

The server will start at: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 🗂️ Project Structure

```
krishimitra/
│
├── app.py               # Main Flask application
├── requirements.txt     # Python dependencies
├── templates/           # HTML files (UI)
├── static/              # CSS, JS, and image assets
├── utils/               # ML logic and helper functions
├── package.json         # npm dependencies
├── .gitignore
└── ...
```

---

## 📎 Notes

* Place any **pretrained models** or **datasets** inside the `utils/` directory.
* Press **Ctrl+C** in the terminal to stop the Flask server.
* Make sure Node.js is properly installed for `npm run build` to succeed.

---

## 🧰 Troubleshooting

* Upgrade pip if needed:

  ```bash
  pip install --upgrade pip
  ```

* Reinstall requirements:

  ```bash
  pip install -r requirements.txt
  ```

* If `npm install` fails, try deleting `node_modules` and reinstall:

  ```bash
  rm -rf node_modules
  npm install
  ```

---

## 🤝 Contributing

We welcome contributions! Fork the repo, create a new branch, make your changes, and submit a pull request.

---