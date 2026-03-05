import { Box, IconButton, Button, List, ListItem, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useState } from "react";
import { useChat } from "../../../context/ChatContext";

export default function Sidebar() {
  const { conversations, newChat, setActiveConversationId, activeConversationId } = useChat();

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Box
      component="nav"
      aria-label="Chat conversations"
      sx={{
        width: collapsed ? 70 : 260,
        transition: "width 0.3s",
        height: "100vh",
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >

      <Box sx={{ p:1 }}>
        <IconButton
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed(prev => !prev)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Box sx={{ p:1 }}>
        <Tooltip title="New Chat">
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={newChat}
            aria-label="Start a new chat"
            sx={{
              justifyContent: collapsed ? "center" : "flex-start"
            }}
          >
            {!collapsed && "New Chat"}
          </Button>
        </Tooltip>
      </Box>

      <List
        aria-label="Conversation history"
        sx={{
          flex:1,
          overflowY:"auto"
        }}
      >
        {conversations.map(conv => (
          <ListItem key={conv.id} disablePadding>

            <Tooltip title={conv.title || "New Chat"} placement="right">
              <ListItemButton
                role="button"
                aria-label={`Open conversation ${conv.title || "New Chat"}`}
                selected={conv.id === activeConversationId}
                onClick={() => setActiveConversationId(conv.id)}
              >

                <ChatBubbleOutlineIcon />

                {!collapsed && (
                  <ListItemText
                    primary={conv.title || "New Chat"}
                    sx={{ ml:1 }}
                  />
                )}

              </ListItemButton>
            </Tooltip>

          </ListItem>
        ))}
      </List>

    </Box>
  );
}