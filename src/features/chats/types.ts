// Chat-related type definitions
export type Message = {
  id: string;
  sender: "me" | "other";
  text: string;
  timestamp: number;
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  isFavorite: boolean;
  lastMessage: string;
  updatedAt: number;
  typing?: boolean;
  online?: boolean;
  messages: Message[];
};

export type ChatsState = {
  conversations: Conversation[];
};
