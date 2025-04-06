import os
import numpy as np
import gdown
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from app.utils.image_utils import preprocess_image  # Assuming this function is correctly defined

# Path to the model file
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'garbage_classifier_model.h5')
GDRIVE_FILE_ID = '1luQ_12BeWknMlvWPRCk7RbK4i9qNBGHC'

# Download model from Google Drive if not found
def download_model():
    url = f'https://drive.google.com/uc?id={GDRIVE_FILE_ID}'
    print("Model file not found. Downloading from Google Drive...")
    gdown.download(url, MODEL_PATH, quiet=False)

# Ensure the model file is present
if not os.path.exists(MODEL_PATH):
    download_model()

# Load the model
model = load_model(MODEL_PATH)

# Class names corresponding to your training labels
class_names = [
    'battery', 'biological', 'cardboard', 'clothes', 'glass',
    'metal', 'paper', 'plastic', 'shoes', 'trash'
]

def predict_image(img_path):
    # Preprocess the image
    img_array = preprocess_image(img_path)
    
    # Make prediction
    prediction = model.predict(img_array)
    
    # Get predicted class and confidence
    predicted_class = class_names[np.argmax(prediction)]
    confidence = np.max(prediction)
    
    return predicted_class, confidence
