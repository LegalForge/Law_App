import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('questions');

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (index) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
      />
      
      <div className="flex-1">
        <Navbar 
          isSidebarOpen={isSidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        
        <MainContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          questions={questions}
          handleAddQuestion={handleAddQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </div>
    </div>
  );
}

export default AdminDashboard; 