// src/App.tsx
import React from 'react';
import { ChatContainer } from './components/chat/ChatContainer';

function App() {
  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <ChatContainer />
    </div>
  );
}

export default App;