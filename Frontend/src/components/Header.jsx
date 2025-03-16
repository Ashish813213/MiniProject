import React from 'react';

const Header = () => {
  return (
    <div className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Library Management System</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
};

export default Header;