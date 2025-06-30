import axios from "axios"

export async function transcribeAudio(blob) {
  const formData = new FormData()
  formData.append("audio", blob, "audio.mp3")

  const response = await axios.post("https://api.assemblyai.com/v2/upload", blob, {
    headers: {
      authorization: "your_assemblyai_api_key", // 🔑 Replace securely
      "content-type": "application/octet-stream",
    },
  })

  const audioUrl = response.data.upload_url

  const transcript = await axios.post(
    "https://api.assemblyai.com/v2/transcript",
    { audio_url: audioUrl },
    { headers: { authorization: "your_assemblyai_api_key" } }
  )

  const { id } = transcript.data

  while (true) {
    const polling = await axios.get(`https://api.assemblyai.com/v2/transcript/${id}`, {
      headers: { authorization: "your_assemblyai_api_key" },
    })

    if (polling.data.status === "completed") return polling.data.text
    if (polling.data.status === "error") throw new Error("Transcription failed")

    await new Promise((r) => setTimeout(r, 2000))
  }
}
