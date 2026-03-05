import ChatLayout from "./components/chat/ChatLayout";

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