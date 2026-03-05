export async function fetchChatResponse(messages: any[], preferences: any, signal: AbortSignal) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, preferences }),
    signal
  });   
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.body;
}