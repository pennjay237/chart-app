import axios from "axios"

const API_URL = "https://api.deepseek.com/v1/chat/completions"
const API_KEY = "your_deepseek_api_key" // 🔑 Replace securely

export const deepseekRequest = async (messages) => {
  const res = await axios.post(API_URL, {
    model: "deepseek-chat", // adjust based on DeepSeek's docs
    messages,
  }, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
  })

  return res.data.choices[0].message.content
}
