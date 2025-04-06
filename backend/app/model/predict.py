import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from app.utils.image_utils import preprocess_image
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'garbage_classifier_model.h5')
model = load_model(MODEL_PATH)

# Replace with your actual class names
class_names = [
    'battery', 'biological', 'cardboard', 'clothes', 'glass',
    'metal', 'paper', 'plastic', 'shoes', 'trash'
]

def predict_image(img_path):
    img_array = preprocess_image(img_path)
    prediction = model.predict(img_array)
    predicted_class = class_names[np.argmax(prediction)]
    confidence = np.max(prediction)
    return predicted_class, confidence
