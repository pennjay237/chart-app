import { useState } from "react"
import Recorder from "mic-recorder-to-mp3"
import { transcribeAudio } from "../../utils/transcribeAudio"
import styles from "./VoiceInput.module.css"

const recorder = new Recorder({ bitRate: 128 })

export default function VoiceInput({ onTranscribe }) {
  const [recording, setRecording] = useState(false)

  const toggleRecord = async () => {
    if (!recording) {
      setRecording(true)
      recorder.start()
    } else {
      const [buffer, blob] = await recorder.stop().getMp3()
      setRecording(false)
      onTranscribe(blob)
    }
  }

  return <button onClick={toggleRecord}>{recording ? "Stop" : "🎤"}</button>
}
