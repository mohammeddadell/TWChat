import React from 'react';
import {useTheme} from 'react-native-paper';
import {BaseToast} from 'react-native-toast-message';

const SuccessToast = (props: any) => {
  //const theme = useTheme();
  return (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        backgroundColor: 'white',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        color: 'black',
      }}
    />
  );
};

const ErrorToast = (props: any) => {
  const theme = useTheme();
  return (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: theme.colors.error,
        backgroundColor: theme.colors.error,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        color: theme.colors.onError,
      }}
    />
  );
};

const InfoToast = (props: any) => {
  const theme = useTheme();
  return (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        color: theme.colors.onPrimary,
      }}
    />
  );
};

export const toastConfig = {
  success: SuccessToast,
  error: ErrorToast,
  info: InfoToast,
};
