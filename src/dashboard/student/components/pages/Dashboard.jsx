import React from 'react';
import { 
  FiBook, 
  FiClock, 
  FiAward, 
  FiTrendingUp, 
  FiCalendar,
  FiCheckCircle,
  FiBarChart2,
  FiAlertCircle
} from 'react-icons/fi';

function Dashboard() {
  // Sample data - replace with actual API calls
  const dashboardData = {
    stats: {
      totalQuizzes: 25,
      completedQuizzes: 18,
      averageScore: 85,
      totalPoints: 1250
    },
    recentActivity: [
      {
        id: 1,
        type: 'quiz',
        title: "JavaScript Fundamentals",
        score: 90,
        date: "2024-02-20",
        status: "completed"
      },
      {
        id: 2,
        type: 'achievement',
        title: "Perfect Score",
        description: "Scored 100% on React Basics",
        date: "2024-02-18"
      },
      {
        id: 3,
        type: 'quiz',
        title: "React Components",
        score: 85,
        date: "2024-02-15",
        status: "completed"
      }
    ],
    upcomingQuizzes: [
      {
        id: 1,
        title: "Advanced JavaScript",
        dueDate: "2024-03-01",
        duration: 30,
        questions: 20,
        difficulty: "Advanced"
      },
      {
        id: 2,
        title: "React Hooks",
        dueDate: "2024-03-03",
        duration: 25,
        questions: 15,
        difficulty: "Intermediate"
      }
    ],
    performanceByTopic: [
      { topic: "JavaScript", score: 85 },
      { topic: "React", score: 90 },
      { topic: "HTML/CSS", score: 95 },
      { topic: "Node.js", score: 80 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, John! 👋</h2>
        <p className="text-gray-600 mt-1">Here's an overview of your learning progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FiBook}
          title="Total Quizzes"
          value={dashboardData.stats.totalQuizzes}
          subtext="All time"
          color="blue"
        />
        <StatCard 
          icon={FiCheckCircle}
          title="Completed"
          value={dashboardData.stats.completedQuizzes}
          subtext={`${Math.round((dashboardData.stats.completedQuizzes / dashboardData.stats.totalQuizzes) * 100)}% completion`}
          color="green"
        />
        <StatCard 
          icon={FiBarChart2}
          title="Average Score"
          value={`${dashboardData.stats.averageScore}%`}
          subtext="Across all quizzes"
          color="yellow"
        />
        <StatCard 
          icon={FiAward}
          title="Total Points"
          value={dashboardData.stats.totalPoints}
          subtext="Keep it up!"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'quiz' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  {activity.type === 'quiz' ? <FiBook className="w-5 h-5" /> : <FiAward className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </div>
                  {activity.type === 'quiz' ? (
                    <p className="text-sm text-gray-600 mt-1">
                      Score: <span className="font-medium">{activity.score}%</span>
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Quizzes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Quizzes</h3>
          <div className="space-y-4">
            {dashboardData.upcomingQuizzes.map((quiz) => (
              <div key={quiz.id} className="p-4 border border-gray-100 rounded-lg hover:border-blue-100 transition-colors duration-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    quiz.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    Due: {new Date(quiz.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiClock className="w-4 h-4 mr-2" />
                    {quiz.duration} mins • {quiz.questions} questions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance by Topic */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance by Topic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData.performanceByTopic.map((topic, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">{topic.topic}</h4>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${topic.score}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{topic.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtext, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{subtext}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 