import React from 'react';
import { 
  FiHome, 
  FiBook, 
  FiClock, 
  FiAward, 
  FiUser, 
  FiHelpCircle,
  FiLogOut 
} from 'react-icons/fi';

function StudentSidebar({ activeTab, setActiveTab, isSidebarOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'quizzes', label: 'Available Quizzes', icon: FiBook },
    { id: 'progress', label: 'My Progress', icon: FiClock },
    { id: 'achievements', label: 'Achievements', icon: FiAward },
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'help', label: 'Help & Support', icon: FiHelpCircle },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
    >
      <div className="h-full flex flex-col">
        <SidebarProfile />
        <SidebarNavigation menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
        <SidebarProgress />
        <SidebarLogout />
      </div>
    </aside>
  );
}

function SidebarProfile() {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
          JD
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">John Doe</h2>
          <p className="text-xs text-gray-500">Student ID: ST12345</p>
        </div>
      </div>
    </div>
  );
}

function SidebarNavigation({ menuItems, activeTab, setActiveTab }) {
  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
            ${activeTab === item.id 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function SidebarProgress() {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Progress</h3>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full" 
            style={{ width: '60%' }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">6 of 10 quizzes completed</p>
      </div>
    </div>
  );
}

function SidebarLogout() {
  return (
    <div className="p-4 border-t border-gray-200">
      <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-600 hover:bg-red-50 transition-colors duration-200">
        <FiLogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default StudentSidebar; 