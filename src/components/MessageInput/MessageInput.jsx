import { useState } from "react"
import styles from "./MessageInput.module.css"

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onSend(text)
      setText("")
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message..." />
      <button type="submit">Send</button>
    </form>
  )
}
