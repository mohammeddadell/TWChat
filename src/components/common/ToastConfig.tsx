import React from 'react';
import {BaseToast} from 'react-native-toast-message';

const SuccessToast = (props: any) => {
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
  return (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'red',
        backgroundColor: 'white',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        color: 'black',
      }}
      text2Style={{
        fontSize: 12,
        color: 'black',
      }}
    />
  );
};

const InfoToast = (props: any) => {
  return (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'blue',
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

export const toastConfig = {
  success: SuccessToast,
  error: ErrorToast,
  info: InfoToast,
};
