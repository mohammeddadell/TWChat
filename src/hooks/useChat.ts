import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ChatMessage, Conversation} from '../types/chat';
import {
  addMessage,
  addConversation,
  clearConversation,
  fetchConversations,
  fetchConversationDetails,
  sendMessageAction,
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

  const handleBroadcastMessage = useCallback(
    async (partnerUserIds: string[], content: string) => {
      const message: ChatMessage = {
        id: Date.now().toString(),
        content,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        senderId: userID,
      };

      // Send message using Redux action
      await dispatch(sendMessageAction({
        conversationId: '', // Not needed for broadcast
        message,
        selectedUsers: partnerUserIds
      })).unwrap();

      // First add the message to local store
      partnerUserIds.forEach(partnerId => {
        const conversation = conversations.find(
          conv => conv.partner.id === partnerId
        );
        if (conversation) {
          dispatch(addMessage({conversationId: conversation.id, message}));
        }
      });

      // Fetch full conversation details for each conversation
      for (const partnerId of partnerUserIds) {
        const conversation = conversations.find(
          conv => conv.partner.id === partnerId
        );
        if (conversation) {
          await dispatch(fetchConversationDetails(conversation.id)).unwrap();
        }
      }
    },
    [dispatch, conversations, userID],
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
    broadcastMessage: handleBroadcastMessage,
    addConversation: handleAddConversation,
    clearConversation: handleClearConversation,
    loadConversationDetails: handleLoadConversationDetails,
    allConversations: conversations,
    loading,
  };
}; 