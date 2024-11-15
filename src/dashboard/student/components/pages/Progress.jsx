import React from 'react';
import { FiTrendingUp, FiAward, FiClock, FiCheckCircle, FiBarChart2 } from 'react-icons/fi';

function Progress() {
  // Sample progress data (replace with API call)
  const progressData = {
    completedQuizzes: 12,
    totalQuizzes: 20,
    averageScore: 85,
    totalPoints: 960,
    recentQuizzes: [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        score: 90,
        date: "2024-02-20",
        status: "passed"
      },
      {
        id: 2,
        title: "React Basics",
        score: 75,
        date: "2024-02-18",
        status: "passed"
      },
       {
        id: 3,
        title: "Node.js Basics",
        score: 75,
        date: "2024-02-18",
        status: "passed"
       }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FiCheckCircle}
          title="Completed Quizzes"
          value={`${progressData.completedQuizzes}/${progressData.totalQuizzes}`}
          color="blue"
        />
        <StatCard 
          icon={FiBarChart2}
          title="Average Score"
          value={`${progressData.averageScore}%`}
          color="green"
        />
        <StatCard 
          icon={FiAward}
          title="Total Points"
          value={progressData.totalPoints}
          color="yellow"
        />
        <StatCard 
          icon={FiTrendingUp}
          title="Current Streak"
          value="5 days"
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {progressData.recentQuizzes.map((quiz) => (
            <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  quiz.status === 'passed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {quiz.status === 'passed' ? <FiCheckCircle /> : <FiClock />}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{quiz.title}</h4>
                  <p className="text-xs text-gray-500">{new Date(quiz.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  quiz.score >= 80 ? 'text-green-600' : 
                  quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {quiz.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Over Time</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          {/* Add your preferred chart library here */}
          <p>Chart placeholder - Add your preferred chart library</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default Progress; 