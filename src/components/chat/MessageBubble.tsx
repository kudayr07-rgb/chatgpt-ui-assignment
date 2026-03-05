import React from "react";
import { Box, Paper, Tooltip, Avatar, IconButton } from "@mui/material";
import { useChat } from "../../context/ChatContext";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import type { Message } from "../../context/ChatContext";      
import { AdaptiveCardRenderer } from "../cards/AdaptiveCardRenderer";
import { SuggestionChips } from "../SuggestionChips";

type Props = {
  message: Message;
};

function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const { sendMessage } = useChat();

  return (
    <Box
        role="article"
        aria-label={isUser ? "User message" : "Assistant message"}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          justifyContent: isUser ? "flex-end" : "flex-start",
          mb: 2
        }}
    >
      {!isUser && (
        <Avatar 
            sx={{ bgcolor: "#10a37f", width: 32, height: 32 }}
            aria-label="AI assistant avatar"
      >
          AI
        </Avatar>
      )}

      <Paper
        role="group"
        aria-label={isUser ? "User message content" : "Assistant message content"}
        sx={{
          padding: 2,
          maxWidth: "90%",
          backgroundColor: isUser ? "#1976d2" : "#ffffff",
          color: isUser ? "#fff" : "#000",
          borderRadius: 2,
          // transition: "none",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
        }}
      >
        {message.content && (
        <ReactMarkdown
          components={{
            p({ children }) {
                return <Box component="div">{children}</Box>;
            },
            
            code({ inline, className, children }: any) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");

              const handleCopy = () => {
                navigator.clipboard.writeText(codeString);
              };

              return !inline ? (
                <Box sx={{ position: "relative" }}>
                  <Tooltip title="Copy code">
                    <IconButton
                        aria-label="Copy code to clipboard"
                        onClick={handleCopy}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          color: "#ffffff",
                          backgroundColor: "rgba(0,0,0,0.4)"
                        }}
                      >
                      <ContentCopyIcon fontSize="small" />
                      </IconButton>
                  </Tooltip>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match ? match[1] : "javascript"}
                    customStyle={{
                      borderRadius: "8px",
                      padding: "16px",
                      fontSize: "14px",
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </Box>
              ) : (
                <code>{children}</code>
              );
            },
          }}
        >
              {message.content}
        </ReactMarkdown>
        )}
       
        {message.card && (
            <Box 
              sx={{ mt: 2 }} 
              role="region"
              aria-label="Interactive assistant card"
            >
            <AdaptiveCardRenderer cardPayload={message.card.data} />
          </Box>
        )}

          {(message.suggestions ?? []).length > 0 && (
            <SuggestionChips
              suggestions={message.suggestions ?? []}
              onSuggestionClick={(text) => sendMessage(text)}
            />
          )}

          {/* {message.suggestions?.length > 0 && (
            <Box
              role="region"
              aria-label="Suggested follow up prompts"
            >
              <SuggestionChips
                suggestions={message.suggestions}
                onSuggestionClick={(text) => sendMessage(text)}
              />
            </Box>
          )} */}
      </Paper>
    </Box>
  );
}

export default React.memo(MessageBubble);