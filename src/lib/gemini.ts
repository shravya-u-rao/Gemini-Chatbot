import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GeminiHistoryItem } from '../types/chat';

// Initialize the Gemini API with your API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Use the gemini-pro model for chat
const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

export interface GenerateContentParams {
  prompt: string;
  history?: GeminiHistoryItem[];
}

export async function generateChatResponse({ prompt, history = [] }: GenerateContentParams) {
  try {
    // Start a chat session
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    
    return { success: true, data: text };
  } catch (error) {
    console.error('Error generating response:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to generate response' 
    };
  }
}