import React, {useState, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {IconButton, ProgressBar} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';

interface MessageInputProps {
  onSend: (message: string, imageUri?: string) => Promise<void>;
  waitingForBotResponse: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  waitingForBotResponse,
}) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {colors} = useTheme();

  const handleImagePick = useCallback(() => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
          return;
        }
        if (response.assets && response.assets[0]?.uri) {
          setSelectedImage(response.assets[0].uri);
          // Reset progress when new image is selected
          setUploadProgress(0);
        }
      },
    );
  }, []);

  const mockImageUpload = useCallback(async () => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i / 100);
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
    }
  }, []);

  const handleSend = useCallback(async () => {
    if (message.trim() || selectedImage) {
      setIsSending(true);

      try {
        if (selectedImage) {
          await mockImageUpload();
        }
        await onSend(message.trim(), selectedImage || undefined);

        setMessage('');
        setSelectedImage(null);
        setUploadProgress(0);
      } finally {
        setIsSending(false);
      }
    }
  }, [message, selectedImage, onSend, mockImageUpload]);

  return (
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={{uri: selectedImage}} style={styles.previewImage} />
          <IconButton
            icon="close"
            size={20}
            onPress={() => {
              setSelectedImage(null);
              setUploadProgress(0);
            }}
            style={styles.removeImage}
          />
          {isSending && (
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={uploadProgress}
                color={colors.primary}
                style={styles.progressBar}
              />
            </View>
          )}
        </View>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.attachButton, {backgroundColor: colors.primary}]}
          onPress={handleImagePick}>
          <IconButton icon="image" size={24} iconColor={colors.background} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, {color: colors.text}]}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.text + '80'}
          multiline
          maxLength={1000}
        />
        {isSending ? (
          <ActivityIndicator color={colors.primary} size={24} />
        ) : (
          (message.length > 0 || selectedImage) &&
          !waitingForBotResponse && (
            <TouchableOpacity
              style={[styles.sendButton, {backgroundColor: colors.primary}]}
              onPress={handleSend}
              disabled={(!message.trim() && !selectedImage) || isSending}>
              <IconButton icon="send" size={24} iconColor={colors.background} />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    maxHeight: 100,
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    marginBottom: 8,
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImage: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
});
