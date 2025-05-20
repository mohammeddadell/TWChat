import React from 'react';
import {View} from 'react-native';
import AppNavigator from './src/navigation/MainNavigator';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider, useTheme} from './src/theme/ThemeProvider';
import {AuthProvider} from './src/context/AuthContext';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/components/common/ToastConfig';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';

function AppContent(): React.JSX.Element {
  const {theme} = useTheme();
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <AppNavigator />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
            <Toast config={toastConfig} />
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
