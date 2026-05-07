import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api/client';

export interface User {
  id_user: number;
  nama: string;
  email: string;
  no_hp: string;
  alamat?: string;
  role: string;
  saldo?: { jumlah_saldo: number };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (data: any) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus di dalam AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const fetchUser = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const res = await apiClient.get('/me');
      setUser(res.data);
    } catch {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  useEffect(() => {
    if (token) fetchUser();
    else setUser(null);
  }, [token]);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await apiClient.post('/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (data: any): Promise<User> => {
    const res = await apiClient.post('/register', data);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    apiClient.post('/logout').finally(() => {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    });
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};