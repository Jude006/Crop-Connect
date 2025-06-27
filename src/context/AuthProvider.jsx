// src/context/AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { registerUser, loginUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(userData);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("role", response.user.role);
      localStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      setLoading(false);

      if (response.user.role === "farmer") {
        navigate("/farmer-dashboard/overview");
      } else {
        navigate("/buyer-dashboard/overview");
      }

      return response;
    } catch (err) {
      setError(err.message || "Registration failed");
      setLoading(false);
      throw err;
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("role", response.user.role);
      localStorage.setItem("user", JSON.stringify(response.user));

      setUser(response.user);
      setLoading(false);

      if (response.user.role === "farmer") {
        navigate("/farmer-dashboard/overview");
      } else {
        navigate("/buyer-dashboard/overview");
      }
      toast.success("Welcome back ");
      return response;
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth/login");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  const updateUser = (updatedUserData) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...updatedUserData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
