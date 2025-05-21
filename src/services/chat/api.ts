import { User } from '../../types/auth';
import {ChatMessage, Conversation} from '../../types/chat';

// Mock messages data
const mockConversations: Conversation[] = [
  {
    id: '1',
    user: {id: '1', name: 'User1'},
    partner: {id: '2', name: 'I am a bot'},
    type: 'bot',
    messages: [
      {
        id: '1',
        content: 'Hey, how are you doing? I wanted to discuss the project timeline.',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
      {
        id: '2',
        content: 'are you free right now?',
        senderId: '2',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
      {
        id: '3',
        content: "sure! i'm free right now",
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
      {
        id: '4',
        content: 'Hey, how are you doing? I wanted to discuss the project timeline.',
        senderId: '2',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      }
    ],
  },
  {
    id: '2',
    user: {id: '1', name: 'User1'},
    partner: {id: '3', name: 'User3'},
    type: 'contact',
    messages: [
      {
        id: '1',
        content: 'The new design looks great! When can we expect the implementation?',
        senderId: '3',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
      {
        id: '2',
        content: 'We should have it ready by next week.',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      }
    ],
  },
  {
    id: '3',
    user: {id: '1', name: 'User1'},
    partner: {id: '4', name: 'User4'},
    type: 'contact',
    messages: [
      {
        id: '1',
        content: "I've completed the backend integration. Would you like to review it?",
        senderId: '4',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
      {
        id: '2',
        content: 'Yes, please share the details.',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
      }
    ],
  },
  {
    id: '4',
    user: { id: '1', name: 'User1' },
    partner: { id: '5', name: 'User5' },
    type: 'contact',
    messages: [
      // Previous messages (1-7)...
      {
        id: '1',
        content: "Don't forget about the team meeting tomorrow at 2 PM!",
        senderId: '5',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '2',
        content: 'Thanks for the reminder!',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '3',
        content: 'Can you send me the meeting agenda?',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '4',
        content: 'Sure, I just emailed it to you. Let me know if you need anything else.',
        senderId: '5',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '5',
        content: 'Got it, thanks! Do we need to prepare anything for the meeting?',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '6',
        content: 'Just review the quarterly report. We might discuss the new project timeline.',
        senderId: '5',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '7',
        content: 'Will do. See you tomorrow!',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
  
      // New messages (8-14)
      {
        id: '8',
        content: 'Actually, I just got an update—the meeting might start 15 minutes later. Waiting for confirmation.',
        senderId: '5',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '9',
        content: 'Oh, okay. Should I still come at 2 PM or wait?',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '10',
        content: "Better come at 2 PM just in case. The delay isn't confirmed yet.",
        senderId: '5',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '11',
        content: 'Got it. Also, will the client be joining this meeting?',
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '12',
        content: "No, it's internal for now. We'll schedule a separate call with them next week.",
        senderId: '5',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '13',
        content: "Perfect. I'll bring my notes on the project milestones.",
        senderId: '1',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: '14',
        content: 'Great! Thanks for being prepared. See you then!',
        senderId: '5',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ],
  }
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getConversations = async (_currentUserID: string): Promise<Conversation[]> => {
  // Simulate network delay
  await delay(1500);
  
  // Return conversations with only the last message
  return mockConversations.map(conversation => ({
    ...conversation,
    messages: conversation.messages.length > 0 
      ? [conversation.messages[conversation.messages.length - 1]]
      : []
  }));
};

export const getConversation = async (conversationId: string): Promise<Conversation | undefined> => {
  // Simulate network delay
  await delay(1500);
  return mockConversations.find(conversation => conversation.id === conversationId);
};

export const getMyUsers = async (): Promise<Pick<User, 'id' | 'name'>[]> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      // Get unique partners from conversations
      const uniquePartners = Array.from(
        new Map(
          mockConversations.map(conv => [conv.partner.id, conv.partner])
        ).values()
      );
      resolve(uniquePartners);
    }, 1000);
  });
};

export const sendMessage = async (message: ChatMessage, selectedUsers: string[]): Promise<void> => {
  // Simulate network delay
  await delay(1000);

  // Add the message to each selected user's conversation
  selectedUsers.forEach(targetUserId => {
    // Find the conversation with this user
    const conversation = mockConversations.find(conv => 
      conv.partner.id === targetUserId
    );

    if (conversation) {
      // Add the new message to the conversation
      conversation.messages.push({
        ...message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }
  });
};
