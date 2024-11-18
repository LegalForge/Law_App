import React from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';

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
  return (
    <div className="flex items-center space-x-3">
      <div className="hidden md:block text-right">
        <p className="text-sm font-medium text-gray-900">John Doe</p>
        <p className="text-xs text-gray-500">Student</p>
      </div>
      <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
        JD
      </div>
    </div>
  );
}

export default StudentNavbar; 