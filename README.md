# DeepFake Shield

An AI-powered DeepFake Image Detection System built using **FastAPI**, **TensorFlow**, **MobileNetV2**, **HTML**, **CSS**, and **JavaScript**.

The application detects whether an uploaded face image is **Real** or **Fake** and provides a confidence score along with a downloadable PDF report.

---

##  Features

- AI-powered DeepFake image detection
- MobileNetV2 based Deep Learning model
- FastAPI backend
- Modern responsive frontend
- Drag & Drop image upload
- Image preview before analysis
- Confidence score with progress bar
- Detection history using Local Storage
- PDF report generation
- Secure file validation
- Clean and responsive UI

---

##  Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- FastAPI
- Python

### AI / Machine Learning

- TensorFlow
- Keras
- MobileNetV2
- OpenCV
- NumPy

---

##  Project Structure

```text
deepfake-shield/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── backend/
│   ├── main.py
│   ├── detector.py
│   ├── model.py
│   ├── train.py
│   ├── requirements.txt
│   ├── uploads/
│   └── models/
│       └── deepfake_model.keras
│
├── .gitignore
└── README.md
```

---

##  Installation

### 1. Clone Repository

```bash
git clone https://github.com/Krishna-Mali/deepfake-shield.git
```

---

### 2. Open Project

```bash
cd deepfake-shield
```

---

### 3. Install Backend Dependencies

```bash
cd backend

pip install -r requirements.txt
```

---

### 4. Start FastAPI Server

```bash
uvicorn main:app --reload
```

Server will start at

```
http://127.0.0.1:8000
```

---

### 5. Open Frontend

Open

```
frontend/index.html
```

in your browser.

---

## Supported Image Formats

- JPG
- JPEG
- PNG

---

## Model Information

- Architecture : MobileNetV2
- Image Size : 224 × 224
- Output : Real / Fake
- Confidence Score : Percentage

---

##  API Endpoint

### Analyze Image

```
POST /analyze-image
```

Returns

```json
{
  "prediction": "Real",
  "confidence": 98.43,
  "trust_score": 98.43
}
```

---

## Report

The application can generate a downloadable PDF report containing

- File Name
- Prediction
- Confidence
- Detection Status
- AI Analysis

---

## Note

- This project is developed for educational purposes.
- The trained AI model (`deepfake_model.keras`) is included in the repository.
- The training dataset is **not included** in this repository because of its large size. Add your own dataset in `backend/models/rvf10k/` before retraining the model.


## Developed By

Krishna Mali

---

## License

This project is developed for educational purposes.