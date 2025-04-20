from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Sample route to test server
@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"message": "Server is running!"})


@app.route('/')
def index():
    return render_template('index.html')


# Route to receive sensor data and run drop detection
@app.route('/api/detect_drop', methods=['POST'])
def detect_drop():
    data = request.json
    if not data:
        return jsonify({"error": "No data received"}), 400

    # Import and call your model/utility here
    from utils.crop_detection import detect_drop_logic
    result = detect_drop_logic(data)

    return jsonify({"drop_detected": result})


if __name__ == '__main__':
    app.run(debug=True)
