
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UsersApi } from '@/services/usersApi';
import { User, UserRegistration } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserRegistration) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    
    try {
      const authenticatedUser = await UsersApi.authenticateUser(email, password);
      if (!authenticatedUser) {
        throw new Error('Credenciais inválidas');
      }
      setUser(authenticatedUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: UserRegistration) => {
    console.log('Register attempt:', userData);
    
    try {
      // Verificar se email já existe
      const existingUser = await UsersApi.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }
      
      const newUser = await UsersApi.createUser(userData);
      setUser(newUser);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('Usuário não logado');
    }
    
    try {
      const updatedUser = await UsersApi.updateUser(user.id, updates);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
