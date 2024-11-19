import React from 'react'
import { FiLogOut } from 'react-icons/fi';
const SidebarLogout = ({ handleLogout }) => {
    return (
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 hover:bg-red-50 transition-colors duration-200"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    );
  }

export default SidebarLogout
