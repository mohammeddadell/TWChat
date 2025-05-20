import { User } from "../../types/auth";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
        resolve({
          status: 'success',
          message: 'Login successful',
          data: {
            token: 'mock-jwt-token-123',
            user: {
            id: '1',
            email: credentials.email,
            name: 'Test User'
            },
          },
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};


