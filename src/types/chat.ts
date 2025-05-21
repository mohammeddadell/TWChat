import { User } from "./auth";

export interface ChatMessage {
    id: string;
    content: string;
    senderId: string;
    timestamp: string;
    imageUri?: string;
  }

  export interface Conversation {
    id: string;
    user: Pick<User, 'id' | 'name'>;
    messages: ChatMessage[];
    partner: Pick<User, 'id' | 'name'>;
    type: 'contact' | 'bot';
  }
