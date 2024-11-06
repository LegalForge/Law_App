import React, { useState } from 'react';
import StudentSidebar from './components/StudentSidebar';
import StudentNavbar from './components/StudentNavbar';
import QuizSection from './components/QuizSection';
import ResultSection from './components/ResultSection';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

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
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Dashboard content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
                  {/* Add dashboard stats */}
                </div>
                {/* Add more dashboard widgets */}
              </div>
            )}

            {activeTab === 'quizzes' && !quizStarted && !quizCompleted && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Quizzes</h2>
                {/* Add quiz list */}
              </div>
            )}

            {quizStarted && !quizCompleted && (
              <QuizSection 
                onComplete={(finalScore) => {
                  setScore(finalScore);
                  setQuizCompleted(true);
                  setQuizStarted(false);
                }}
              />
            )}

            {quizCompleted && (
              <ResultSection score={score} />
            )}

            {/* Add other tab content */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard; 