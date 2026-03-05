import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getTheme } from "./theme/theme";
import {ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {useState} from "react";
import { ChatProvider } from "./context/ChatContext";
import { UserPreferenceProvider } from './context/UserPreferenceContext';
import ErrorBoundary from './components/ErrorBoundary';

function Main() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  // const toggleTheme = () => {
  //   setMode((prev) => prev !== "light" ? "dark" : "light");
  // }

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      console.log("theme switching to:", next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserPreferenceProvider>
      <ChatProvider>
        <App 
          mode={mode}
          toggleTheme={toggleTheme}
        />
      </ChatProvider>
      </UserPreferenceProvider>
    </ThemeProvider>
  );
  
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  </StrictMode>,
)
