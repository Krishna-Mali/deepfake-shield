
// DeepFake Shield - app.js
// Frontend ↔ FastAPI Connection

const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const loading = document.getElementById("loading");
const previewImage = document.getElementById("previewImage");
const historyList = document.getElementById("historyList");
const prediction = document.getElementById("prediction");
const confidence = document.getElementById("confidence");
const progressBar = document.getElementById("progressBar");
const statusBadge = document.getElementById("statusBadge");
const analysisList = document.getElementById("analysisList");
const dropArea = document.getElementById("dropArea");
const fileName = document.getElementById("fileName");
const statusText = document.getElementById("statusText");


// Image Preview

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) return;

    fileName.innerText = file.name;

    previewImage.src = URL.createObjectURL(file);
    previewImage.style.display = "block";
    previewImage.onload = () => {
        URL.revokeObjectURL(previewImage.src);
    };

});

// Upload & Analyze

uploadBtn.addEventListener("click", async () => {


    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image.");
        return;
    }
    loading.style.display = "block";
    uploadBtn.disabled = true;
    uploadBtn.innerText = "Analyzing...";

    prediction.innerText = "Analyzing...";
    confidence.innerText = "0%";
    progressBar.style.width = "0%";

    statusBadge.innerText = "Processing";
    statusBadge.className = "status neutral";
    statusText.innerText = "AI Model Is Analyzing The Image...";

    analysisList.innerHTML =
        "<li>Running AI Model...</li>";

    const formData = new FormData();
    formData.append("file", file);

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/analyze-image",
            {
                method: "POST",
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("Server Error");
        }
        const data = await response.json();


        prediction.innerText = data.prediction;

        confidence.innerText =
            data.confidence + "%";

        progressBar.style.width =
            data.confidence + "%";

        saveHistory(
            prediction.innerText,
            confidence.innerText
        );

        if (data.prediction === "Real") {

            statusBadge.innerText = "SAFE";
            statusBadge.className = "status real";
            statusText.innerText = "Image verified successfully";

            analysisList.innerHTML = `
                <li>Face appears authentic.</li>
                <li>No major manipulation detected.</li>
                <li>Confidence is high.</li>
                <li>Image passed AI verification.</li>
            `;

        } else {

            statusBadge.innerText = "DEEPFAKE";
            statusBadge.className = "status fake";
            statusText.innerText = "Possible manipulation detected.";

            analysisList.innerHTML = `
                <li>Possible AI generated face.</li>
                <li>Facial inconsistencies detected.</li>
                <li>Manipulation probability is high.</li>
                <li>Manual verification recommended.</li>
            `;

        }
        loading.style.display = "none";
        uploadBtn.disabled = false;
        uploadBtn.innerText = "Analyze Image";
    } catch (err) {

        prediction.innerText = "Error";

        statusBadge.innerText = "FAILED";
        statusBadge.className = "status fake";
        statusText.innerText = "Analysis failed.";

        analysisList.innerHTML = `
<li>Unable to analyze image.</li>
<li>Please try again.</li>
`;
        loading.style.display = "none";
        uploadBtn.disabled = false;
        uploadBtn.innerText = "Analyze Image";

    }


});
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    document.getElementById("detect").scrollIntoView({
        behavior: "smooth"
    });
});
const learnBtn = document.getElementById("learnBtn");

learnBtn.addEventListener("click", () => {

    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
});

// PDF REPORT DOWNLOAD

const downloadReport = document.getElementById("downloadReport");

downloadReport.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const file =
        fileInput.files[0]
            ? fileInput.files[0].name
            : "No File";

    const date =
        new Date().toLocaleString();

    doc.setFontSize(22);
    doc.text("DeepFake Shield", 20, 20);

    doc.setFontSize(16);
    doc.text("AI Detection Report", 20, 35);

    doc.setFontSize(12);

    doc.text("Date : " + date, 20, 55);
    doc.text("File : " + file, 20, 65);
    doc.text("Prediction : " + prediction.innerText, 20, 75);
    doc.text("Confidence : " + confidence.innerText, 20, 85);
    doc.text("Status : " + statusBadge.innerText, 20, 95);

    doc.text("AI Analysis:", 20, 115);

    let y = 125;

    document.querySelectorAll("#analysisList li").forEach(item => {

        doc.text("- " + item.innerText, 25, y);

        y += 10;

    });

    doc.save("DeepFake_Report.pdf");

});

// SCAN HISTORY

function saveHistory(predictionText, confidenceText) {

    const history = JSON.parse(localStorage.getItem("scanHistory")) || [];

    history.unshift({
        prediction: predictionText,
        confidence: confidenceText,
        date: new Date().toLocaleString()
    });

    if (history.length > 5) {
        history.pop();
    }

    localStorage.setItem("scanHistory", JSON.stringify(history));

    loadHistory();
}

function loadHistory() {

    const history = JSON.parse(localStorage.getItem("scanHistory")) || [];

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML =
            `<p class="empty-history">No scans available.</p>`;

        return;
    }

    history.forEach(item => {

        historyList.innerHTML += `
            <div class="history-card">
                <div>
                    <strong>${item.prediction}</strong><br>
                    ${item.confidence}
                </div>
                <small>${item.date}</small>
            </div>
        `;
    });

}

loadHistory();

// DRAG & DROP UPLOAD

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {

    e.preventDefault();

    dropArea.classList.remove("dragover");

    const files = e.dataTransfer.files;

    if (files.length > 0) {

        fileInput.files = files;

        previewImage.src = URL.createObjectURL(files[0]);
        previewImage.style.display = "block";
        previewImage.onload = () => {
            URL.revokeObjectURL(previewImage.src);
        };
        fileName.innerText = files[0].name;

    }

});