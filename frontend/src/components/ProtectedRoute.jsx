import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza el componente hijo que se le pasó
  return children;
};

export default ProtectedRoute; 