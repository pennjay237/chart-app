import styles from "./Chat.module.css"
import MessageList from "../MessageList/MessageList"
import MessageInput from "../MessageInput/MessageInput"
import FileUpload from "../FileUpload/FileUpload"
import VoiceInput from "../VoiceInput/VoiceInput"
import { useChat } from "../../hooks/useChat"

export default function Chat() {
  const { messages, sendMessage, startNewConversation, addFile, transcribeAndSend } = useChat()

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h2>DeepSeek Chatbot</h2>
        <button onClick={startNewConversation}>🧹 New Chat</button>
      </div>
      <MessageList messages={messages} />
      <div className={styles.controls}>
        <FileUpload onUpload={addFile} />
        <VoiceInput onTranscribe={transcribeAndSend} />
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  )
}
