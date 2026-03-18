import { useState, useCallback, useRef } from 'react';
import type { Message, ChatHookReturn, GeminiHistoryItem } from '../types/chat';
import { generateChatResponse } from '../lib/gemini';
import { v4 as uuidv4 } from 'uuid';

export function useChat(): ChatHookReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Keep track of message history for context
  const messageHistory = useRef<GeminiHistoryItem[]>([]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Update message history
    messageHistory.current.push({ role: 'user', content });

    try {
      const response = await generateChatResponse({
        prompt: content,
        history: messageHistory.current,
      });

      if (response.success && response.data) {
        const assistantMessage: Message = {
          id: uuidv4(),
          content: response.data,
          role: 'assistant',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        messageHistory.current.push({ role: 'model', content: response.data });
      } else {
        setError(response.error || 'Failed to get response');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    messageHistory.current = [];
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}