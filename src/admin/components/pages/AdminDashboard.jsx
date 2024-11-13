import React from 'react';
import { 
  FiUsers, 
  FiBookOpen, 
  FiAward, 
  FiTrendingUp, 
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiBarChart2,
  FiUpload,
  FiPlus
} from 'react-icons/fi';

function AdminDashboard() {
  // Sample data - replace with actual API calls
  const dashboardData = {
    stats: {
      totalStudents: 256,
      activeQuizzes: 15,
      completedQuizzes: 1250,
      averageScore: 82
    },
    recentActivity: [
      {
        id: 1,
        student: "John Doe",
        action: "Completed Quiz",
        quiz: "JavaScript Fundamentals",
        score: 90,
        time: "2 hours ago"
      },
      {
        id: 2,
        student: "Jane Smith",
        action: "Started Quiz",
        quiz: "React Basics",
        time: "4 hours ago"
      }
    ],
    topPerformers: [
      {
        id: 1,
        name: "Alice Johnson",
        score: 95,
        quizzesTaken: 12,
        streak: 5
      },
      {
        id: 2,
        name: "Bob Wilson",
        score: 92,
        quizzesTaken: 10,
        streak: 3
      }
    ],
    quizStats: [
      { name: "JavaScript", attempts: 150, avgScore: 85 },
      { name: "React", attempts: 120, avgScore: 78 },
      { name: "Node.js", attempts: 90, avgScore: 82 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600 mt-1">Overview and quick actions</p>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <FiUpload className="w-4 h-4" />
              <span>Upload Content</span>
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <FiPlus className="w-4 h-4" />
              <span>Create Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiUsers}
          title="Total Students"
          value={dashboardData.stats.totalStudents}
          trend="+12% this month"
          color="blue"
        />
        <StatCard
          icon={FiBookOpen}
          title="Active Quizzes"
          value={dashboardData.stats.activeQuizzes}
          trend="2 new this week"
          color="green"
        />
        <StatCard
          icon={FiCheckCircle}
          title="Completed Quizzes"
          value={dashboardData.stats.completedQuizzes}
          trend="+85 this week"
          color="purple"
        />
        <StatCard
          icon={FiBarChart2}
          title="Average Score"
          value={`${dashboardData.stats.averageScore}%`}
          trend="+3% improvement"
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  activity.action === 'Completed Quiz' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {activity.action === 'Completed Quiz' ? 
                    <FiCheckCircle className="w-5 h-5" /> : 
                    <FiClock className="w-5 h-5" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-900">{activity.student}</h4>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {activity.action} - {activity.quiz}
                    {activity.score && ` (Score: ${activity.score}%)`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {dashboardData.topPerformers.map((student) => (
              <div key={student.id} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {student.quizzesTaken} quizzes completed
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-blue-600">
                      {student.score}%
                    </span>
                    <p className="text-sm text-gray-500">
                      {student.streak} day streak
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quiz Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardData.quizStats.map((quiz, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">{quiz.name}</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Attempts</span>
                    <span>{quiz.attempts}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(quiz.attempts / 200) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Avg. Score</span>
                    <span>{quiz.avgScore}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${quiz.avgScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, trend, color }) {
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
          <p className="text-sm text-green-600">{trend}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 