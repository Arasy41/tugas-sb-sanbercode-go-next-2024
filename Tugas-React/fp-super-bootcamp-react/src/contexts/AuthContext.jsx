import React, { createContext, useState, useEffect } from 'react';
import Api from '../service/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data if token exists
    const token = localStorage.getItem('token');
    if (token) {
      Api.get('/api/detail-user').then(response => setUser(response.data));
    }
  }, []);

  const login = async (credentials) => {
    const response = await Api.post('/api/login', credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
