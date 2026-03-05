import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import MessageBubble from "./MessageBubble";
import { useChat } from "../../context/ChatContext";

type Messages = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// type Props = {
//     messages: Messages[];
// }

export default function MessageList() {
    const { messages, isTyping } = useChat();

    const bottomRef = useRef<HTMLDivElement>(null);
    const isUserNearBottomRef = useRef(true);

    // useEffect(() => {
    //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages, isTyping]);

    // useEffect(() => {
    //     bottomRef.current?.scrollTo({
    //         top: bottomRef.current.scrollHeight,
    //         behavior: "smooth"
    //     });
    // }, [messages.length]);
    
    const handleScroll = () => {
        const el = bottomRef.current;
        if (!el) return;

        const threshold = 150;

        const isNearBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

        isUserNearBottomRef.current = isNearBottom;
    };

    useEffect(() => {
        const el = bottomRef.current;
        if (!el) return;

        if (isUserNearBottomRef.current) {
            el.scrollTo({
            top: el.scrollHeight,
            behavior: "smooth"
            });
        }
    }, [messages, isTyping]);
    
    return (
        <Box
            ref={bottomRef}
            onScroll={handleScroll}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Chat messages"
            sx={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                justifyContent: "center",
                padding: 3,
                paddingBottom: "120px",
                minHeight: 0
            }}
        >
        <Box
            sx={{
            width: "100%",
            maxWidth: "900px",
        }}
        >

            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {/* {messages.map((msg) => (
                <Box
                    key={msg.id}
                    role="article"
                    aria-label={msg.role === "user" ? "User message" : "Assistant message"}
                >
                    <MessageBubble message={msg} />
                </Box>
            ))} */}

            {isTyping && (
                <Typography 
                    sx={{ fontStyle: "italic", color: "gray", mb: 2 }}
                    role="status"
                    aria-live="polite"
                >
                Assistant is typing...
                </Typography>   
            )}
        </Box>
        </Box>
    );
}
