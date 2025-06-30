import styles from "./MessageList.module.css"

export default function MessageList({ messages }) {
  return (
    <div className={styles.list}>
      {messages.map((msg, i) => (
        <div key={i} className={`${styles.message} ${msg.role === "user" ? styles.user : styles.bot}`}>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  )
}
