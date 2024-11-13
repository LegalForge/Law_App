import React, { useState } from 'react';

function QuestionForm({ onSubmit }) {
  const [question, setQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(question);
    setQuestion({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };
//todo
//admin add cases and quizes
//usser
//get all cases and quizes
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

      <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title:
            </label>
            <input
              type="text"
              
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text:
          </label>
          <textarea
            value={question.text}
            onChange={(e) => setQuestion({...question, text: e.target.value})}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
        </div>
        
        {question.options.map((option, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Option {index + 1}:
            </label>
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[index] = e.target.value;
                setQuestion({...question, options: newOptions});
              }}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correct Answer:
          </label>
          <select
            value={question.correctAnswer}
            onChange={(e) => setQuestion({...question, correctAnswer: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {question.options.map((_, index) => (
              <option key={index} value={index}>Option {index + 1}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Add Question
        </button>
      </form>
    </div>
  );
}

export default QuestionForm; 