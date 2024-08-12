import React from 'react';
import { Navigate } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const Protected = ({ element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default Protected;
