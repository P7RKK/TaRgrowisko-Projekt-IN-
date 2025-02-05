import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ isLoggedIn, userInfo, children }) => {
  if (!isLoggedIn || userInfo?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute;
