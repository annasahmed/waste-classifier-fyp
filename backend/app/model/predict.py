# app/model/predict.py

from app.model.load_model import load_trained_model
import numpy as np
from tensorflow.keras.preprocessing import image

# Load the model (if not already loaded)
model = load_trained_model()

# Define the class labels (from the trained model)
LABELS = ['Metal', 'Glass', 'Biological', 'Paper', 'Battery', 'Trash', 'Cardboard', 'Shoes', 'Clothes', 'Plastic']

def predict_image(img_path):
    # Load and preprocess the image
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    
    # Make the prediction
    predictions = model.predict(img_array)
    
    # Get the predicted class and confidence
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    confidence = predictions[0][predicted_class_index]
    
    # Return the label and confidence
    predicted_class = LABELS[predicted_class_index]
    return predicted_class, confidence
