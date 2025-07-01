// src/components/Chat/MessageList/MessageList.jsx
import React from "react"
import styles from "./MessageList.module.css"

function MessageList({ messages }) {
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
    </div>
  )
}

export default MessageList
