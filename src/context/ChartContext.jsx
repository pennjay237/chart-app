"use client"
import { createContext, useReducer, useContext } from "react"

const ChatContext = createContext()

const initialState = {
  messages: [],
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] }
    case "RESET":
      return initialState
    default:
      return state
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}
