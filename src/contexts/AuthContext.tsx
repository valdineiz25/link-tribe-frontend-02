
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  state: string;
  city: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
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
    // Simulação de login - em produção, fazer call para API
    console.log('Login attempt:', { email, password });
    
    // Simulando usuário logado
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: email,
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999',
      state: 'SP',
      city: 'São Paulo'
    };
    
    setUser(mockUser);
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // Simulação de registro - em produção, fazer call para API
    console.log('Register attempt:', userData);
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      cpf: userData.cpf,
      phone: userData.phone,
      state: userData.state,
      city: userData.city
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
