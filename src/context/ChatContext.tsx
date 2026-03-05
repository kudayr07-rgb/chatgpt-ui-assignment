import { useState, createContext, useContext, useRef } from "react";
import { fetchChatResponse } from "../services/chatApi";
import { adaptiveCardTemplates } from "../data/adaptiveCards";
import { usePreferences } from "./UserPreferenceContext";

export type AssistantCard = {
  type: "weather" | "product" | "poll";
  data: any;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  card?: {
    type: string;
    data: any;    
  };
  suggestions?: string[];
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

type Props = {
  messages: Message[];
  sendMessage: (text: string) => void;
  isTyping: boolean;
  newChat: () => void;
  setActiveConversationId: (id: string) => void;
  activeConversationId: string;
  conversations: Conversation[];
  stopGenerating: () => void;
};

export const ChatContext = createContext<Props | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { preferences } = usePreferences();
  const [isTyping, setIsTyping] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([
  {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [
      {
        id: "1",
        role: "assistant",
        content: `Hello! I'm an AI assistant powered by ChatGPT. How can I help you today?

💡 Try these examples to see interactive Adaptive Cards:

- Show me the weather forecast
- What tasks do I have?
- Show my next meeting
- Recommend a product
- Create a poll
- Show notifications
`
      }
    ]
  }
]);

  const [activeConversationId, setActiveConversationId] = useState(
    conversations[0].id
  );
  
  const activeConversation = conversations.find(
    c => c.id === activeConversationId
  );

  const messages = activeConversation?.messages || [];

  const updateMessages = (updater: (msgs: Message[]) => Message[]) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id !== activeConversationId) return conv;

        const updatedMessages = updater(conv.messages);

        let updatedTitle = conv.title;

        const firstUserMessage = updatedMessages.find(
            msg => msg.role === "user"
        );

        if (conv.title === "New Chat" && firstUserMessage) {
             updatedTitle = firstUserMessage.content.slice(0, 40);
        }

        return {
          ...conv,
          title: updatedTitle,
          messages: updatedMessages
        };
      })
    );
  };

  const newChat = () => {
    // const newConversation = {
    const newConversation: Conversation = {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [
      {
        id: "1",
        role: "assistant",
        content: `Hello! I'm an AI assistant powered by ChatGPT. How can I help you today?

💡 Try these examples to see interactive Adaptive Cards:

- Show me the weather forecast
- What tasks do I have?
- Show my next meeting
- Recommend a product
- Create a poll
- Show notifications
`
      }
    ]
  };

    setConversations(prev => [...prev, newConversation]);
    setActiveConversationId(newConversation.id);
  };

  const stopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsTyping(false);
  };

  const extractTopic = (text: string) => {
    const quoteMatch = text.match(/"([^"]+)"/);

    if (quoteMatch) {
      return quoteMatch[1];
    }

    return text
      .replace(/explain|summarize|provide|details|about|example|give/gi, "")
      .trim();
  };

  const sendMessage = async (text: string) => {
      console.log("sendMessage called with:", text);
      if(text.trim() === "") return;

      const newMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: text
      }

      setIsTyping(true);
      updateMessages(prev => [...prev, newMessage]);

      let fullResponse = "";

      const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: ""
      };

      updateMessages(prev => [...prev, assistantMessage]);

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
          const stream = await fetchChatResponse([...messages, newMessage], preferences, signal);

      const reader = stream!.getReader();
      const decoder = new TextDecoder("utf-8");
        while(true) {
          const { done, value } = await reader.read();
          if(done) {
              break;
          }
          const chunk = decoder.decode(value);

          fullResponse += chunk;

          updateMessages(prev =>
              prev.map(msg =>
                msg.id === assistantMessage.id
                  ? { ...msg, content: fullResponse }
                  : msg
              )
          );
        }
      
   
        const topic = extractTopic(text);

        const suggestions = [
          `Explain "${topic}" in simpler terms`,
          `Give an example related to "${topic}"`,
          `Provide more details about "${topic}"`,
          `Summarize "${topic}"`,
        ];
        
        let card = null;
        const lowerContent = text.toLowerCase();

        if (lowerContent.includes('weather') || lowerContent.includes('forecast') || lowerContent.includes('temperature')) {
            card = {
              type: "weather",
              data: adaptiveCardTemplates.weather
            };
        } else if (lowerContent.includes('task') || lowerContent.includes('todo') || lowerContent.includes('reminder')) {
            card = {
              type: "task",
              data: adaptiveCardTemplates.task
            };
        } else if (lowerContent.includes('meeting') || lowerContent.includes('schedule') || lowerContent.includes('calendar')) {
            card = {
              type: "meeting",
              data: adaptiveCardTemplates.meeting
            };
        } else if (lowerContent.includes('product') || lowerContent.includes('buy') || lowerContent.includes('shop')) {
            card = {
              type: "product",
              data: adaptiveCardTemplates.product
            };
        } else if (lowerContent.includes('poll') || lowerContent.includes('survey') || lowerContent.includes('vote')) {
            card = {
              type: "poll",
              data: adaptiveCardTemplates.poll
            }; 
        } else if (lowerContent.includes('notification') || lowerContent.includes('alert') || lowerContent.includes('reminder')) {
            card = {
              type: "notification",
              data: adaptiveCardTemplates.notification
            }; 
        }

        if (card) {
          updateMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessage.id
                ? { ...msg, card }
                : msg
            )
          );
        }

        updateMessages(prev =>
          prev.map(msg =>
              msg.id === assistantMessage.id
                ? { ...msg, suggestions }
                : msg
            )
        );
      } catch (error: any) {
        if (error.name === "AbortError") {
            console.log("Generation stopped");
        } else {
            console.error("Streaming error:", error);
        }
      } finally {
            setIsTyping(false);        
      }
    }
      
  return (
    <ChatContext.Provider value={{ messages, sendMessage, isTyping, newChat, activeConversationId, setActiveConversationId, conversations, stopGenerating }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
