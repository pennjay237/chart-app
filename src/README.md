# 🧠 DeepSeek AI Chatbot (React)

This project is a conversational Gen AI chatbot built with React using [DeepSeek](https://deepseek.com) APIs for chat completions and [AssemblyAI](https://www.assemblyai.com/dashboard) for voice-to-text transcription. It includes features like voice input, file uploads, and conversation history — all styled with `file.module.css`.

---

## 🚀 Features

- 🗨️ Chat interface with DeepSeek's AI model
- 🧠 Context-aware conversation history
- 🗃️ File upload (can be extended to parse & process content)
- 🎙️ Voice input with live transcription (AssemblyAI)
- 🔄 Start new conversation
- ⚡ Modern React patterns (e.g., `use()` hook)

---

## 📁 Folder Structure

```
src/
├── App.jsx
├── App.module.css
├── components/
│   ├── Chat/
│   ├── MessageList/
│   ├── MessageInput/
│   ├── FileUpload/
│   ├── VoiceInput/
├── hooks/
│   └── useChat.js
├── utils/
│   ├── deepseekClient.js
│   ├── transcribeAudio.js
```

---

## 📦 Installation

```bash
npm install
```

Then install required dependencies:

```bash
npm install axios react-icons mic-recorder-to-mp3
```

---

## 🔑 API Keys

### 1. DeepSeek

- Go to [https://api-docs.deepseek.com/](https://api-docs.deepseek.com/)
- Create an account and generate an API Key.
- Replace the placeholder inside `utils/deepseekClient.js`:

```js
const API_KEY = "your_deepseek_api_key"
```

---

### 2. AssemblyAI

- Sign up at [https://www.assemblyai.com](https://www.assemblyai.com)
- Copy your API Key from your dashboard.
- Replace in `utils/transcribeAudio.js`:

```js
authorization: "your_assemblyai_api_key"
```

---

## 🧪 Running Locally

```bash
npm run dev
```

Then open your browser at:

```
http://localhost:5173
```

---

## 📌 TODOs

- [ ] Add persistent session storage (e.g., localStorage or IndexedDB)
- [ ] Enhance file upload to read file content
- [ ] Use streaming with DeepSeek responses
- [ ] Add typing indicators and message timestamps

---

## 🛡️ License

MIT — free to use and modify.

---

## 🤝 Credits

- [DeepSeek](https://deepseek.com) for AI models
- [AssemblyAI](https://www.assemblyai.com) for voice transcription
- Built with ❤️ using [React](https://reactjs.org/)
