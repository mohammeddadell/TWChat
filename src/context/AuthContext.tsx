import React, {createContext, useState, useContext, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  userID: string;
  login: (token: string, userID: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState('');
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await EncryptedStorage.getItem('user_token');
      const userID = await EncryptedStorage.getItem('user_id');
      setIsAuthenticated(session !== undefined);
      setUserID(userID || '');
    } catch (error) {
      console.log('Auth check error:', error);
      setIsAuthenticated(false);
    }
  };

  const login = async (token: string, userID: string) => {
    try {
      await EncryptedStorage.setItem('user_token', token);
      await EncryptedStorage.setItem('user_id', userID);
      setIsAuthenticated(true);
      setUserID(userID);
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await EncryptedStorage.removeItem('user_token');
      await EncryptedStorage.removeItem('user_id');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, userID}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
