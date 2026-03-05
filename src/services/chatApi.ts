export async function fetchChatResponse(
  messages: any[],
  preferences: any,
  signal: AbortSignal,
) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

  if (!API_BASE) {
    throw new Error("VITE_API_BASE_URL is not defined");
  }

  const response = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages, preferences }),
    signal,
  });
  if (!response.ok) {
    const errorText = await response.text();
    // throw new Error('Network response was not ok');
    throw new Error(`Server error ${response.status}: ${errorText}`);
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  return response.body;
}
