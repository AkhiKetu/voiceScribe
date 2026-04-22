# 🎙️ VoiceScribe AI

VoiceScribe AI is a browser-based speech-to-text web application that converts **audio and video into readable text**. It supports **file transcription, recording-based transcription, and live speech recognition** through a clean web interface.

---

## ✨ Features

- Upload **audio or video files**
- Record audio directly inside the app
- Live speech-to-text mode
- Select **language** and **model**
- Play uploaded or recorded media
- View transcript in **segmented format**
- Click transcript segments to jump in the media
- Copy transcript
- Download transcript as `.txt`
- Save transcript **history** in the browser

---

## 🛠️ Tech Stack

- **HTML, CSS, TypeScript / JavaScript**
- **Vite**
- **browser-whisper**
- **Whisper-based models**
- **WebGPU / WebAssembly**
- **Web Speech API** for live speech mode

---

## 📋 Requirements

Before running the project, make sure you have:

- **Node.js** installed
- **npm** installed
- A modern browser such as:
  - Google Chrome
  - Microsoft Edge

For best results, use a browser that supports:
- microphone access
- WebGPU / WebAssembly
- Web Speech API

---
## ⚙️ Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/transcribe-ai.git
cd transcribe-ai
npm install
npm run dev
```

