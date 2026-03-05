<div align="center">

```
 ██████╗██╗  ██╗ █████╗ ████████╗ ██████╗ ██████╗ ████████╗    ██╗   ██╗██╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝██╔════╝ ██╔══██╗╚══██╔══╝    ██║   ██║██║
██║     ███████║███████║   ██║   ██║  ███╗██████╔╝   ██║       ██║   ██║██║
██║     ██╔══██║██╔══██║   ██║   ██║   ██║██╔═══╝    ██║       ██║   ██║██║
╚██████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║        ██║       ╚██████╔╝██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝        ╚═╝        ╚═════╝ ╚═╝
```

### ✦ A pixel-perfect ChatGPT clone · powered by real OpenAI streaming · enhanced with Adaptive Cards ✦

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-Streaming-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![MUI](https://img.shields.io/badge/Material_UI-5-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

<br/>

> **Real-time streaming · Adaptive Cards · Dark/Light Themes · Conversation History · User Preferences**

<br/>

</div>

---

## ✦ What Is This?

A **production-grade ChatGPT UI clone** that doesn't just look the part — it goes further. Built with React + TypeScript on the frontend and Node.js + Express on the backend, this project delivers true OpenAI streaming responses while layering in **Adaptive Cards** for rich, structured message rendering.

Whether it's a weather card, a product showcase, or a live poll — responses aren't just text anymore.

---

## ✦ Feature Highlights

<br/>

### 💬 &nbsp; Chat Experience

| Feature | Details |
|---|---|
| ⚡ Real-time streaming | Token-by-token response rendering via `ReadableStream` |
| 📝 Markdown rendering | Full markdown support via `react-markdown` |
| 🖥️ Syntax highlighting | Code blocks with language detection and highlighting |
| 📋 Copy to clipboard | One-click copy on all code snippets |
| ↕️ Auto-scroll | Smooth auto-scroll as responses stream in |

<br/>

### 🎨 &nbsp; UI & Layout

| Feature | Details |
|---|---|
| 🌗 Dark / Light theme | Seamless toggle, persisted in preferences |
| 🗂️ Collapsible sidebar | Slide-away conversation history panel |
| 📱 Responsive layout | Works across desktop and mobile viewports |
| 🎯 ChatGPT aesthetic | Pixel-matched spacing, typography, and interactions |

<br/>

### 🃏 &nbsp; Adaptive Cards

Responses can render **fully interactive, structured UI components** inside the chat — not just text.

```
┌─────────────────────────────────────────┐
│  🌤️  Weather Card     📦  Product Card  │
│  📊  Poll Card        🎴  Custom Cards  │
└─────────────────────────────────────────┘
```

Cards are registered via a **dynamic component registry** — drop in a new card type and it's instantly available.

<br/>

### 💾 &nbsp; Conversation Management

- 🗃️ **Multiple chat sessions** — spin up as many as you need
- 🏷️ **Auto-generated titles** — no manual naming required
- 🔄 **Instant switching** — jump between conversations from the sidebar

<br/>

### ⚙️ &nbsp; User Preferences

Stored in global Context and applied to every request:

```
┌──────────────────────────────────────────────────────┐
│  Response Style     │  Concise · Detailed · Creative  │
│  Language           │  Your preferred coding language  │
│  Creativity Level   │  Temperature slider (0 → 1)      │
│  Max Length         │  Token limit control             │
│  Streaming          │  Enable / disable live streaming │
└──────────────────────────────────────────────────────┘
```

---

## ✦ Architecture

<br/>

### Frontend Data Flow

```
                    ┌─────────────────┐
                    │  ChatProvider   │  ← Global State (Context API)
                    └────────┬────────┘
                             │
                      sendMessage()
                             │
                    ┌────────▼────────┐
                    │   Backend API   │  ← Express + Node.js
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  OpenAI Stream  │  ← Token-by-token generation
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   UI Updates    │  ← React re-renders per chunk
                    └─────────────────┘
```

<br/>

### Message Rendering Pipeline

```
    ┌───────────────┐
    │ MessageBubble │
    └──────┬────────┘
           │
    ┌──────▼────────┐
    │ ReactMarkdown │  ← Parses markdown, code fences, tables
    └──────┬────────┘
           │
    ┌──────▼────────┐
    │ CardRenderer  │  ← Detects structured card payloads
    └──────┬────────┘
           │
    ┌──────▼──────────────┐
    │ Adaptive Card Comp. │  ← Weather / Product / Poll / Custom
    └─────────────────────┘
```

<br/>

### Streaming Architecture

```
  OpenAI API
      │
      │  Server-Sent Events
      ▼
  Express Server
      │
      │  res.write(token)
      ▼
  Frontend ReadableStream
      │
      │  chunk-by-chunk state update
      ▼
  React Component Re-render
```

---

## ✦ Getting Started

<br/>

### Prerequisites

```bash
node >= 18.0.0
npm  >= 9.0.0
An OpenAI API key
```

<br/>

### 1 · Clone the Repository

```bash
git clone https://github.com/your-username/chatgpt-ui-clone.git
cd chatgpt-ui-clone
```

---

## ✦ Environment Setup

> 🔑 &nbsp; This is the most critical step. Get this wrong and nothing runs. Get it right and you're golden.

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║    TWO .env FILES · ONE FOR EACH END OF THE STACK                ║
║                                                                  ║
║    📁 .env              ← Lives at the project root (frontend)   ║
║    📁 backend/.env      ← Lives inside the backend folder        ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

<br/>

---

### 🖥️ &nbsp; Frontend Environment &nbsp;·&nbsp; `/.env`

> Sits at the **project root** — the same level as `package.json`, `index.html`, and `vite.config.ts`.

<br/>

**Step 1 — Create the file**

```bash
# From the project root
touch .env
```

**Step 2 — Add your variable**

```env
# ═══════════════════════════════════════════════════
# 🖥️  FRONTEND · Root .env
# ═══════════════════════════════════════════════════

VITE_API_BASE_URL=http://localhost:3001

# ───────────────────────────────────────────────────
# ⚠️  Port must match the PORT value in backend/.env
# ═══════════════════════════════════════════════════
```

| Variable | Value | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3001` | Points the frontend at your running backend |

<br/>

> 💡 &nbsp; The `VITE_` prefix is **required**. Vite only exposes variables prefixed with `VITE_` to the browser. Variables without it are silently ignored.

<br/>

---

### ⚙️ &nbsp; Backend Environment &nbsp;·&nbsp; `/backend/.env`

> Sits **inside the `backend/` folder** — alongside `server.js` and `routes/`.

<br/>

**Step 1 — Create the file**

```bash
# From the project root
touch backend/.env
```

**Step 2 — Add your variables**

```env
# ═══════════════════════════════════════════════════
# ⚙️  BACKEND · backend/.env
# ═══════════════════════════════════════════════════

OPENAI_API_KEY=sk-your-api-key-here
PORT=3001

# ───────────────────────────────────────────────────
# ⚠️  PORT here must match VITE_API_BASE_URL in /.env
# ═══════════════════════════════════════════════════
```

| Variable | Value | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | `sk-...` | Authenticates requests to OpenAI's API |
| `PORT` | `3001` | Port the Express server listens on |

<br/>

---

### 🔗 &nbsp; Port Sync — The Rule You Cannot Break

The port defined in your **backend** must exactly match the port in your **frontend URL**. They speak to each other — mismatched ports means silence.

```
╔══════════════════════════╗        ╔═══════════════════════════════════╗
║   backend/.env           ║        ║   .env (root)                     ║
║  ─────────────────────   ║  ───▶  ║  ───────────────────────────────   ║
║   PORT=3001              ║  SYNC  ║   VITE_API_BASE_URL=              ║
║                          ║  ◀───  ║   http://localhost:3001           ║
╚══════════════════════════╝        ╚═══════════════════════════════════╝
         ✅  Matched — frontend can reach backend
```

```
╔══════════════════════════╗        ╔═══════════════════════════════════╗
║   backend/.env           ║        ║   .env (root)                     ║
║  ─────────────────────   ║   ✖    ║  ───────────────────────────────   ║
║   PORT=3001              ║──────▶ ║   VITE_API_BASE_URL=              ║
║                          ║        ║   http://localhost:5000           ║
╚══════════════════════════╝        ╚═══════════════════════════════════╝
         ❌  Mismatched — all API calls will fail
```

<br/>

> 🔒 &nbsp; Both `.env` files are already listed in `.gitignore`. **Never commit them.**

<br/>

---

### 3 · Install & Run Frontend

```bash
# From project root
npm install
npm run dev

# Runs on → http://localhost:5173
```

<br/>

### 4 · Install & Run Backend

```bash
# In a separate terminal
cd backend
npm install
npm run dev

# Runs on → http://localhost:3001
```

---

## ✦ Suggestion Chips

The interface ships with **pre-built conversation starters** to help users hit the ground running:

```
╔══════════════════════════╗  ╔══════════════════════════════╗
║  Explain quantum         ║  ║  Write a Python function     ║
║  computing in simple     ║  ║  to sort a list of objects   ║
║  terms                   ║  ║  by a custom key             ║
╚══════════════════════════╝  ╚══════════════════════════════╝

╔══════════════════════════╗  ╔══════════════════════════════╗
║  Translate "Hello,       ║  ║  Summarize this article      ║
║  World!" into 5          ║  ║  in 3 bullet points          ║
║  languages               ║  ║                              ║
╚══════════════════════════╝  ╚══════════════════════════════╝
```

---

## ✦ Project Structure

```
chatgpt-ui-clone/                        ← 📂 Project Root
│
├── 📁 backend/                          ← Express API server
│   ├── server.js                        #   Entry point
│   ├── 📁 routes/
│   │   └── chat.js                      #   /api/chat streaming route
│   ├── 📁 services/                     #   OpenAI integration layer
│   └── .env                             #   🔒 Backend secrets (never commit)
│
├── 📁 dist/                             ← Production build output (auto-generated)
│
├── 📁 node_modules/                     ← Installed dependencies (auto-generated)
│
├── 📁 public/                           ← Static assets served as-is
│
├── 📁 src/                              ← Frontend source code
│   │
│   ├── 📁 assets/                       #   Images, fonts, icons
│   │
│   ├── 📁 components/
│   │   │
│   │   ├── 📁 cards/                    #   Adaptive card components
│   │   │   ├── AdaptiveCardRenderer.tsx #     Renders arbitrary adaptive cards
│   │   │   ├── CardRegistry.tsx         #     Dynamic card type registry
│   │   │   ├── CardRenderer.tsx         #     Card dispatcher / selector
│   │   │   └── WeatherCard.tsx          #     Weather adaptive card
│   │   │
│   │   ├── 📁 chat/                     #   Core chat UI
│   │   │   ├── 📁 sidebar/
│   │   │   │   └── Sidebar.tsx          #     Collapsible conversation list
│   │   │   ├── ChatInput.tsx            #     Message input + send button
│   │   │   ├── ChatLayout.tsx           #     Page shell / layout wrapper
│   │   │   ├── MessageBubble.tsx        #     Individual message rendering
│   │   │   └── MessageList.tsx          #     Scrollable message feed
│   │   │
│   │   ├── ErrorBoundary.tsx            #   Top-level error boundary
│   │   ├── SuggestionChips.tsx          #   Conversation starter chips
│   │   └── UserPreferenceDialog.tsx     #   Preferences settings modal
│   │
│   ├── 📁 context/
│   │   ├── ChatContext.tsx              #   Global chat state & actions
│   │   └── UserPreferenceContext.tsx    #   User preferences state
│   │
│   ├── 📁 data/
│   │   └── adaptiveCards.ts            #   Adaptive card payload definitions
│   │
│   ├── 📁 hooks/                        #   Custom React hooks
│   │
│   ├── 📁 services/
│   │   └── chatApi.ts                  #   API calls to Express backend
│   │
│   ├── 📁 theme/
│   │   └── theme.ts                    #   MUI theme (dark / light)
│   │
│   ├── 📁 utils/                        #   Shared utility functions
│   │
│   ├── App.css                          #   Global app styles
│   ├── App.tsx                          #   Root React component
│   ├── index.css                        #   Base / reset styles
│   └── main.tsx                         #   Vite entry point
│
├── .env                                 ← 🔒 Frontend secrets (never commit)
├── .env.example                         ← ✅ Safe to commit — template for others
├── .gitignore
├── eslint.config.js
├── index.html                           ← Vite HTML entry point
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## ✦ Deployment

<br/>

### Frontend → Vercel

```bash
npm run build
# Push to GitHub → Import in Vercel → Auto-deploy ✓
```

Set environment variable `VITE_API_BASE_URL` to your backend URL in Vercel project settings.

<br/>

### Backend → Render / Railway

```bash
# Set root directory to /backend
# Build command:  npm install
# Start command:  node server.js
# Add env var:    OPENAI_API_KEY
```

---

## ✦ Tech Stack

<br/>

<div align="center">

| Layer | Technology |
|---|---|
| ⚛️ &nbsp; UI Framework | React 18 + TypeScript |
| 🎨 &nbsp; Component Library | Material UI v5 |
| 🌐 &nbsp; State Management | Context API |
| 📝 &nbsp; Markdown | react-markdown + remark plugins |
| 🖥️ &nbsp; Backend Runtime | Node.js + Express |
| 🤖 &nbsp; AI Provider | OpenAI API (GPT-4 / GPT-3.5) |
| 📡 &nbsp; Streaming | Server-Sent Events + ReadableStream |
| 🚀 &nbsp; Frontend Deploy | Netlify |
| ☁️ &nbsp; Backend Deploy | Render |

</div>

---

## ✦ Contributing

Contributions are welcome! Here's how to get involved:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-new-card

# 3. Commit your changes
git commit -m "feat: add StockTickerCard adaptive card"

# 4. Push to the branch
git push origin feature/amazing-new-card

# 5. Open a Pull Request
```

---

## ✦ License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

```
  Made with ♥ and way too many tokens
```

[![Star on GitHub](https://img.shields.io/github/stars/your-username/chatgpt-ui-clone?style=social)](https://github.com/your-username/chatgpt-ui-clone)

</div>
