import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, Trash2 } from 'lucide-react';

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Create a synthetic form event to reuse handleSubmit
      const form = e.currentTarget.form;
      if (form) {
        const formEvent = new Event('submit', { cancelable: true }) as unknown as React.FormEvent<HTMLFormElement>;
        Object.assign(formEvent, { preventDefault: () => e.preventDefault() });
        handleSubmit(formEvent);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t bg-background">
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading || disabled}
        className="flex-1"
      />
      
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onClearChat}
        disabled={isLoading}
        title="Clear chat"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      
      <Button
        type="submit"
        disabled={!input.trim() || isLoading}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};