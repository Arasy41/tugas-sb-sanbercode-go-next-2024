import React, { createContext, useState, useEffect } from 'react';
import Api from '../service/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await Api.get('/api/detail-user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await Api.post('/api/login', { username, password });
      const { token } = response.data;
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const responseUser = await Api.get('/api/profile/me');
      setUser(responseUser.data.data);
      localStorage.setItem('token', token); 
      window.location.href = '/';
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await Api.put('/api/profile', profileData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await Api.put('/api/change-password', passwordData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;