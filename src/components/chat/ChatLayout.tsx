import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import Sidebar from "./sidebar/Sidebar";
import  UserPreferencesDialog  from "../UserPreferenceDialog";
import { SuggestionChips } from "../SuggestionChips";
import { useChat } from "../../context/ChatContext";

type Props = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};


export default function ChatLayout({ mode, toggleTheme }: Props) {
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: "1",
  //     role: "assistant",
  //     content: "Hello! I'm an AI assistant powered by ChatGPT. How can I help you today?"
  //   }
  // ]);

  const { messages: chatMessages, sendMessage } = useChat();
  const [dialogOpen, setDialogOpen] = useState(false);
  const showSuggestions = chatMessages.length <= 1;

  const handleSendMessage = (text: string) => {
      sendMessage(text);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  }

  return (
    <Box sx={{ display:"flex", height:"100vh" }}
      role="application"
      aria-label="ChatGPT Application"
    >
      <Sidebar />
    <Box
      component="main"
      aria-label="Chat conversation area"
      sx={{
        flex:1,
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <AppBar 
          position="static" 
          elevation={0} 
          role="banner"
          aria-label="Application header"
        >
        <Toolbar>

          <Typography 
              className="chat-appbar-title"
              variant="h6" 
              component="div"
              sx={{ 
                flexGrow: 1,
                color: mode === "dark" ? '#ffffff' : '#111827',
                fontWeight: 600
              }}
            >
              ChatGPT
          </Typography>
          <IconButton 
            onClick={toggleTheme}
            aria-label={mode === "light" ? "Enable dark mode" : "Enable light mode"}
            title="Toggle theme"
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <IconButton 
            onClick={() => setDialogOpen(true)} 
            color="inherit" 
            aria-label="User Preferences"
            title="User preferences"
          >
            <SettingsIcon aria-hidden="true" />
          </IconButton>

        </Toolbar>
      </AppBar>
      
      {/* <MessageList messages={messages} /> */}

      <Box
          role="region"
          aria-label="Chat messages"
          sx={{
            flex: 1,
            display: "flex",
            minHeight: 0
          }}
        >
          <MessageList />
      </Box>

      {showSuggestions && (
              <Box 
                className="chat-suggestions-wrapper" 
                role="region"
                aria-label="Suggested prompts"
              >
              <SuggestionChips suggestions={[
                  "Explain with an example",
                  "Show related code",
                  "Summarize this",
                  "Give real world use cases"
                ]} onSuggestionClick={handleSuggestionClick} />
            </Box>
      )}
      <ChatInput />
      
      
      <UserPreferencesDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
    </Box>
  );
}