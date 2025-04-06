import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPrediction(null); // Reset old prediction
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image.");

    const formData = new FormData();
    formData.append('file', image);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(res.data);
    } catch (err) {
      console.error(err);
      alert('Prediction failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Garbage Classifier</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && <img src={previewUrl} alt="Preview" className="preview" />}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {prediction && (
        <div className="result">
          <h2>Prediction Result:</h2>
          <p><strong>Class:</strong> {prediction.class}</p>
          <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
