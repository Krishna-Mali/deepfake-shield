from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil

from detector import predict_image

# ===============================
# Constants
# ===============================

API_TITLE = "DeepFake Shield API"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"]

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ===============================
# FastAPI App
# ===============================

app = FastAPI(title=API_TITLE)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# Home Route
# ===============================

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "DeepFake Shield API is running."
    }

# ===============================
# Image Analysis API
# ===============================

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    file_path = None

    try:

        # Check filename
        if not file.filename:
            return {
                "error": "No file selected."
            }

        # Check file extension
        file_ext = os.path.splitext(file.filename)[1].lower()

        if file_ext not in ALLOWED_EXTENSIONS:
            return {
                "error": "Only JPG, JPEG and PNG files are allowed."
            }

        # Save uploaded image
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Predict image
        result = predict_image(file_path)

        return {
            "filename": file.filename,
            **result
        }

    except Exception:
        return {
            "error": "Internal Server Error"
        }

    finally:
        # Delete uploaded image after processing
        if file_path and os.path.exists(file_path):
            os.remove(file_path)