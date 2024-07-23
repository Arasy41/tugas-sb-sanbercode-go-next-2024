import React, { createContext, useState, useEffect } from 'react';
import Api from '../service/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Api.get('/profile/me')
        .then((response) => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  const login = async (credentials) => {
    const response = await Api.post('/api/login', credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const register = async (data) => {
    const response = await Api.post('/api/register', data);
    navigate.name('/login');
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };