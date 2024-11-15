import React, { useState } from 'react';
import {
  FiBell,
  FiSearch,
  FiMessageSquare,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    
    // Show the toast notification
    toast.success('Logged out successfully');

    // Delay the redirection to allow the toast to show
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000); // Redirect after 1 second
  };

  const notifications = [
    {
      id: 1,
      type: 'quiz',
      message: 'New quiz submission from John Doe',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'alert',
      message: 'System update scheduled for tomorrow',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'message',
      message: 'New message from teaching staff',
      time: '2 hours ago'
    }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Search Bar */}
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-400 hover:text-gray-500 relative"
              >
                <FiBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                      View all notifications
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <FiMessageSquare className="h-6 w-6" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    AD
                  </div>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <FiChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </button>

              {/* Profile Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FiSettings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FiHelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </a>
                  <div className="border-t border-gray-200"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FiLogOut className="h-4 w-4" />
                    <span onClick={handleLogout}>Sign out</span>
                    {/* <span>Sign out</span> */}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar; 