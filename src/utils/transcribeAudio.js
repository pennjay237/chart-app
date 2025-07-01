// src/utils/transcribeAudio.js
const ASSEMBLYAI_API_KEY = import.meta.env.VITE_ASSEMBLYAI_API_KEY
const ASSEMBLYAI_UPLOAD_URL = "https://api.assemblyai.com/v2/upload"
const ASSEMBLYAI_TRANSCRIPT_URL = "https://api.assemblyai.com/v2/transcript"

export async function uploadAudioFile(file) {
  const response = await fetch(ASSEMBLYAI_UPLOAD_URL, {
    method: "POST",
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "Transfer-Encoding": "chunked",
    },
    body: file,
  })

  if (!response.ok) throw new Error("Audio upload failed")

  const data = await response.json()
  return data.upload_url
}

export async function transcribeAudio(uploadUrl) {
  const response = await fetch(ASSEMBLYAI_TRANSCRIPT_URL, {
    method: "POST",
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      audio_url: uploadUrl,
    }),
  })

  if (!response.ok) throw new Error("Transcription request failed")

  const data = await response.json()
  return data.id
}

export async function getTranscriptionResult(transcriptId) {
  while (true) {
    const response = await fetch(`${ASSEMBLYAI_TRANSCRIPT_URL}/${transcriptId}`, {
      headers: { authorization: ASSEMBLYAI_API_KEY },
    })

    const data = await response.json()

    if (data.status === "completed") return data.text
    if (data.status === "error") throw new Error(data.error)

    // Wait 1 second before retrying
    await new Promise((r) => setTimeout(r, 1000))
  }
}
