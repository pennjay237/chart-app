import React from "react"
import "./App.css"
import MainChat from "./components/MainChat/MainChat"
import { ChatProvider } from "./context/ChartContext"

function App() {
  return (
    <ChatProvider>
      <div className="app">
        <MainChat />
      </div>
    </ChatProvider>
  )
}

export default App












