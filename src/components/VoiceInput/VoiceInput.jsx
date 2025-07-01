import React, { useState } from "react";

function VoiceInput({ onSend }) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        onSend(audioBlob); // Send audio blob to server/transcription
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error("🎙️ Microphone access denied or error:", err);
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
    <div>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </div>
  );
}

export default VoiceInput;
