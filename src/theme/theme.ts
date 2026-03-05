import { createTheme } from "@mui/material/styles";

export const getTheme = (mode : "light" | "dark") => {
    console.log("theme created with mode:", mode);
    return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#10a37f",
      },
      background: {
        default: mode === "dark" ? "#343541" : "#ffffff",
        paper: mode === "dark" ? "#444654" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ececf1" : "#111827",
        secondary: mode === "dark" ? "#c5c5d2" : "#6b7280",
      },
    },
    typography: {
      fontFamily:
        'Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            overflow: "hidden",
          },
        },
      },
    },
  });
};