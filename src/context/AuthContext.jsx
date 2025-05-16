// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwt_decode(token);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem("token");
            setUser(null);
          } else {
            setUser(decoded);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      setUser(decoded);
    } catch (error) {
      console.error("Login error:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Provide loading state to prevent flash of unauthorized content
  if (loading) {
    return null; // or return a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
