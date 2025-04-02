import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Home from '../pages/Home';
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
import Dashboard2 from '../pages/Dashboard2';

const App = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  const userRole = localStorage.getItem('role'); // "admin" or "user"

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          {!isLoggedIn ? (
            <>
              {/* <Route path="/" element={<UserLogin />} /> */}
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path ="/hero" element={<HeroPage/>}/>
              <Route path ="/" element={<HeroPage/>}/>
              
            </>
          ) : (
            <>
            <Route path ="/hero" element={<HeroPage/>} />
            <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

          {/* General Protected Routes (For All Logged-in Users) */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/books" element={<Book />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard2" element={<Dashboard2 />} />
          </Route>

          {/* Admin Protected Routes (Only for Admins) */}
          {userRole === 'admin' && (
            <Route element={<AdminRoutes />}>
              <Route path="/" element={<AdminPanel />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          )}

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
