import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card } from '../ui/card';
import type { Message } from '../../types/chat';
import { User, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg",
      isUser ? "bg-muted/50" : "bg-background"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={cn(
          "text-white",
          isUser ? "bg-blue-500" : "bg-green-500"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        
        <Card className="p-3 bg-card border-0 shadow-sm">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        </Card>
      </div>
    </div>
  );
};