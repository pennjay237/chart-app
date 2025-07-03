
export const sendMessageToBot = async (messages) => {
  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("DeepSeek API key is missing");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "DeepSeekChatApp",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices?.[0]?.message ?? {
      role: "assistant",
      content: "No response",
    };
  } catch (error) {
    console.error(" Error calling bot API:", error);
    return {
      role: "assistant",
      content: ":x: Oops! Something went wrong.",
    };
  }
};
