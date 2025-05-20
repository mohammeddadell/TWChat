import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ChatMessage, Conversation} from '../../types/chat';
import {useAuth} from '../../context/AuthContext';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {MessageInput} from '../../components/chat/chatMessages/MessageInput';
import ChatMessagesList from '../../components/chat/chatMessages/chatMessagesList';
import {ChatHeader} from '../../components/chat/ChatHeader';
import {User} from '../../types/auth';
import {useChat} from '../../hooks/useChat';

type ChatScreenRouteProp = RouteProp<
  {
    Chat: {
      conversationId: string;
    };
  },
  'Chat'
>;

export const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const {colors} = useTheme();
  const {userID} = useAuth();
  const [conversation, setConversation] = useState<Conversation | undefined>(
    undefined,
  );
  const {getConversation, loading, addMessage, loadConversationDetails} =
    useChat();
  const [partner, setPartner] = useState<Pick<User, 'id' | 'name'>>({
    id: '',
    name: '',
  });
  const [waitingForBotResponse, setWaitingForBotResponse] = useState(false);
  const conversationId = route.params?.conversationId;

  useEffect(() => {
    const localConversation = getConversation(conversationId);
    if (!localConversation?.fetched) {
      loadConversationDetails(conversationId);
      const loadedConversation = getConversation(conversationId);
      setConversation(loadedConversation);
    } else {
      setConversation(localConversation);
    }
  }, [conversationId, getConversation, loadConversationDetails]);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
      setPartner(conversation.partner);
      const chatHeader = () => {
        return (
          <ChatHeader
            partnerName={partner.name || 'Unknown User'}
            partnerId={partner.name || ''}
          />
        );
      };
      navigation.setOptions({
        headerTitle: () => chatHeader(),
        headerBackTitle: '',
      });
    }
  }, [conversation, navigation, userID, partner]);

  const handleSendMessage = async (text: string, imageUri?: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: userID,
      content: text,
      imageUri: imageUri,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    addMessage(conversationId, newMessage);
    setMessages(prevMessages => [...prevMessages, newMessage]);

    //mock waiting for bot response on a websocket
    if (conversation?.type === 'bot') {
      setWaitingForBotResponse(true);
      setTimeout(async () => {
        const newBotMessage: ChatMessage = {
          id: Date.now().toString(),
          senderId: partner.id,
          content: `${newMessage.content} is a good idea. what else do you think?`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages(prevMessages => [...prevMessages, newBotMessage]);
        addMessage(conversationId, newBotMessage);
        setWaitingForBotResponse(false);
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <ChatMessagesList messages={messages} userID={userID} />
          <View style={styles.messageInputContainer}>
            <MessageInput
              onSend={handleSendMessage}
              waitingForBotResponse={waitingForBotResponse}
            />
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageInputContainer: {
    paddingHorizontal: 6,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
