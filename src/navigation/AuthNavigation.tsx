import React, {lazy, Suspense} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native-paper';

const Stack = createStackNavigator();

// Lazy load LoginScreen
const LoginScreen = lazy(() => import('../screens/auth/LoginScreen'));

// Loading component
const LoadingScreen = () => (
  <ActivityIndicator size="large" style={{flex: 1}} />
);

const AuthNavigatiion = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" options={{headerShown: false}}>
      {() => (
        <Suspense fallback={<LoadingScreen />}>
          <LoginScreen />
        </Suspense>
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthNavigatiion;
