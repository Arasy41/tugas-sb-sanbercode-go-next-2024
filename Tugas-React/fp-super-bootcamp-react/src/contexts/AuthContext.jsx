import React, { createContext, useState, useEffect } from 'react';
import Api from '../service/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [changePasswordForm, setChangePasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    try {
      setLoading(true);
      const response = await Api.post('/api/register', {
        email,
        username,
        password,
      });
      return response.data.message;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      throw new Error('New passwords do not match.');
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        await Api.put('/api/change-password', { oldPassword, newPassword }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return 'Password changed successfully';
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
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

  return (
    <AuthContext.Provider value={{ user, login, loginForm, setLoginForm, register, registerForm, setRegisterForm, logout, changePassword, changePasswordForm, setChangePasswordForm, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
