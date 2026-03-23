// src/components/chat/ChatInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onClearChat,
  isLoading,
  disabled,
}) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className={cn(
        "flex items-center gap-2 p-2 rounded-xl transition-all duration-200",
        "bg-white dark:bg-slate-900 border",
        isFocused 
          ? "border-blue-500 ring-2 ring-blue-500/20" 
          : "border-slate-200 dark:border-slate-700"
      )}>
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask Gemini..."
          disabled={isLoading}
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />

        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          size="icon"
          className={cn(
            "rounded-lg transition-all duration-200",
            input.trim() 
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md" 
              : "bg-slate-100 dark:bg-slate-800 text-slate-400"
          )}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mt-3">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Gemini AI may display inaccurate information. Verify important details.
        </p>
      </div>
    </form>
  );
};