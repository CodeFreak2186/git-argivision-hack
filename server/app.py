import os
# MANDATORY: Set legacy Keras environment variable before importing tensorflow
os.environ['TF_USE_LEGACY_KERAS'] = '1'

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
# Use tf_keras (the legacy package compatible with older .h5 models)
try:
    import tf_keras as keras
except ImportError:
    import tensorflow.keras as keras

import numpy as np
from PIL import Image, ImageOps
import io

app = Flask(__name__)
CORS(app)

# Use absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "test2", "keras_model.h5")
LABELS_PATH = os.path.join(BASE_DIR, "..", "test2", "labels.txt")

model = None
labels = []

try:
    if os.path.exists(MODEL_PATH):
        # We use the legacy keras loader to handle the DepthwiseConv2D 'groups' error
        model = keras.models.load_model(MODEL_PATH, compile=False)
        print("✅ LEGACY Keras Model loaded successfully.")
        
        if os.path.exists(LABELS_PATH):
            with open(LABELS_PATH, "r") as f:
                labels = [line.strip() for line in f.readlines()]
            print(f"✅ Labels loaded: {labels}")
    else:
        print(f"❌ ERROR: Model file not found at {MODEL_PATH}")
except Exception as e:
    print(f"❌ ERROR LOADING MODEL: {e}")
    print("TIP: If you see 'Unrecognized keyword arguments', make sure you ran 'pip install tf-keras'")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files['file']
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
        
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized_image_array

        prediction = model.predict(data)
        index = np.argmax(prediction)
        
        label_name = labels[index] if index < len(labels) else f"Class {index}"
        confidence_score = float(prediction[0][index])

        return jsonify({
            "class": label_name,
            "confidence": round(confidence_score * 100, 2),
            "details": f"Detection: {label_name}",
            "recommendation": "Management strategy updated in dashboard."
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

telemetry_data = {"altitude": 0, "battery": 100, "health": "Healthy", "status": "Online"}

@app.route('/update_telemetry', methods=['POST'])
def update_telemetry():
    global telemetry_data
    data = request.json
    if data: telemetry_data.update(data)
    return jsonify({"status": "success"})

@app.route('/get_telemetry', methods=['GET'])
def get_telemetry():
    return jsonify(telemetry_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
