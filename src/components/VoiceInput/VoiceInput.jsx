// src/components/Chat/VoiceInput/VoiceInput.jsx
import React, { useState, useEffect } from "react"
import styles from "./VoiceInput.module.css"

function VoiceInput({ onTranscribe }) {
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [chunks, setChunks] = useState([])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream)
      recorder.ondataavailable = (e) => setChunks((prev) => [...prev, e.data])
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" })
        const file = new File([blob], "recording.webm")
        setChunks([])
        onTranscribe && onTranscribe(file)
      }
      setMediaRecorder(recorder)
    })
  }, [])

  const toggleRecording = () => {
    if (isRecording) {
      mediaRecorder?.stop()
    } else {
      setChunks([])
      mediaRecorder?.start()
    }
    setIsRecording(!isRecording)
  }

  return (
    <div className={styles.voiceInput}>
      <button onClick={toggleRecording}>
        {isRecording ? "Stop" : "Record Voice"}
      </button>
    </div>
  )
}

export default VoiceInput
