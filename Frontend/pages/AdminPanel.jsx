import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../src/components/Sidebar';
import Header from '../src/components/Header';

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen min-w-100% bg-gray-100">
      <Sidebar />
      <div className="flex-1" style = {{width:"100%"}}>
        <Header />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/books" className="bg-indigo-600 p-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold mb-2">Manage Books</h2>
              <p>View, add, edit, and delete books in the library.</p>
            </Link>
            <Link to="/users" className="bg-indigo-600  p-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold mb-2">Manage Users</h2>
              <p>View, add, edit, and delete users in the library.</p>
            </Link>
            <Link to="/analytics" className="bg-indigo-600  p-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
              <h2 className="text-2xl font-bold mb-2">Analytics</h2>
              <p>View library analytics and reports.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;