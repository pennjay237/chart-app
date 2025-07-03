// src/hooks/useChat.js
import { useChatContext } from "../context/ChartContext"
import { useState, useCallback } from "react"
import { sendMessageToDeepSeek } from "../utils/deepseekClient"

export function useChat() {
  const { state, dispatch } = useChatContext()
  const [error, setError] = useState(null)

  const sendMessage = useCallback(
    async (message) => {
      dispatch({ type: "SET_LOADING", payload: true })
      try {
        // Add user message to chat
        dispatch({
          type: "ADD_MESSAGE",
          payload: { sender: "user", text: message, id: Date.now() },
        })

        const response = await sendMessageToDeepSeek(message, state.conversationId)

        // Add bot response to chat
        dispatch({
          type: "ADD_MESSAGE",
          payload: { sender: "bot", text: response.answer, id: Date.now() + 1 },
        })

        if (!state.conversationId && response.conversationId) {
          dispatch({ type: "SET_CONVERSATION_ID", payload: response.conversationId })
        }
      } catch (e) {
        setError(e.message)
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    },
    [dispatch, state.conversationId]
  )

  const clearConversation = useCallback(() => {
    dispatch({ type: "CLEAR_CONVERSATION" })
  }, [dispatch])

  return { state, sendMessage, clearConversation, error }
}
