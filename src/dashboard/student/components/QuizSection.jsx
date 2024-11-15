import React, { useState, useEffect } from 'react';
import { FiClock, FiSave } from 'react-icons/fi';
import { saveQuizProgress, loadQuizProgress, clearQuizProgress } from '../utils/quizProgress';

// Sample questions (replace with your actual questions from the admin)
const sampleQuestions = [
  {
    text: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database",
      "A web server"
    ],
    correctAnswer: 0
  },
  // Add more questions...
];

function QuizSection({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [lastSaved, setLastSaved] = useState(null);

  // Load saved progress when component mounts
  useEffect(() => {
    const savedProgress = loadQuizProgress();
    if (savedProgress) {
      const shouldRestore = window.confirm(
        'We found a saved quiz in progress. Would you like to restore it?'
      );
      
      if (shouldRestore) {
        setCurrentQuestion(savedProgress.currentQuestion);
        setAnswers(savedProgress.answers);
        setTimeLeft(savedProgress.timeLeft);
      } else {
        clearQuizProgress();
      }
    }
  }, []);

  // Auto-save progress every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      handleSaveProgress();
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [currentQuestion, answers, timeLeft]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSaveProgress = () => {
    const progress = {
      currentQuestion,
      answers,
      timeLeft,
      timestamp: new Date().toISOString()
    };
    
    saveQuizProgress(progress);
    setLastSaved(new Date().toISOString());
  };

  const handleQuizComplete = () => {
    let score = 0;
    Object.keys(answers).forEach(questionIndex => {
      if (answers[questionIndex] === sampleQuestions[questionIndex].correctAnswer) {
        score++;
      }
    });
    clearQuizProgress(); // Clear progress when quiz is completed
    onComplete((score / sampleQuestions.length) * 100);
  };

  const handleAnswer = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion === sampleQuestions.length - 1) {
      handleQuizComplete();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header with Timer and Save Status */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-gray-600">
          <FiClock className="w-5 h-5 mr-2" />
          <span>{formatTime(timeLeft)}</span>
        </div>
        <div className="flex items-center">
          {lastSaved && (
            <span className="text-sm text-gray-500 mr-4">
              Last saved: {new Date(lastSaved).toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={handleSaveProgress}
            className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            <FiSave className="w-4 h-4" />
            <span>Save Progress</span>
          </button>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Question {currentQuestion + 1} of {sampleQuestions.length}
        </h3>
        <p className="text-gray-700">{sampleQuestions[currentQuestion].text}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {sampleQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              handleAnswer(index);
              handleSaveProgress(); // Save progress when answer is selected
            }}
            className={`w-full text-left p-4 rounded-lg border transition-colors duration-200
              ${answers[currentQuestion] === index 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="text-blue-600 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === sampleQuestions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default QuizSection; 