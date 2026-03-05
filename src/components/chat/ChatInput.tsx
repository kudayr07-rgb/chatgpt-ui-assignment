import { useState, useContext } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../../context/ChatContext";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StopIcon from "@mui/icons-material/Stop";

export default function ChatInput() {
  const { sendMessage, isTyping, stopGenerating } = useChat();
  const [text, setText] = useState("");

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleSend = () => {
    if (text.trim() === "") return;

    sendMessage(text);
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const disabled = false;

  return (
    <Box
      className="chat-input-wrapper"
      role="region"
      aria-label="Chat message input area"
      sx={{
        borderTop: "1px solid",
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        backgroundColor: theme.palette.background.default,
        p: 3,
      }}
      role="region"
      aria-label="Message input"
    >
      <Box
        className="chat-input-container"
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Paper
          className="chat-input-paper"
          role="form"
          aria-label="Send message form"
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "#d1d5db",
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
            "&:focus-within": {
              borderColor: "#10a37f",
              boxShadow: "0 0 0 1px #10a37f",
            },
          }}
        >
          <TextField
            className="chat-input-textfield"
            fullWidth
            multiline
            maxRows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a message..."
            disabled={disabled}
            variant="standard"
            aria-label="Chat message input"
            InputProps={{
              disableUnderline: true,
              className: "chat-input-textfield-props",
              sx: {
                px: 2,
                py: 1.5,
                fontSize: "16px",
                fontFamily: "inherit",
                color: theme.palette.text.primary,
              },
              endAdornment: isTyping ? (
                <IconButton
                  onClick={stopGenerating}
                  aria-label="Stop generating"
                  sx={{
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    width: 36,
                    height: 36,
                    "&:hover": {
                      backgroundColor: "#dc2626",
                    },
                  }}
                >
                  <StopIcon sx={{ fontSize: 18 }} />
                </IconButton>
              ) : (
                <IconButton
                  className="chat-input-send-btn"
                  onClick={handleSend}
                  disabled={!text.trim()}
                  aria-label="Send message"
                  sx={{
                    backgroundColor: text.trim()
                      ? "#10a37f"
                      : isDark
                        ? "#2f2f2f"
                        : "#f4f4f4",
                    color: text.trim() ? "#ffffff" : "#999999",
                    width: 36,
                    height: 36,
                  }}
                >
                  <SendIcon sx={{ fontSize: 18 }} />
                </IconButton>
              ),
            }}
          />
        </Paper>

        <Typography
          className="chat-input-disclaimer"
          variant="caption"
          role="note"
          aria-live="polite"
          sx={{
            display: "block",
            textAlign: "center",
            color: theme.palette.text.secondary,
            mt: 2,
            fontSize: "12px",
          }}
          role="note"
        >
          ChatGPT can make mistakes. Check important info.
        </Typography>
      </Box>
    </Box>
  );
}
