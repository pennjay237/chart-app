import { useState } from "react"
import { deepseekRequest } from "../utils/deepseekClient"

export function useChat() {
  const [messages, setMessages] = useState([])

  const sendMessage = async (text) => {
    const newMessages = [...messages, { role: "user", content: text }]
    setMessages(newMessages)

    const response = await deepseekRequest(newMessages)
    setMessages([...newMessages, { role: "assistant", content: response }])
  }

  const startNewConversation = () => setMessages([])

  const addFile = (file) => {
    // optionally implement file reading and embedding handling
    console.log("File uploaded", file)
  }

  const transcribeAndSend = async (blob) => {
    const text = await import("../utils/transcribeAudio").then(mod => mod.transcribeAudio(blob))
    sendMessage(text)
  }

  return { messages, sendMessage, startNewConversation, addFile, transcribeAndSend }
}
