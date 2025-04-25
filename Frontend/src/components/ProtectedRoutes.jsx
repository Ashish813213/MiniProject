import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    const role = window.localStorage.getItem('role'); // "admin" or "user"
  return isLoggedIn === "true" && role ==="user" ? <Outlet />: <Navigate to="/"/>
}

export default ProtectedRoutes
