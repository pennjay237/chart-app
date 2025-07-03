import React, { useState } from "react";
import styles from "./MainChat.module.css";
import { useChat } from "../../hooks/useChat";
import {
  uploadAudioFile,
  transcribeAudio,
  getTranscriptionResult,
} from "../../utils/transcribeAudio";

function MessageList({ messages, loading }) {
  return (
    <div className={styles.messageList}>
      {messages.map(({ id, sender, text }) => (
        <div
          key={id}
          className={`${styles.message} ${sender === "user" ? styles.user : styles.bot}`}
        >
          {text}
        </div>
      ))}
      {loading && <div className={styles.loading}>Loading...</div>}
    </div>
  );
}

function MessageInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.messageInput}>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
        className={styles.input}
      />
      <button type="submit" disabled={loading || !message.trim()} className={styles.button}>
        Send
      </button>
    </form>
  );
}

function FileUploader({ onFileUpload, uploading }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  return (
    <div className={styles.uploader}>
      <input type="file" accept="audio/*" onChange={handleChange} disabled={uploading} />
    </div>
  );
}

function VoiceInput({ onSend, loading }) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        onSend(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      alert("Please allow microphone access.");
    }
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  }

  return (
    <div className={styles.voiceInput}>
      {recording ? (
        <button onClick={stopRecording} disabled={loading}>Stop Recording</button>
      ) : (
        <button onClick={startRecording} disabled={loading}>Start Recording</button>
      )}
    </div>
  );
}

function MainChat() {
  const { state, sendMessage, clearConversation, error } = useChat();
  const isLoading = state.isLoading;

  const handleFileUpload = async (file) => {
    try {
      const uploadUrl = await uploadAudioFile(file);
      const transcriptId = await transcribeAudio(uploadUrl);
      const transcriptText = await getTranscriptionResult(transcriptId);
      await sendMessage(transcriptText);
    } catch (err) {
      console.error("Audio file error:", err);
    }
  };

  const handleVoiceTranscription = async (audioBlob) => {
    const audioFile = new File([audioBlob], "recording.webm", { type: "audio/webm" });
    await handleFileUpload(audioFile);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <h2>Gen AI Chatbot</h2>
        <button onClick={clearConversation} disabled={isLoading}>
          New Conversation
        </button>
      </div>

      <MessageList messages={state.messages} loading={isLoading} />
      <VoiceInput onSend={handleVoiceTranscription} loading={isLoading} />
      <FileUploader onFileUpload={handleFileUpload} uploading={isLoading} />
      <MessageInput onSend={sendMessage} loading={isLoading} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default MainChat;
