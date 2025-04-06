# app/routes/predict_route.py

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from app.model.predict import predict_image

predict_bp = Blueprint('predict_bp', __name__)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        label, confidence = predict_image(filepath)
        return jsonify({'class': label, 'confidence': float(confidence)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
