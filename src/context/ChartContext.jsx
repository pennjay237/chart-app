// src/context/ChatContext.jsx
import React, { createContext, useReducer, useContext } from "react"

const ChatContext = createContext()

const initialState = {
  messages: [],
  conversationId: null,
  isLoading: false,
}

function chatReducer(state, action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case "CLEAR_CONVERSATION":
      return {
        ...state,
        messages: [],
        conversationId: null,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "SET_CONVERSATION_ID":
      return {
        ...state,
        conversationId: action.payload,
      }
    default:
      return state
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  return useContext(ChatContext)
}
