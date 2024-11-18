import React, { useState } from 'react';
import StudentSidebar from './components/StudentSidebar';
import StudentNavbar from './components/StudentNavbar';
import AvailableContent from './pages/AvailableContent';
// import QuizSession from './pages/QuizSession';
// import Progress from './pages/Progress';
// import QuizSection from './components/QuizSection';
// import ResultSection from './components/ResultSection';
// import Profile from './pages/Profile';
// import HelpSupport from '../student/pages/HelpSupport';
// import HelpSupport from './pages/HelpSupport';
// import Achievements from './pages/Achievements';
// import Dashboard from './pages/Dashboard';
import Dashboard from '../student/pages/Dashboard';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [activeCase, setActiveCase] = useState(null);

  const handleStartQuiz = (quizId) => {
    setActiveQuiz(quizId);
  };

  const handleStartCase = (caseId) => {
    setActiveCase(caseId);
  };

  const handleQuizComplete = (results) => {
    // Add to quiz history
    setQuizHistory(prev => [...prev, {
      id: activeQuiz,
      date: new Date(),
      ...results
    }]);
    
    // Reset quiz state
    setActiveQuiz(null);
    
    // Navigate to dashboard or progress page
    setActiveTab('progress');
  };

  const renderContent = () => {
    if (activeQuiz) {
      return <QuizSession quizId={activeQuiz} onComplete={handleQuizComplete} />;
    }

    if (activeCase) {
      return <CaseSession caseId={activeCase} onComplete={handleCaseComplete} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'quizzes':
        return <AvailableContent 
          onStartQuiz={handleStartQuiz} 
          onStartCase={handleStartCase}
        />;
      case 'progress':
        return <Progress />;
      case 'profile':
        return <Profile />;
      case 'achievements':
        return <Achievements />;
      case 'help':
        return <HelpSupport />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1">
        <StudentNavbar 
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
        />

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard; 