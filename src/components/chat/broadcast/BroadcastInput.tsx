import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

interface BroadcastInputProps {
  onSend: (message: string) => void;
}

export const BroadcastInput: React.FC<BroadcastInputProps> = ({onSend}) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <TextInput
        mode="outlined"
        value={message}
        onChangeText={setMessage}
        placeholder="Type a broadcast message..."
        style={styles.input}
        right={
          <TextInput.Icon
            icon="broadcast"
            onPress={handleSend}
            disabled={!message.trim()}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 24,
  },
  input: {
    flex: 1,
  },
});
