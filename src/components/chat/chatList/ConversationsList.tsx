import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {Conversation} from '../../../types/chat';
import ConversationItem from './ConversationItem';

interface ConversationsListProps {
  conversations: Conversation[];
  onChatPress: (conversation: Conversation) => void;
}

export const ConversationsList = ({
  conversations,
  onChatPress,
}: ConversationsListProps) => {
  const renderItem = useCallback(
    ({item}: {item: Conversation}) => (
      <ConversationItem
        key={item.id}
        conversation={item}
        onPress={onChatPress}
      />
    ),
    [onChatPress],
  );
  return (
    <FlashList
      data={conversations}
      renderItem={renderItem}
      estimatedItemSize={80}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
  },
});
