import React from "react"
import "./App.css"
import Chat from "./components/Chart/Chat"
import { ChatProvider } from "./context/ChartContext"

function App() {
  return (
    <ChatProvider>
      <div className="app">
        <Chat />
      </div>
    </ChatProvider>
  )
}

export default App
