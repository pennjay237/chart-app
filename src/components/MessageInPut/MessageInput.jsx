// src/components/Chat/MessageInput/MessageInput.jsx
import React, { useState } from "react"
import styles from "./MessageInput.module.css"

function MessageInput({ onSend, loading }) {
  const [message, setMessage] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (message.trim()) {
      onSend(message.trim())
      setMessage("")
    }
  }

  return (
    <form className={styles.messageInput} onSubmit={handleSubmit}>
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
  )
}

export default MessageInput
