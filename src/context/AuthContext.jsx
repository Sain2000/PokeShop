import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('pokeshop_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('pokeshop_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    const userWithId = {
      ...userData,
      id: Date.now(),
      loginTime: new Date().toISOString()
    };
    setUser(userWithId);
    localStorage.setItem('pokeshop_user', JSON.stringify(userWithId));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pokeshop_user');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};