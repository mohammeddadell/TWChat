import {Pressable, StyleSheet, View} from 'react-native';
import {Avatar, Text, Surface} from 'react-native-paper';
import {Conversation} from '../../../types/chat';

interface ConversationItemProps {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}

const ConversationItem = ({conversation, onPress}: ConversationItemProps) => {
  const partner = conversation.partner.name;
  return (
    <Pressable onPress={() => onPress(conversation)}>
      <Surface style={styles.chatItem} elevation={1}>
        <Avatar.Text size={50} label={partner.slice(0, 2).toUpperCase()} />
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text variant="titleMedium">{partner}</Text>
            <Text variant="bodySmall" style={styles.timestamp}>
              {
                conversation.messages[conversation.messages.length - 1]
                  .timestamp
              }
            </Text>
          </View>
          <Text
            variant="bodyMedium"
            numberOfLines={2}
            style={styles.messagePreview}>
            {conversation.messages[conversation.messages.length - 1].content}
          </Text>
        </View>
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  chatContent: {
    flex: 1,
    marginLeft: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timestamp: {
    color: '#666',
  },
  messagePreview: {
    color: '#444',
  },
});

export default ConversationItem;
