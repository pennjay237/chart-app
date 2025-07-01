
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

// Log API key presence for debugging (avoid printing full key in production)
if (!DEEPSEEK_API_KEY) {
  console.warn(" DeepSeek API key is missing. Please set VITE_DEEPSEEK_API_KEY in your .env file.");
} else {
  console.log(" DeepSeek API key detected.");
}

export async function sendMessageToDeepSeek(message, conversationId = null) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error("DeepSeek API key is missing. Please set VITE_DEEPSEEK_API_KEY in your .env file.");
  }

  const body = {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }],
    ...(conversationId && { conversation_id: conversationId }),
  };

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(
        errorBody.error?.message || `DeepSeek API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      answer: data.choices?.[0]?.message?.content ?? "No response",
      conversationId: data.conversation_id ?? conversationId,
    };
  } catch (error) {
    console.error(" Failed to fetch from DeepSeek API:", error);
    throw error;
  }
}
