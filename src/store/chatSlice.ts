import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {ChatMessage, Conversation} from '../types/chat';
import {getConversations, getConversation, sendMessage} from '../services/chat/api';

interface ChatState {
  conversations: (Conversation & { fetched: boolean })[];
  loading: boolean;
}

const initialState: ChatState = {
  conversations: [],
  loading: true,
};

export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async (userId: string) => {
    const conversations = await getConversations(userId);
    return conversations.map(conv => ({ ...conv, fetched: false }));
  },
);

export const fetchConversationDetails = createAsyncThunk(
  'chat/fetchConversationDetails',
  async (conversationId: string) => {
    const conversation = await getConversation(conversationId);
    return conversation ? { ...conversation, fetched: true } : undefined;
  },
);

export const sendMessageAction = createAsyncThunk(
  'chat/sendMessage',
  async (payload: {conversationId: string; message: ChatMessage; selectedUsers: string[]}) => {
    await sendMessage(payload.message, payload.selectedUsers);
    return payload;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload.map(conv => ({ ...conv, fetched: false }));
    },
    addMessage: (
      state,
      action: PayloadAction<{conversationId: string; message: ChatMessage}>,
    ) => {
      const {conversationId, message} = action.payload;
      const conversation = state.conversations.find(
        conv => conv.id === conversationId,
      );
      if (conversation) {
        conversation.messages.push(message);
      }
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push({ ...action.payload, fetched: false });
    },
    clearConversation: (state, action: PayloadAction<string>) => {
      state.conversations = state.conversations.filter(
        conv => conv.id !== action.payload,
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchConversations.pending, state => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.loading = false;
      })
      .addCase(fetchConversations.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchConversationDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchConversationDetails.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.conversations.findIndex(
            conv => conv.id === action.payload?.id
          );
          if (index !== -1) {
            state.conversations[index] = {
              ...state.conversations[index],
              ...action.payload,
              fetched: true
            };
          } else {
            state.conversations.push({
              ...action.payload,
              fetched: true
            });
          }
        }
        state.loading = false;
      })
      .addCase(fetchConversationDetails.rejected, state => {
        state.loading = false;
      })
      .addCase(sendMessageAction.fulfilled, (state, action) => {
        const {conversationId, message} = action.payload;
        const conversation = state.conversations.find(
          conv => conv.id === conversationId,
        );
        if (conversation) {
          conversation.messages.push(message);
        }
      });
  },
});

export const {
  setConversations,
  addMessage,
  addConversation,
  clearConversation,
  setLoading,
} = chatSlice.actions;

export default chatSlice.reducer; 