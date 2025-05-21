import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Login} from '../../components/auth/login';
import {login} from '../../services/auth/api';
import {useAuth} from '../../context/AuthContext';
import {IconButton} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
const LoginScreen = () => {
  const {login: authLogin} = useAuth();
  const {colors} = useTheme();

  const handleSubmit = async (data: any) => {
    const result = await login(data);
    if (result?.data?.token) {
      await authLogin(result.data.token, result.data.user.id);
      return {success: true};
    }
    return {success: false};
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <IconButton icon="chat" size={100} iconColor={colors.primary} />
      </View>
      <Login onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
