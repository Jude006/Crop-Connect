// src/routes/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ allowedRoles }) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');
  
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoutes;