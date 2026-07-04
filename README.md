# Like-Me-Social-Media


A modern, real-time chat interface built with React and TypeScript, designed for scalability, clean architecture, and future integration with backend services such as Firebase or WebSockets.

This chat module focuses on maintainability, separation of concerns, and responsive UI/UX across all device sizes.

✨ Features
Real-time styled chat UI (frontend-ready for backend integration)
Emoji support via emoji picker
Auto-scrolling to latest messages
Keyboard support:
Enter → send message
Shift + Enter → new line
Message differentiation (own vs other users)
Location display (latitude & longitude)
Timestamp formatting for messages
Responsive design (mobile, tablet, desktop)
Modular architecture (hooks, components, UI separation)
Scalable structure for:
file uploads
voice messages
video calls
typing indicators
🧱 Tech Stack
React (Functional Components)
TypeScript
SCSS (custom styling)
React Hooks (useState, useEffect, useRef, useCallback)
Emoji Picker React
Material UI Icons
React Icons
📁 Project Structure
src/
│
├── Component/
│   ├── Chat/
│   │   ├── Chat.tsx
│   │   ├── Chat.scss
│   │   │
│   │   ├── hooks/
│   │   │   └── useChat.ts
│   │   │
│   │   ├── components/
│   │   │   ├── ChatInput.tsx
│   │   │   └── MessageList.tsx
│   │   │
│   │   └── assets/
│   │       ├── imagehhh.jpg
│   │       └── hosk.jpg
│
├── Context/
│   └── Autheciator.tsx
│
├── Component/
│   └── UseCreateDate.ts
│
├── lib/
│   └── firebase.ts
│
└── Pages/
    └── UserProfile/
🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/like-me-social-media.git
cd like-me-social-media
2. Install dependencies
npm install

or

yarn install
3. Start development server
npm run dev
⚙️ Environment Setup

If backend integration is enabled (Firebase example):

Create a .env file:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
🧠 Architecture Overview
1. Chat Container (Chat.tsx)
Main UI wrapper
Handles layout (top, center, bottom)
Connects hooks and components
2. Chat Logic Hook (useChat.ts)

Handles all chat state:

Messages state
Input state
Emoji handling
Message sending logic
Auto-scroll behavior
Keyboard shortcuts
3. MessageList Component

Responsible for:

Rendering messages
Differentiating own vs received messages
Displaying timestamps and attachments
4. ChatInput Component

Handles:

User input field
Emoji picker
Send button
Keyboard interactions
📱 Responsive Design

The UI is optimized for:

📱 Mobile: stacked layout, compact message bubbles
📟 Tablet: balanced spacing, adaptive input bar
🖥️ Desktop: full chat layout with side panels

Key improvements:

Flexible message width
Auto-wrapping input area
Scroll-safe message container
⚡ Performance Considerations
useCallback used for stable event handlers
Auto-scroll optimized to trigger only on message updates
Component separation reduces unnecessary re-renders
Stateless UI components where possible
🔮 Future Enhancements

Planned upgrades:

🔌 Firebase / WebSocket real-time messaging
📎 File & image uploads
🎤 Voice notes
👀 Typing indicators
🟢 Online/offline user status
🔔 Push notifications
💬 Message read receipts
🧠 AI assistant integration inside chat
🧪 Known Improvements Needed
Add backend persistence (messages are currently local state)
Improve error handling for geolocation
Add message pagination for large chats
Optimize scroll performance for long conversations
👨‍💻 Author

Built as part of a full-stack social media learning project focused on:

scalable frontend architecture
real-world chat systems
UI/UX engineering
📄 License

This project is open for educational use and further development.
