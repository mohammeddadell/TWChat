import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

interface ChatHeaderProps {
  partnerName: string;
  partnerId: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({partnerName}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Avatar.Text
        size={32}
        label={partnerName.substring(0, 2).toUpperCase()}
        style={styles.avatar}
      />
      <Text style={[styles.name, {color: colors.text}]}>{partnerName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  avatar: {
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});
