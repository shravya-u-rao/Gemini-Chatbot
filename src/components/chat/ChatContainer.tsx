// src/components/chat/ChatContainer.tsx
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Card, CardHeader } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { AlertCircle, Sparkles, Bot, Moon, Sun, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';

export const ChatContainer: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Chat Card */}
      <div className="h-full flex items-center justify-center">
        <Card className="card relative w-full max-w-5xl h-[90vh] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden flex flex-col">
          {/* Glassmorphism Header Effect */}
          {/* <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/50 to-transparent dark:from-slate-900/50 z-10 pointer-events-none"></div> */}

          {/* Header - Fixed Padding */}
          <CardHeader className="card-header relative gap-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              {/* Header Content */}
              <div className="flex items-center gap-4 pl-2">
                <div className="relative">
                  <div className="m-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20">
                    <Bot className="w-9 h-9 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-slate-900 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Gemini AI
                  </h1>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Google Gemini 3.1 Pro
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 h-8 w-8"
                >
                  {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearMessages}
                  className="rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 h-8 w-8"
                  title="New Chat"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <ScrollArea className="flex-1">
            <div className="px-6 py-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
                      <Bot className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <span className="flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-purple-500"></span>
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Hello! I'm your AI Assistant
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md">
                      Ask me anything! I can help with coding, writing, analysis, and much more.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    {[
                      "Write a React component",
                      "Explain quantum computing",
                      "Debug my code",
                      "Write a poem"
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 text-slate-700 dark:text-slate-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="transform transition-all duration-300 hover:scale-[1.01]"
                    >
                      <ChatMessage message={message} />
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 p-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <TypingIndicator />
                    </div>
                  )}
                  {error && (
                    <Alert variant="destructive" className="mt-4 bg-red-50/50 dark:bg-red-950/50 border-red-200 dark:border-red-800 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
            <ChatInput
              onSendMessage={sendMessage}
              onClearChat={clearMessages}
              isLoading={isLoading}
            />
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};