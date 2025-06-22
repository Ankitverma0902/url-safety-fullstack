# 🔐 URL Safety Checker

A modern full-stack web application to check the safety of URLs in real-time using the [VirusTotal API](https://www.virustotal.com/). Built with **React (frontend)** and **Flask (backend)**, this project detects malicious URLs and visualizes scan results from 90+ security vendors.

---

## 🧩 Features

- ✅ Real-time URL scanning
- 🌐 VirusTotal integration (live analysis)
- 🧪 Harmless, suspicious, and malicious counts
- 🛡️ Engine-wise scan breakdown (97+ engines)
- 🎨 Dark mode UI with Tailwind CSS
- 📱 Mobile-friendly, responsive layout
- ⚡ React + Flask API setup
- 🚀 GitHub Pages + Render deployment ready
---

## ⚙️ Setup Instructions

### 🔙 Backend Setup (Python Flask)

1. Move into backend folder: 
   cd backend
  
2. Create virtual environment and activate:
  
   python -m venv .venv
   .venv\Scripts\activate
   
3. Install dependencies:
   pip install -r requirements.txt
   
4. Create **.env** file and add your VirusTotal API key:
   VIRUSTOTAL_API_KEY=your_actual_key
   
5. Start server:
   python app.py
   
---

### 🔜 Frontend Setup (React + Tailwind)

1. Move to frontend folder:
   cd  ../frontend
   
2. Install dependencies:
   npm install
   
3. Start frontend:
   npm start
   

---

## 🧪 Test URLs (For Checking)

Use these safe test cases to verify:

- http://testsafebrowsing.appspot.com/
- http://malware.testing.google.test/testing/malware/

---

## 📡 API Endpoint

- **POST** `/check`
  - Payload: \`{ "url": "https://example.com" }\`
  - Returns: malicious/safe status, stats, and engine results

---

## 🛠️ Built With

- ⚛️ React.js
- 💅 Tailwind CSS
- 🐍 Python Flask
- 🔒 VirusTotal API
- 📦 Node.js
- 🧪 PostCSS
- 🌐 Render, GitHub Pages

---

## 👤 Author

**Ankit Verma**  
GitHub: [@Ankitverma0902](https://github.com/Ankitverma0902)

