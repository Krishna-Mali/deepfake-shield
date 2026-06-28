import os
import cv2
import numpy as np
import tensorflow as tf

# Constants

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "deepfake_model.keras")
IMG_SIZE = 224

# Load AI Model

print("Loading AI Model...")

model = tf.keras.models.load_model(MODEL_PATH)

print("Model Loaded Successfully!")

# Prediction Function

def predict_image(image_path):
    """
    Predict whether an image is Real or Fake.

    Args:
        image_path (str): Path of uploaded image.

    Returns:
        dict: Prediction result with confidence score.
    """

    # Read image
    img = cv2.imread(image_path)

    if img is None:
        raise ValueError(f"Could not read image: {image_path}")

    # Convert BGR → RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Resize
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))

    # Normalize
    img = img.astype(np.float32) / 255.0

    # Expand dimensions
    img = np.expand_dims(img, axis=0)

    # Model prediction
    prediction = model.predict(img, verbose=0)[0][0]

    print(f"Raw Prediction: {prediction:.4f}")

    # Classification
    if prediction >= 0.5:
        label = "Real"
        confidence = prediction * 100
    else:
        label = "Fake"
        confidence = (1 - prediction) * 100

    return {
        "prediction": label,
        "confidence": round(float(confidence), 2),
        "trust_score": round(float(confidence), 2),
        "score": round(float(confidence), 2),
        "raw_prediction": round(float(prediction), 4)
    }