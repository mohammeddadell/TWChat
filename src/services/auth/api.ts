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

export const getUsers = async (): Promise<Pick<User, 'id' | 'name'>[]> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve([{id: '2', name: 'I am a bot'}, {id: '3', name: 'User3'}, {id: '4', name: 'User4'}]);
    }, 1000);
  });
};
