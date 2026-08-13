import React, { createContext, useState, useContext, useEffect } from 'react';
import client from '../api/client';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setTokenState] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  const setAuth = (token, user) => {
    setTokenState(token);
    setUserState(user);
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const setUser = (updatedUser) => {
    setUserState(updatedUser);
    if (updatedUser) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await client.post('/api/auth/login', { email, password });
      setAuth(res.data.token, res.data.user);
      return true;
    } catch (error) {
      const msg = error.response?.data?.error || 'Unable to connect to server. Please try again.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      await client.post('/api/auth/register', { email, password });
      return true;
    } catch (error) {
      const msg = error.response?.data?.error || 'Unable to connect to server. Please try again.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth(null, null);
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      setAuth(null, null);
    };
    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
