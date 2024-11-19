import React, { useState } from 'react';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboardContent from './pages/Overview';
import QuizManagement from '../admin/pages/QuizManagement';
import CasesManagement from '../admin/pages/CasesManagement';
import { FiHome, FiBook, FiFileText, FiSettings, FiHelpCircle, FiList, FiFolder } from 'react-icons/fi';
import SettingsManagement from '../admin/pages/SettingsManagement';
import forage from '../../assets/images/forage.png';
import HelpSupport from '../admin/pages/HelpSupport';
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigation = [
    //dashbord === overview
    { id: 'dashboard', name: 'Dashboard', icon: FiHome },
    { id: 'cases', name: 'Cases Management', icon: FiFolder },
    { id: 'quizzes', name: 'Quiz Management', icon: FiList },
    { id: 'settings', name: 'Settings', icon: FiSettings },
    { id: 'help', name: 'Help & Support', icon: FiHelpCircle }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardContent />;
      case 'cases':
        return <CasesManagement />;
      case 'quizzes':
        return <QuizManagement />;
      case 'settings':
        return <SettingsManagement />;
      case 'help':
        return <HelpSupport />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-8 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center justify-center">
            <div className="relative group">
              <img 
                src={forage} 
                alt="Legal Forage" 
                className="w-36 h-28 hover:scale-105 transition-all duration-300 ease-in-out shadow-xl rounded-xl cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
            </div>
          </div>
          <div className="text-center mt-6 space-y-2">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300">
              Admin Panel
            </h2>
            <div className="flex justify-center space-x-1">
              <div className="h-1 w-8 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="h-1 w-8 bg-blue-400 rounded-full animate-pulse delay-100"></div>
              <div className="h-1 w-8 bg-blue-200 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-3 text-gray-600 hover:bg-gray-50 ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard; 