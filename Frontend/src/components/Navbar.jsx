import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  const userRole = localStorage.getItem('role'); // "admin" or "user"

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear auth state
    localStorage.removeItem('role'); // Clear role
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/hero" className="text-white text-2xl font-bold">Library Management</Link>
        <div className="space-x-4">



          {isLoggedIn && userRole === 'user' && (
            <>
              <Link to="/home" className="text-white hover:text-gray-200">Home</Link>
              <Link to="/books" className="text-white hover:text-gray-200">Books</Link>
              <Link to="/cart" className="text-white hover:text-gray-200">Cart</Link>
            </>
          )}
          {isLoggedIn && userRole === 'admin' && (
            <>
              <Link to="/adminpanel" className="text-white hover:text-gray-200">Admin Panel</Link>
              <Link to="/users" className="text-white hover:text-gray-200">Users</Link>
              <Link to="/analytics" className="text-white hover:text-gray-200">Analytics</Link>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <Link to="/hero" className="text-white hover:text-gray-200">Home</Link>
              <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
