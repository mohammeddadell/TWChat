import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Modal,
  Portal,
  Checkbox,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import {BroadcastInput} from './BroadcastInput';
import {getMyUsers} from '../../../services/chat/api';
import {User} from '../../../types/auth';

interface BroadcastModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSend: (message: string, selectedUsers: string[]) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  visible,
  onDismiss,
  onSend,
}) => {
  const [_message, setMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const theme = useTheme();
  const [users, setUsers] = useState<Pick<User, 'id' | 'name'>[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users: Pick<User, 'id' | 'name'>[] = await getMyUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const toggleUserSelection = useCallback((userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    );
  }, []);

  const handleBroadcast = useCallback(
    (text: string) => {
      if (text.trim() && selectedUsers.length > 0) {
        onSend(text, selectedUsers);
        setMessage('');
        setSelectedUsers([]);
        onDismiss();
      }
    },
    [onSend, selectedUsers, onDismiss],
  );

  const checkboxItem = (user: Pick<User, 'id' | 'name'>) => {
    return (
      <Checkbox
        status={selectedUsers.includes(user.id) ? 'checked' : 'unchecked'}
        onPress={() => toggleUserSelection(user.id)}
      />
    );
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          {backgroundColor: theme.colors.surface},
        ]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Broadcast Message</Text>

              <ScrollView
                style={styles.userList}
                keyboardShouldPersistTaps="handled">
                {users.map(user => (
                  <List.Item
                    key={user.id}
                    title={user.name}
                    left={() => checkboxItem(user)}
                    onPress={() => toggleUserSelection(user.id)}
                  />
                ))}
              </ScrollView>

              <BroadcastInput onSend={handleBroadcast} />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '10%' : '20%',
    left: '5%',
    right: '5%',
    width: '90%',
    height: Platform.OS === 'ios' ? '50%' : '50%',
    borderRadius: 16,
    padding: 0,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalContent: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userList: {
    maxHeight: 200,
    marginBottom: 16,
  },
});
