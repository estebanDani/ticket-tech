import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { CreateUserDto, User } from '@/types';
import { AuthService } from '@/services/auth.service';

interface AuthContextType {
    user: User | null;
    loading: boolean;

    login: (email: string, password: string) => Promise<void>;
    register:(user: CreateUserDto, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [user, setUserState] = useState<User | null>(null);
    const [loading, setLoadingState] = useState<boolean>(true);

    useEffect(() => {
        AuthService.getCurrentUser()
            .then((currentUser) => {
                setUserState(currentUser);
                setLoadingState(false);
            })
            .catch(() => {
                setUserState(null);
                setLoadingState(false);
            });
    },[])

    const login = async (email: string, password: string) => {
        setLoadingState(true);
        try {
            const loggedUser = await AuthService.login(email, password);
            setUserState(loggedUser);
        } finally {
            setLoadingState(false);
        }
    }
    
    const register = async (user: CreateUserDto, password: string) => {
        setLoadingState(true);
        try {
            const registeredUser = await AuthService.register(user, password);
            setUserState(registeredUser);
        } finally {
            setLoadingState(false);
        }
    }
    
    const logout = async () => {
        setLoadingState(true);
        try {
            await AuthService.logout();
            setUserState(null);
        } finally {
            setLoadingState(false);
        }
    }   

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('auseAuth must be used within AuthProvider');
  }
  return context;
}