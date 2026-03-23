// src/components/chat/TypingIndicator.tsx
import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
      </div>
      <span className="text-xs text-muted-foreground font-medium">Gemini is thinking</span>
    </div>
  );
};