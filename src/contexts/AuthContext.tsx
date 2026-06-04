import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  businessName: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (businessName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser =
      localStorage.getItem('flowpay_user') ||
      sessionStorage.getItem('flowpay_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('flowpay_user');
        sessionStorage.removeItem('flowpay_user');
      }
    }
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      businessName: 'Demo Business',
      token: Math.random().toString(36).substring(7),
    };

    setUser(mockUser);
    
    if (rememberMe) {
      localStorage.setItem('flowpay_user', JSON.stringify(mockUser));
    } else {
      sessionStorage.setItem('flowpay_user', JSON.stringify(mockUser));
    }

    navigate('/dashboard');
  };

  const signup = async (businessName: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      businessName,
      token: Math.random().toString(36).substring(7),
    };

    setUser(mockUser);
    localStorage.setItem('flowpay_user', JSON.stringify(mockUser));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flowpay_user');
    sessionStorage.removeItem('flowpay_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
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
