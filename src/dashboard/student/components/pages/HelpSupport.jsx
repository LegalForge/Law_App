import React, { useState } from 'react';
import { FiHelpCircle, FiMessageSquare, FiBook, FiSearch, FiChevronRight, FiChevronDown } from 'react-icons/fi';

function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const faqs = {
    'Getting Started': [
      {
        question: "How do I start a quiz?",
        answer: "Navigate to the 'Available Quizzes' section, choose a quiz, and click the 'Start Quiz' button."
      },
      {
        question: "Can I pause a quiz?",
        answer: "No, once started, quizzes must be completed. However, your progress is automatically saved."
      }
    ],
    'Technical Issues': [
      {
        question: "What should I do if my quiz freezes?",
        answer: "Refresh the page. Your progress is automatically saved every few seconds."
      },
      {
        question: "How do I report a bug?",
        answer: "Navigate to the 'Support' section, select 'Report a Bug', and follow the instructions to submit your bug report."
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <FiSearch className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for help"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
        />
      </div>

      {/* Categories */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex items-center space-x-2 ${
            activeCategory === null ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          <FiHelpCircle className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-500">Getting Started</span>
        </button>
        <button
          onClick={() => setActiveCategory('Technical Issues')}
          className={`flex items-center space-x-2 ${
            activeCategory === 'Technical Issues' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          <FiMessageSquare className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-500">Technical Issues</span>
        </button>
      </div>

      {/* FAQs */}
      {activeCategory ? (
        <div className="space-y-6">
          {faqs[activeCategory].map((faq, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">{faq.question}</h4>
                <p className="text-sm text-gray-500">{faq.answer}</p>
              </div>
              <button className="text-blue-500">
                {activeCategory === 'Technical Issues' ? <FiChevronDown className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Please select a category to view FAQs.</p>
      )}
    </div>
  );
}

export default HelpSupport; 