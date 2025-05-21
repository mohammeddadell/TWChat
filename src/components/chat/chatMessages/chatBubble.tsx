import React from 'react';
import {View, StyleSheet, ViewStyle, Image} from 'react-native';
import {Text, Surface} from 'react-native-paper';
import {ChatMessage} from '../../../types/chat';
import {useTheme} from 'react-native-paper';
import {CHAT_CONSTANTS} from '../../../constants/chat';
import {WINDOW} from '../../../utils/dimensions';

interface ChatBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
  style?: object;
}

const ChatBubble: React.FC<ChatBubbleProps> = React.memo(
  ({message, isCurrentUser, style}) => {
    const theme = useTheme();
    const bubbleStyle: ViewStyle = {
      backgroundColor: isCurrentUser
        ? theme.colors.primary
        : theme.colors.surfaceVariant,
      alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
    };

    const textColor = isCurrentUser
      ? theme.colors.onPrimary
      : theme.colors.onSurfaceVariant;

    return (
      <View style={[styles.container, style]}>
        <Surface style={[styles.bubble, bubbleStyle]} elevation={1}>
          {message.imageUri && (
            <Image
              source={{uri: message.imageUri}}
              style={styles.messageImage}
              resizeMode="cover"
            />
          )}
          {message.content && (
            <Text style={[styles.messageText, {color: textColor}]}>
              {message.content}
            </Text>
          )}
          <Text style={[styles.timestamp, {color: textColor}]}>
            {message.timestamp}
          </Text>
        </Surface>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginVertical: CHAT_CONSTANTS.CONTAINER_MARGIN.VERTICAL,
    marginHorizontal: CHAT_CONSTANTS.CONTAINER_MARGIN.HORIZONTAL,
  },
  bubble: {
    maxWidth: CHAT_CONSTANTS.MAX_MESSAGE_WIDTH,
    padding: CHAT_CONSTANTS.BUBBLE_PADDING,
    borderRadius: CHAT_CONSTANTS.BUBBLE_BORDER_RADIUS,
  },
  messageText: {
    fontSize: CHAT_CONSTANTS.MESSAGE_FONT_SIZE,
    lineHeight: CHAT_CONSTANTS.MESSAGE_LINE_HEIGHT,
  },
  timestamp: {
    fontSize: CHAT_CONSTANTS.TIMESTAMP_FONT_SIZE,
    marginTop: 4,
    opacity: 0.7,
  },
  messageImage: {
    width: WINDOW.WIDTH * WINDOW.MESSAGE_IMAGE_RATIO,
    height: WINDOW.WIDTH * WINDOW.MESSAGE_IMAGE_RATIO,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default ChatBubble;
