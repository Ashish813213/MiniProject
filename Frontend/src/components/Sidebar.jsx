import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Library Dashboard</h1>
      <ul>
        <li className="mb-4">
          <Link to="/books" className="hover:text-blue-300">
            Books
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="hover:text-blue-300">
            Users
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/analytics" className="hover:text-blue-300">
            Analytics
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; 