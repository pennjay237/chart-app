import { useState } from "react"
import styles from "./App.module.css"
import Chat from "./components/Chat/Chat"

function App() {
  return (
    <div className={styles.app}>
      <Chat />
    </div>
  )
}

export default App
