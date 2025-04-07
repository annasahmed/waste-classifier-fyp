# app/model/load_model.py

import requests
from tensorflow.keras.models import load_model
import os

# Path where the model will be saved
MODEL_PATH = 'garbage_classifier_model.h5'
def download_model_from_google_drive():
    # file_id = '1luQ_12BeWknMlvWPRCk7RbK4i9qNBGHC' # model1  # Replace with your actual FILE_ID
    file_id = '16c3QBVjcQbHkIBFXyJhTx5lcenzIrYJO'  # Replace with your actual FILE_ID
    download_url = f"https://drive.google.com/uc?export=download&id={file_id}"

    # Send GET request to download the file
    response = requests.get(download_url)
    
    # Check if the request was successful
    if response.status_code == 200:
        with open(MODEL_PATH, 'wb') as f:
            f.write(response.content)
        print(f"Model downloaded successfully to {MODEL_PATH}")
    else:
        print(f"Failed to download model. Status code: {response.status_code}")

def load_trained_model():
    # Check if the model is already downloaded
    if not os.path.exists(MODEL_PATH):
        download_model_from_google_drive()
    
    # Load the model into memory
    model = load_model(MODEL_PATH)
    return model
