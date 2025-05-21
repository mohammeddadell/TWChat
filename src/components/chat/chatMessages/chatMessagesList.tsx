import React, {useRef, useCallback, useEffect} from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {ChatMessage} from '../../../types/chat';
import ChatBubble from './chatBubble';

interface ChatMessagesListProps {
  messages: ChatMessage[];
  userID: string;
}

export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({
  messages,
  userID,
}) => {
  const flashListRef = useRef<FlashList<ChatMessage>>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (messages.length > 0 && flashListRef.current) {
          flashListRef.current.scrollToEnd({animated: true});
        }
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [messages]);

  const renderItem = useCallback(
    ({item}: {item: ChatMessage}) => (
      <ChatBubble
        key={item.id}
        message={item}
        isCurrentUser={item.senderId === userID}
      />
    ),
    [userID],
  );
  const handleContentSizeChange = useCallback(() => {
    if (messages.length > 0 && flashListRef.current) {
      flashListRef.current.scrollToItem({
        item: messages[messages.length - 1],
        animated: true,
      });
    }
  }, [messages]);
  const keyExtractor = useCallback((item: ChatMessage) => item.id, []);
  return (
    <View style={styles.container}>
      <FlashList
        ref={flashListRef}
        data={messages}
        renderItem={renderItem}
        estimatedItemSize={100}
        contentContainerStyle={styles.listContent}
        inverted={false}
        keyExtractor={keyExtractor}
        onContentSizeChange={handleContentSizeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 8,
  },
});

export default ChatMessagesList;
