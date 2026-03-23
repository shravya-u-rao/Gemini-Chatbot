// src/components/chat/ChatMessage.tsx
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import type { Message } from '../../types/chat';
import { User, Bot, Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markdownComponents: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      
      if (match) {
        return (
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-lg !my-3"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      }
      
      return (
        <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className={cn(
      "flex gap-4 p-4 rounded-2xl transition-all duration-300 group",
      isUser 
        ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30" 
        : "bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50"
    )}>
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar className={cn(
          "h-10 w-10 rounded-xl shadow-lg transition-transform group-hover:scale-110",
          isUser 
            ? "bg-gradient-to-br from-blue-500 to-indigo-600" 
            : "bg-gradient-to-br from-emerald-500 to-teal-600"
        )}>
          <AvatarFallback className="bg-transparent">
            {isUser ? (
              <User className="h-5 w-5 text-white" />
            ) : (
              <Bot className="h-5 w-5 text-white" />
            )}
          </AvatarFallback>
        </Avatar>
        {!isUser && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white">
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <span className="text-xs px-2 py-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-full text-slate-600 dark:text-slate-400">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          {/* Message Actions */}
          {!isUser && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50",
                  feedback === 'like' && "text-blue-500"
                )}
                onClick={() => setFeedback('like')}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50",
                  feedback === 'dislike' && "text-red-500"
                )}
                onClick={() => setFeedback('dislike')}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Message Content with Markdown */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-p:my-2 prose-pre:my-2 prose-ul:my-2 prose-ol:my-2">
          {isUser ? (
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          ) : (
            <ReactMarkdown components={markdownComponents}>
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};