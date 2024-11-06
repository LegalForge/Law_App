import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi'; // Make sure to install react-icons

function QuestionsList({ questions, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Question Bank</h2>
      <div className="space-y-6">
        {questions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No questions added yet</p>
            <p className="text-gray-400 text-sm mt-2">Questions you create will appear here</p>
          </div>
        ) : (
          questions.map((question, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg text-gray-900">
                  Question {index + 1}
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEdit?.(index)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete?.(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md mb-4">
                <p className="text-gray-700">{question.text}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`px-4 py-3 rounded-md flex items-center space-x-2
                      ${optIndex === question.correctAnswer
                        ? 'bg-green-100 border border-green-200 text-green-800'
                        : 'bg-gray-100 border border-gray-200 text-gray-800'
                      }`}
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 text-sm">
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {optIndex === question.correctAnswer && (
                      <span className="text-green-600 text-sm font-medium">
                        Correct
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default QuestionsList; 