import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { showMessageToast } from '../../components/ToastManager';

import { ChatsState, Conversation, Message } from './types';
import { getSampleConversations } from './data/sampleConversations';

// Initial state with sample data
const initialState: ChatsState = {
  conversations: getSampleConversations(),
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ conversationId: string; message: Omit<Message, 'id'>; showToast?: boolean }>) => {
      const { conversationId, message, showToast = true } = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        const newMessage: Message = {
          ...message,
          id: `m${Date.now()}`, // Simple ID generation
        };
        conversation.messages.push(newMessage);
        conversation.lastMessage = message.text;
        conversation.updatedAt = message.timestamp;

        // Show toast notification for incoming messages from others
        if (showToast && message.sender === 'other') {
          showMessageToast(conversation.name, message.text);
        }

        // Move conversation to top
        const index = state.conversations.findIndex(c => c.id === conversationId);
        if (index > 0) {
          const [movedConversation] = state.conversations.splice(index, 1);
          state.conversations.unshift(movedConversation);
        }
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find(c => c.id === action.payload);
      if (conversation) {
        conversation.isFavorite = !conversation.isFavorite;
      }
    },
    setTyping: (state, action: PayloadAction<{ conversationId: string; isTyping: boolean }>) => {
      const { conversationId, isTyping } = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.typing = isTyping;
      }
    },
    setOnlineStatus: (state, action: PayloadAction<{ conversationId: string; isOnline: boolean }>) => {
      const { conversationId, isOnline } = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.online = isOnline;
      }
    },
    addConversation: (state, action: PayloadAction<Omit<Conversation, 'messages'> & { messages?: Message[] }>) => {
      const newConversation: Conversation = {
        ...action.payload,
        messages: action.payload.messages || [],
      };
      state.conversations.unshift(newConversation);
    },
    deleteConversation: (state, action: PayloadAction<string>) => {
      state.conversations = state.conversations.filter(c => c.id !== action.payload);
    },
  },
});

export const {
  addMessage,
  toggleFavorite,
  setTyping,
  setOnlineStatus,
  addConversation,
  deleteConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
