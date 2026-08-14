import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/auth/verify`);
          setUser(response.data.user);
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });

      const { token: newToken, user: newUser } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.requiresOtp) {
        return {
          requiresOtp: true,
          email: response.data.email,
          message: response.data.message
        };
      }

      const { token: newToken, user: newUser } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const verifyLoginOtp = async (email, otp) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-login-otp`, {
        email,
        otp
      });

      const { token: newToken, user: newUser } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'OTP verification failed'
      };
    }
  };

  const resendLoginOtp = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/resend-login-otp`, { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to resend OTP'
      };
    }
  };

  const requestPasswordResetOtp = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to request reset OTP'
      };
    }
  };

  const resetPasswordWithOtp = async (email, otp, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        otp,
        newPassword
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password reset failed'
      };
    }
  };

  const toggle2FA = async (twoFactorEnabled) => {
    try {
      const response = await axios.put(`${API_URL}/auth/toggle-2fa`, { twoFactorEnabled });
      setUser((prevUser) => ({
        ...prevUser,
        ...response.data.user
      }));
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update 2-Step Verification setting'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (username) => {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, { username });
      setUser((prevUser) => ({
        ...prevUser,
        ...response.data.user
      }));
      return { success: true, message: response.data.message || 'Profile updated successfully' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile'
      };
    }
  };

  const updatePassword = async (oldPassword, newPassword) => {
    try {
      const response = await axios.put(`${API_URL}/auth/change-password`, {
        oldPassword,
        newPassword
      });
      return { success: true, message: response.data.message || 'Password updated successfully' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update password'
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    verifyLoginOtp,
    resendLoginOtp,
    requestPasswordResetOtp,
    resetPasswordWithOtp,
    toggle2FA,
    logout,
    updateProfile,
    updatePassword,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
