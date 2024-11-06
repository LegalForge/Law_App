import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar({ isSidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>

        <div className="flex flex-row items-end justify-end space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            AU
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar; 