import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Surface, useTheme} from 'react-native-paper';
import {ChatMessage} from '../../../types/chat';

interface BroadcastMessageProps {
  message: ChatMessage;
}

export const BroadcastMessage: React.FC<BroadcastMessageProps> = ({
  message,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Surface
        style={[
          styles.broadcastContainer,
          {backgroundColor: theme.colors.primaryContainer},
        ]}>
        <Text style={[styles.broadcastLabel, {color: theme.colors.primary}]}>
          Broadcast
        </Text>
        <Text style={styles.messageText}>{message.content}</Text>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  broadcastContainer: {
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  broadcastLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
    alignSelf: 'flex-end',
  },
});
