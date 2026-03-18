import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { AlertCircle } from 'lucide-react';
import { AvatarFallback,Avatar } from '../ui/avatar';
import { Bot } from 'lucide-react';

export const ChatContainer: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto shadow-xl">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold">AI Chat Assistant</h2>
        <p className="text-sm text-blue-100">
          Powered by Google Gemini AI
        </p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
            <Bot className="h-12 w-12" />
            <p className="text-lg">Start a conversation with the AI assistant</p>
            <p className="text-sm">Ask me anything! I'm here to help.</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3 p-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-500">
                    <Bot className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <TypingIndicator />
              </div>
            )}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </ScrollArea>

      {/* Input Area */}
      <ChatInput
        onSendMessage={sendMessage}
        onClearChat={clearMessages}
        isLoading={isLoading}
      />
    </Card>
  );
};