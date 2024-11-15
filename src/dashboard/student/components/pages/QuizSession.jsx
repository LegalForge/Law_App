import React, { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import QuizResults from './QuizResults';

function QuizSession({ quizId, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  // Sample quiz data - replace with API call
  const quiz = [
    {
      id: 1,
      question: "Which method is used to remove the last element from an array?",
      options: ["pop()", "remove()", "delete()", "shift()"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which method is used to add elements to the end of an array?",
      options: ["push()", "append()", "add()", "insert()"],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "Which method returns the length of an array?",
      options: ["length()", "size()", "count()", "length"],
      correctAnswer: 3
    },
    {
      id: 4,
      question: "Which method is used to remove the first element from an array?",
      options: ["pop()", "shift()", "unshift()", "slice()"],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "Which method is used to sort the elements of an array?",
      options: ["sort()", "order()", "arrange()", "sequence()"],
      correctAnswer: 0
    },
    {
      id: 6,
      question: "Which method creates a new array by combining two or more arrays?",
      options: ["concat()", "merge()", "combine()", "join()"],
      correctAnswer: 0
    },
    {
      id: 7,
      question: "Which method removes elements from an array and returns the removed elements?",
      options: ["splice()", "cut()", "slice()", "trim()"],
      correctAnswer: 0
    },
    {
      id: 8,
      question: "Which method is used to reverse the order of elements in an array?",
      options: ["reverse()", "invert()", "flip()", "backward()"],
      correctAnswer: 0
    },
    {
      id: 9,
      question: "Which method is used to check if an array includes a certain element?",
      options: ["includes()", "has()", "contains()", "exists()"],
      correctAnswer: 0
    },
    {
      id: 10,
      question: "Which method is used to create a shallow copy of a portion of an array?",
      options: ["slice()", "copy()", "clone()", "extract()"],
      correctAnswer: 0
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate results
    const correctAnswers = quiz.reduce((acc, question) => {
      return acc + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    
    const results = {
      score: Math.round((correctAnswers / quiz.length) * 100),
      timeSpent: 1800 - timeLeft, // Adjust this based on your time logic
      totalQuestions: quiz.length,
      correctAnswers,
      selectedAnswers // Include selected answers for review
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setQuizResults(results);
    setIsCompleted(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {isCompleted ? (
        <QuizResults
          results={quizResults}
          quiz={quiz}
          onRetakeQuiz={() => {
            setIsCompleted(false);
            setQuizResults(null);
            setSelectedAnswers({});
            setTimeLeft(1800); // Reset time to 30 minutes
            setCurrentQuestion(0);
          }}
          onBackToQuizzes={() => onComplete(quizResults)}
        />
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quiz Header */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Quiz Title</h2>
                <p className="text-gray-600 mt-1">
                  Question {currentQuestion + 1} of {quiz.length}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FiClock className="w-5 h-5" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              {quiz[currentQuestion].question}
            </h3>

            <div className="space-y-4">
              {quiz[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(quiz[currentQuestion].id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswers[quiz[currentQuestion].id] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[quiz[currentQuestion].id] === index
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentQuestion < quiz.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default QuizSession;