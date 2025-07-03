const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

if (!OPENROUTER_API_KEY) {
  console.warn("OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in your .env file.");
} else {
  console.log("OpenRouter API key detected.");
}

/**
 * Send message to DeepSeek model via OpenRouter API
 * @param {string} message
 * @param {string|null} conversationId
 * @returns {Object}
 */
export async function sendMessageToDeepSeek(message, conversationId = null) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in your .env file.");
  }

  const body = {
    model: "deepseek/deepseek-r1-0528:free", 
    messages: [{ role: "user", content: message }],
    ...(conversationId && { conversation_id: conversationId }),
  };

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(
        errorBody.error?.message || `OpenRouter API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      answer: data.choices?.[0]?.message?.content ?? "No response",
      conversationId: data.conversation_id ?? conversationId,
    };
  } catch (error) {
    console.error("Failed to fetch from OpenRouter API:", error);
    throw error;
  }
}
