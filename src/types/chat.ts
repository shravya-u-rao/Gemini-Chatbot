export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatHookReturn extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export interface GeminiHistoryItem {
  role: 'user' | 'model';
  content: string;
}