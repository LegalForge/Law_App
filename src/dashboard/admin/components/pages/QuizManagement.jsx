import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

function QuizManagement() {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      topic: "JavaScript",
      questions: 15,
      duration: 30,
      difficulty: "Beginner"
    }
  ]);

  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: null,
    explanation: ""
  });

  const handleAddQuestion = () => {
    // Add question logic here
    setIsAddingQuestion(false);
    setQuestionForm({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: null,
      explanation: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quiz Management</h2>
            <p className="text-gray-600 mt-1">Create and manage quizzes</p>
          </div>
          <button
            onClick={() => setIsAddingQuestion(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add New Quiz</span>
          </button>
        </div>
      </div>

      {/* Quiz List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Available Quizzes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{quiz.title}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">
                      {quiz.questions} Questions
                    </span>
                    <span className="text-sm text-gray-500">
                      {quiz.duration} Minutes
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentQuiz(quiz)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Edit Questions
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-500">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question Form Modal */}
      {isAddingQuestion && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Question</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <textarea
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                {questionForm.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...questionForm.options];
                        newOptions[index] = e.target.value;
                        setQuestionForm({ ...questionForm, options: newOptions });
                      }}
                      className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder={`Option ${index + 1}`}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={questionForm.correctAnswer === index}
                      onChange={() => setQuestionForm({ ...questionForm, correctAnswer: index })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Explanation
                </label>
                <textarea
                  value={questionForm.explanation}
                  onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FiCheck className="w-5 h-5" />
                  <span>Add Question</span>
                </button>
                <button
                  onClick={() => setIsAddingQuestion(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  <FiX className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizManagement; 