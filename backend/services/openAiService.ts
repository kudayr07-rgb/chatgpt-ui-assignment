// import OpenAI from 'openai';

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// if (!process.env.OPENAI_API_KEY) {
//   console.warn("⚠️ OpenAI API key not configured. Using mock responses.");
//   throw new Error("OPENAI_KEY_MISSING");
// }

// export async function streamCompletion(messages: any[], preferences: any) {

//   return client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages,
//     stream: true
//   });

// }


import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function streamCompletion(messages: any[], preferences: any) {

  const systemPrompt = `
You are a helpful AI assistant.

User preferences:
Response style: ${preferences?.responseStyle || "detailed"}
Preferred programming language: ${preferences?.codeLanguage || "javascript"}
User name: ${preferences?.userName || "User"}
`;

  const enhancedMessages = [
    { role: "system", content: systemPrompt },
    ...messages
  ];

  return client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: enhancedMessages,
    temperature: preferences?.temperature ?? 0.7,
    max_tokens: preferences?.maxTokens ?? 2000,
    stream: true
  });
}