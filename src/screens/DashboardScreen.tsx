import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ConversationsList} from '../components/chat/chatList/ConversationsList';
import {ActivityIndicator, FAB, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BroadcastModal} from '../components/chat/broadcast/broadcastModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useChat} from '../hooks/useChat';

const DashboardScreen = () => {
  const [broadcastModalVisible, setBroadcastModalVisible] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const {allConversations, loading, broadcastMessage} = useChat();

  const handleBroadcast = useCallback(
    async (message: string, selectedUsers: string[]) => {
      try {
        broadcastMessage(selectedUsers, message);
      } catch (error) {
        console.error('Error broadcasting message:', error);
      }
    },
    [broadcastMessage],
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ConversationsList
        conversations={allConversations}
        onChatPress={conversation => {
          console.log('Chat pressed:', conversation);
          navigation.navigate('Chat', {conversationId: conversation.id});
        }}
      />
      <FAB
        icon="broadcast"
        style={[
          styles.fab,
          {backgroundColor: theme.colors.primary, marginBottom: insets.bottom},
        ]}
        color={theme.colors.onPrimary}
        onPress={() => setBroadcastModalVisible(true)}
      />
      <BroadcastModal
        visible={broadcastModalVisible}
        onDismiss={() => setBroadcastModalVisible(false)}
        onSend={handleBroadcast}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 6,
    bottom: 6,
  },
});

export default DashboardScreen;
