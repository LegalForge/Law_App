import React, { useState } from 'react';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboardContent from './components/pages/AdminDashboard';
import ContentManagement from './components/pages/ContentManagement';
import QuizManagement from './components/pages/QuizManagement';
import CourseManagement from './components/pages/CourseManagement';
import { FiHome, FiBook, FiFileText, FiSettings, FiHelpCircle, FiList } from 'react-icons/fi';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: FiHome },
    // { id: 'courses', name: 'Course Management', icon: FiBook },
    // { id: 'content', name: 'Content Management', icon: FiFileText },
    { id: 'quizzes', name: 'Quiz Management', icon: FiList },
    { id: 'settings', name: 'Settings', icon: FiSettings },
    { id: 'help', name: 'Help & Support', icon: FiHelpCircle }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardContent />;
      case 'courses':
        return <CourseManagement />;
      case 'content':
        return <ContentManagement />;
      case 'quizzes':
        return <QuizManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
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