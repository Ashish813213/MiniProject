import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  const userRole = localStorage.getItem('role');

  // If not logged in or not an admin, redirect to login
  if (!isLoggedIn || userRole !== 'admin') {
    return <Navigate to="/login" />;
  }

  // If logged in and is admin, render the child routes
  return <Outlet />;
};

export default AdminRoutes;