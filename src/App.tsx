import ChatLayout from "./components/chat/ChatLayout";
import {ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";

type Props = {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

function App({mode, toggleTheme} : Props) {
  return (
      <ChatLayout 
        mode={mode}
        toggleTheme={toggleTheme}
      />
  );
}

export default App;