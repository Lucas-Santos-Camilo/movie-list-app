import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isTokenValid = decodedToken.exp > Date.now() / 1000;
        setIsAuthenticated(isTokenValid);
        setUserToken(token);
      } catch (e) {
        console.error("Token decoding error:", e); 
        setIsAuthenticated(false);
        setUserToken(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserToken(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('access_token', token);
    try {
      const decodedToken = jwtDecode(token);
      const isTokenValid = decodedToken.exp > Date.now() / 1000;
      setIsAuthenticated(isTokenValid);
      setUserToken(token);
    } catch (e) {
      console.error("Token decoding error on login:", e); 
      setIsAuthenticated(false);
      setUserToken(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
