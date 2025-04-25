import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Admin from './components/Admin';
import Navbar from './components/Navbar';

import Book from '../pages/Book';
import Cart from '../pages/Cart';
import UserList from './components/Userlist';
import Analytics from './components/Analytics';
import AdminPanel from '../pages/AdminPanel';
import UserLogin from '../pages/UserLogin';
import Dashboard from '../pages/Dashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import AdminRoutes from './components/AdminRoutes';
import HeroPage from '../pages/HeroPage';

const App = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  const role = localStorage.getItem('role'); // "admin" or "user"

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/hero" element={<HeroPage />} />
              <Route path="/" element={<HeroPage />} />
            </>
          ) : (
            <>
              <Route path="/hero" element={<HeroPage />} />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </>
          )}

          {/* General Protected Routes (For All Logged-in Users) */}
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/book" element={<Book />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>

          {/* Admin Protected Routes (Only for Admins) */}
          <Route element={<AdminRoutes />}>
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/books" element={<Book />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<AdminPanel />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
