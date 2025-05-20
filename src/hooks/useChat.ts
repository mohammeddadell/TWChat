import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ChatMessage, Conversation} from '../types/chat';
import {
  addMessage,
  addConversation,
  clearConversation,
  fetchConversations,
  fetchConversationDetails,
} from '../store/chatSlice';
import {RootState, AppDispatch} from '../store/store';
import {useAuth} from '../context/AuthContext';

export const useChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {conversations, loading} = useSelector((state: RootState) => state.chat);
  const {userID} = useAuth();

  useEffect(() => {
    if (conversations.length === 0) {
      dispatch(fetchConversations(userID));
    }
  }, [dispatch, conversations.length, userID]);

  const getConversation = useCallback(
    (conversationId: string) =>
      conversations.find(conversation => conversation.id === conversationId),
    [conversations],
  );

  const handleAddMessage = useCallback(
    (conversationId: string, message: ChatMessage) => {
      dispatch(addMessage({conversationId, message}));
    },
    [dispatch],
  );

  const handleAddConversation = useCallback(
    (conversation: Conversation) => {
      dispatch(addConversation(conversation));
    },
    [dispatch],
  );

  const handleClearConversation = useCallback(
    (conversationId: string) => {
      dispatch(clearConversation(conversationId));
    },
    [dispatch],
  );

  const handleLoadConversationDetails = useCallback(
    async (conversationId: string) => {
      await dispatch(fetchConversationDetails(conversationId)).unwrap();
    },
    [dispatch],
  );

  return {
    getConversation,
    addMessage: handleAddMessage,
    addConversation: handleAddConversation,
    clearConversation: handleClearConversation,
    loadConversationDetails: handleLoadConversationDetails,
    allConversations: conversations,
    loading,
  };
}; 