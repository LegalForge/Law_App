import React from 'react';
import { FiMenu, FiBell,FiSettings,FiLogOut } from 'react-icons/fi';

import { useState } from 'react';

function StudentNavbar({ isSidebarOpen, setSidebarOpen, activeTab }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-blue-600 ml-2 lg:ml-0">
              {activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Dashboard'}
              
            </h1>
          </div>
          
          <NavbarActions />
        </div>
      </div>
    </nav>
  );
}

function NavbarActions() {
  return (
    <div className="flex items-center space-x-4">
      <NotificationBell />
      <UserMenu />
    </div>
  );
}

function NotificationBell() {
  return (
    <button className="p-2 rounded-full hover:bg-gray-100 relative">
      <FiBell className="w-6 h-6 text-gray-600" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  );
}

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center space-x-3">
      <div className="hidden md:block text-right">
        <p className="text-sm font-medium text-gray-900">John Doe</p>
        <p className="text-xs text-gray-500">Level 300</p>
      </div>
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          JD
        </button>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0" 
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <a
                  href="#settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <FiSettings className="w-4 h-4 mr-2" />
                    Settings
                  </div>
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center text-blue-500">
                    <FiLogOut className="w-4 h-4 mr-2 text-blue-500" />
                    Logout
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentNavbar; 