import React from 'react';
import { FiClock, FiCheckCircle, FiAward, FiPlay } from 'react-icons/fi';

function AvailableQuizzes({ onStartQuiz }) {
  // Sample quiz data (replace with API call)
  const quizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics",
      duration: 30,
      questions: 10,
      difficulty: "Intermediate",
      points: 100
    },
    {
      id: 2,
      title: "React Basics",
      description: "Understanding React core concepts",
      duration: 25,
      questions: 8,
      difficulty: "Beginner",
      points: 80
    },
    {
        id: 3,
        title: "Node.js Basics",
        description: "Understanding Node.js core concepts",
        duration: 25,
        questions: 8,
        difficulty: "Beginner",
        points: 80
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Available Quizzes</h2>
        <div className="flex space-x-2">
          <select className="border rounded-md px-3 py-2 text-sm text-gray-700">
            <option>All Categories</option>
            <option>JavaScript</option>
            <option>React</option>
            <option>Node.js</option>
          </select>
          <select className="border rounded-md px-3 py-2 text-sm text-gray-700">
            <option>All Difficulties</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              {/* Quiz Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>

              {/* Quiz Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                  <FiClock className="w-4 h-4 mr-2" />
                  <span>{quiz.duration} mins</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FiCheckCircle className="w-4 h-4 mr-2" />
                  <span>{quiz.questions} Questions</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FiAward className="w-4 h-4 mr-2" />
                  <span>{quiz.points} Points</span>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={() => onStartQuiz(quiz.id)}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FiPlay className="w-4 h-4" />
                <span>Start Quiz</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableQuizzes; 