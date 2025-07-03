import React, { useState } from "react";
import styles from "./MainChat.module.css";
import { FaMicrophone, FaStop, FaPaperPlane, FaPaperclip } from "react-icons/fa";
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

function MessageInput({ onSend, loading, onVoiceInput, onFileUpload }) {
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        onVoiceInput(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.messageInputWrapper}>
      <div className={styles.fileUploadWrapper}>
        <label className={styles.fileLabel}>
          <FaPaperclip />
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            disabled={loading}
            className={styles.fileInput}
          />
        </label>
      </div>

      <div className={styles.messageInput}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          className={styles.input}
        />
        {message.trim() ? (
          <button type="submit" disabled={loading} className={styles.button}>
            <FaPaperPlane />
          </button>
        ) : recording ? (
          <button type="button" onClick={stopRecording} disabled={loading} className={styles.button}>
            <FaStop />
          </button>
        ) : (
          <button type="button" onClick={startRecording} disabled={loading} className={styles.button}>
            <FaMicrophone />
          </button>
        )}
      </div>
    </form>
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
      <MessageInput
        onSend={sendMessage}
        loading={isLoading}
        onVoiceInput={handleVoiceTranscription}
        onFileUpload={handleFileUpload}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default MainChat;
