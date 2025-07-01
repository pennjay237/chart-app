// src/components/Chat/Chat.jsx
import React, { useState } from "react"
import styles from "./Chat.module.css"
import MessageList from "../MessageList/MssageList"
import MessageInput from "../MessageInPut/MessageInput"
import FileUploader from "../FileUpLoad/FileUpLoad"
import VoiceInput from "../VoiceInput/VoiceInput"
import { useChat } from "../../hooks/useChat"
import { uploadAudioFile, transcribeAudio, getTranscriptionResult } from "../../utils/transcribeAudio"

function Chat() {
  const { state, sendMessage, clearConversation, error } = useChat()
  const [uploading, setUploading] = useState(false)

  async function handleFileUpload(file) {
    setUploading(true)
    try {
      const uploadUrl = await uploadAudioFile(file)
      const transcriptId = await transcribeAudio(uploadUrl)
      const transcriptText = await getTranscriptionResult(transcriptId)
      await sendMessage(transcriptText)
    } catch (e) {
      console.error(e)
    } finally {
      setUploading(false)
    }
  }

  async function handleVoiceTranscription(text) {
    if (text.trim()) {
      await sendMessage(text)
    }
  }

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <h2>Gen AI Chatbot</h2>
        <button onClick={clearConversation} disabled={state.isLoading}>
          New Conversation
        </button>
      </div>
      <MessageList messages={state.messages} />
      <VoiceInput onTranscribe={handleVoiceTranscription} />
      <MessageInput onSend={sendMessage} loading={state.isLoading} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}

export default Chat
