import React, {useCallback, lazy, Suspense} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import {useTheme} from '../theme/ThemeProvider';
import {useAuth} from '../context/AuthContext';
import {STORAGE_KEY} from '../constants/chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

// Lazy load screens
const DashboardScreen = lazy(() => import('../screens/DashboardScreen'));
const ChatScreen = lazy(() => import('../screens/chat/ChatScreen'));

// Loading component
const LoadingScreen = () => (
  <ActivityIndicator size="large" style={{flex: 1}} />
);

const DashboardNavigatiion = () => {
  const {toggleTheme} = useTheme();
  const {logout} = useAuth();

  const logoutBtn = useCallback(() => {
    return (
      <IconButton
        icon="logout"
        size={24}
        onPress={async () => {
          await AsyncStorage.removeItem(STORAGE_KEY);
          logout();
        }}
      />
    );
  }, [logout]);

  const themeBtn = useCallback(() => {
    return (
      <IconButton icon="theme-light-dark" size={24} onPress={toggleTheme} />
    );
  }, [toggleTheme]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        options={() => ({
          title: 'TWChat',
          headerLeft: () => themeBtn(),
          headerRight: () => logoutBtn(),
        })}>
        {() => (
          <Suspense fallback={<LoadingScreen />}>
            <DashboardScreen />
          </Suspense>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Chat"
        options={() => ({
          title: 'Chat',
        })}>
        {() => (
          <Suspense fallback={<LoadingScreen />}>
            <ChatScreen />
          </Suspense>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default DashboardNavigatiion;
