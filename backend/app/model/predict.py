import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from app.utils.image_utils import preprocess_image
import gdown

# Google Drive file ID and local model path
MODEL_FILE_ID = '16c3QBVjcQbHkIBFXyJhTx5lcenzIrYJO'
# MODEL_FILE_ID = '1luQ_12BeWknMlvWPRCk7RbK4i9qNBGHC' # model1
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'garbage_classifier_model.h5')

# Class labels
class_names = [
     'biological', 'cardboard', 'glass',
    'metal', 'paper', 'plastic', 'trash'
]
# class_names = [
#     'battery', 'biological', 'cardboard', 'clothes', 'glass',
#     'metal', 'paper', 'plastic', 'shoes', 'trash'
# ]

# Lazy-loaded model
model = None

def download_model():
    """Download the model file from Google Drive if it doesn't exist locally."""
    print("Downloading model from Google Drive...")
    url = f'https://drive.google.com/uc?id={MODEL_FILE_ID}'
    gdown.download(url, MODEL_PATH, quiet=False)

def get_model():
    """Load and return the Keras model, downloading if necessary."""
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            download_model()
        model = load_model(MODEL_PATH)
    return model

def predict_image(img_path):
    """Preprocess image and return prediction and confidence."""
    model = get_model()
    img_array = preprocess_image(img_path)
    prediction = model.predict(img_array)
    predicted_class = class_names[np.argmax(prediction)]
    confidence = float(np.max(prediction))
    return predicted_class, confidence
