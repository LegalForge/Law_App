import React from 'react';
import { 
  FiAward, 
  FiStar, 
//   FiTrophy, 
  FiTarget, 
  FiZap, 
  FiClock, 
  FiAperture
} from 'react-icons/fi';
import { ImTrophy } from "react-icons/im";


function Achievements() {
  const achievementIcons = {
    quickStarter: FiZap,
    perfectScore: FiStar,
    speedDemon: FiAperture,
    quizMaster: ImTrophy,
    consistent: FiTarget
  };

  const achievements = {
    earned: [
      {
        id: 1,
        title: "Quick Starter",
        description: "Complete your first quiz",
        iconType: 'quickStarter',
        earnedDate: "2024-02-15",
        points: 50,
        type: 'bronze'
      },
      {
        id: 2,
        title: "Perfect Score",
        description: "Score 100% on any quiz",
        iconType: 'perfectScore',
        earnedDate: "2024-02-18",
        points: 100,
        type: 'gold'
      },
      {
        id: 3,
        title: "Speed Demon",
        description: "Complete a quiz in under 5 minutes",
        iconType: 'speedDemon',
        earnedDate: "2024-02-20",
        points: 75,
        type: 'silver'
      }
    ],
    inProgress: [
      {
        id: 4,
        title: "Quiz Master",
        description: "Complete 50 quizzes",
        iconType: 'quizMaster',
        progress: 12,
        total: 50,
        points: 200,
        type: 'platinum'
      },
      {
        id: 5,
        title: "Consistent Learner",
        description: "Complete quizzes for 7 days in a row",
        iconType: 'consistent',
        progress: 4,
        total: 7,
        points: 150,
        type: 'gold'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={FiAward}
          title="Total Achievements"
          value={achievements.earned.length}
          subtext={`Out of ${achievements.earned.length + achievements.inProgress.length} possible`}
          color="blue"
        />
        <StatCard 
          icon={FiTarget}
          title="Points Earned"
          value={achievements.earned.reduce((sum, a) => sum + a.points, 0)}
          subtext="From achievements"
          color="green"
        />
        <StatCard 
          icon={FiClock}
          title="In Progress"
          value={achievements.inProgress.length}
          subtext="Almost there!"
          color="yellow"
        />
      </div>

      {/* Earned Achievements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Earned Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.earned.map((achievement) => {
            const AchievementIcon = achievementIcons[achievement.iconType];
            return (
              <div 
                key={achievement.id} 
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200"
              >
                <div className={`absolute top-4 right-4 text-sm px-2 py-1 rounded-full ${
                  achievement.type === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                  achievement.type === 'silver' ? 'bg-gray-100 text-gray-800' :
                  achievement.type === 'bronze' ? 'bg-orange-100 text-orange-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {achievement.type}
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <AchievementIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-blue-600">
                    +{achievement.points} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* In Progress Achievements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">In Progress</h3>
        <div className="space-y-4">
          {achievements.inProgress.map((achievement) => {
            const AchievementIcon = achievementIcons[achievement.iconType];
            return (
              <div 
                key={achievement.id}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <AchievementIcon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    +{achievement.points} pts
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {achievement.progress} / {achievement.total}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtext, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600'
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

export default Achievements; 