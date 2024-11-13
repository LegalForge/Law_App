import React from 'react';
import { FiAward, FiClock, FiCheckCircle, FiXCircle, FiBarChart2, FiArrowRight, FiRefreshCw } from 'react-icons/fi';

function QuizResults({ results, quiz, onRetakeQuiz, onBackToQuizzes }) {
  const {
    score,
    timeSpent,
    totalQuestions,
    correctAnswers,
    selectedAnswers // Add this to QuizSession state
  } = results;

  // Calculate performance metrics
  const timePerQuestion = Math.round(timeSpent / totalQuestions);
  const accuracy = (correctAnswers / totalQuestions) * 100;
  
  // Determine performance message
  const getPerformanceMessage = () => {
    if (score >= 90) return "Outstanding! You've mastered this topic! 🎉";
    if (score >= 80) return "Great job! You're doing very well! 🌟";
    if (score >= 70) return "Good work! Keep practicing to improve! 👍";
    return "Keep learning! You'll do better next time! 💪";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
          score >= 70 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
        }`}>
          <span className="text-3xl font-bold">{score}%</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">{getPerformanceMessage()}</p>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiCheckCircle}
          title="Correct Answers"
          value={`${correctAnswers}/${totalQuestions}`}
          subtext="Questions"
          color="green"
        />
        <StatCard
          icon={FiBarChart2}
          title="Accuracy"
          value={`${Math.round(accuracy)}%`}
          subtext="Overall"
          color="blue"
        />
        <StatCard
          icon={FiClock}
          title="Time Spent"
          value={`${Math.floor(timeSpent / 60)}:${(timeSpent % 60).toString().padStart(2, '0')}`}
          subtext="Minutes"
          color="yellow"
        />
        <StatCard
          icon={FiAward}
          title="Points Earned"
          value={Math.round((score / 100) * quiz.points)}
          subtext={`of ${quiz.points}`}
          color="purple"
        />
      </div>

      {/* Detailed Review */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Question Review</h3>
        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
              <div className="flex items-start space-x-3">
                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedAnswers[question.id] === question.correctAnswer
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {selectedAnswers[question.id] === question.correctAnswer 
                    ? <FiCheckCircle className="w-4 h-4" />
                    : <FiXCircle className="w-4 h-4" />
                  }
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 font-medium mb-2">
                    Question {index + 1}: {question.question}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg ${
                          optIndex === question.correctAnswer
                            ? 'bg-green-50 border border-green-200'
                            : optIndex === selectedAnswers[question.id]
                              ? 'bg-red-50 border border-red-200'
                              : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={
                            optIndex === question.correctAnswer
                              ? 'text-green-700'
                              : optIndex === selectedAnswers[question.id]
                                ? 'text-red-700'
                                : 'text-gray-700'
                          }>
                            {option}
                          </span>
                          {optIndex === question.correctAnswer && (
                            <span className="text-green-600 text-sm font-medium">Correct Answer</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-4">
        <button
          onClick={onBackToQuizzes}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Back to Quizzes</span>
          <FiArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onRetakeQuiz}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>Retake Quiz</span>
        </button>
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

export default QuizResults; 