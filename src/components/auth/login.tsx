import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema, LoginFormData} from '../../validations/authSchema';
import Toast from 'react-native-toast-message';

interface LoginProps {
  onSubmit: (data: LoginFormData) => Promise<{success: boolean}>;
}

export const Login = ({onSubmit}: LoginProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'test@example.com',
      password: 'password123',
    },
  });

  useEffect(() => {
    if (errorMessage) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setErrorMessage(null);
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, fadeAnim]);

  const handleFormSubmit = useCallback(
    async (data: LoginFormData) => {
      setLoading(true);
      try {
        const result = await onSubmit(data);
        if (result?.success) {
          Toast.show({
            text1: 'Login successful',
            type: 'success',
            position: 'bottom',
            visibilityTime: 3000,
          });
        } else {
          setErrorMessage('Invalid credentials');
        }
      } catch (err) {
        console.error('Login error login component:', err);
        setErrorMessage(
          err instanceof Error ? err.message : 'An unexpected error occurred',
        );
      } finally {
        setLoading(false);
      }
    },
    [onSubmit],
  );

  return (
    <View style={styles.container}>
      <View>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <TextInput
              label="Email"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              style={styles.input}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}}) => (
            <TextInput
              label="Password"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              secureTextEntry
              error={!!errors.password}
              style={styles.input}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Button
          loading={loading}
          mode="contained"
          onPress={handleSubmit(handleFormSubmit)}
          style={styles.button}>
          Login
        </Button>
      </View>
      <View>
        {errorMessage && (
          <Animated.View style={[styles.errorContainer, {opacity: fadeAnim}]}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    position: 'relative',
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    marginTop: 16,
  },
  errorContainer: {
    position: 'absolute',
    top: 28,
    left: 16,
    right: 16,
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcdd2',
    zIndex: 1,
  },
  errorMessage: {
    color: '#c62828',
    fontSize: 14,
  },
});
