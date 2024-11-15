import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

function ResultSection({ score }) {
  const passed = score >= 70;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
        ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {passed ? <FiCheckCircle className="w-8 h-8" /> : <FiXCircle className="w-8 h-8" />}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Quiz Completed!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Your score: {score.toFixed(1)}%
      </p>

      <div className={`text-lg font-medium mb-8
        ${passed ? 'text-green-600' : 'text-red-600'}`}>
        {passed ? 'Congratulations! You passed!' : 'Sorry, you did not pass.'}
      </div>

      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Take Another Quiz
      </button>
    </div>
  );
}

export default ResultSection; 