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
import { toast } from 'react-toastify';
import forage from '../../../assets/images/forage.png';
import SidebarProfile from './sidebar/SidebarProfile';
import SidebarProgress from './sidebar/SidebarProgress';
import SidebarLogout from './sidebar/SidebarLogout';
import SidebarNavigation from './sidebar/SidebarNavigation';

const StudentSidebar = ({ activeTab, setActiveTab, isSidebarOpen, quizProgress }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'quizzes', label: 'Available Quizzes', icon: FiBook },
    // { id: 'progress', label: 'My Progress', icon: FiClock },
    { id: 'achievements', label: 'Achievements', icon: FiAward },
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'help', label: 'Help & Support', icon: FiHelpCircle },
  ];

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');

    // Clear token from React Native WebView if in mobile app
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'CLEAR_TOKEN'
      }));
    }

    // Redirect to login page
    window.location.href = '/login';
    // Show toast notification for logout
    toast.info('Logged out successfully');
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-[45vw]   md:w-[15vw]   bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
      {/* <div className="h-full flex flex-col py-4"> */}
      <div className="h-full flex flex-col py-safe">
        <div className="px-3 flex-1 overflow-y-auto">
          <SidebarProfile />
          <SidebarNavigation menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarProgress quizProgress={quizProgress} />
        </div>
        <div className="px-3 pb-safe">
          <SidebarLogout handleLogout={handleLogout} />
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar;
