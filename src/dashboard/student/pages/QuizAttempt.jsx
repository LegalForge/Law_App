import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById } from '../../../services/Quizzes';
import Sidebar from '../../student/components/StudentSidebar';
import Navbar from '../../student/components/StudentNavbar';

function QuizAttempt() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                console.log('Fetching quiz with ID:', id);
                setLoading(true);
                const response = await getQuizById(id);
                if (!response?.data) {
                    throw new Error('No quiz data received');
                }
                setQuiz(response.data);
            } catch (err) {
                let errorMessage = 'Failed to load quiz. Please try again later.';
                if (err.response?.status === 500) {
                    errorMessage = 'Server error occurred. Please try again later.';
                } else if (err.message) {
                    errorMessage = err.message;
                }
                setError(errorMessage);
                console.error('Error fetching quiz:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleAnswerSelect = (questionId, selectedOption) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        if (!quiz?.questions) return 0;
        
        let correctAnswers = 0;
        quiz.questions.forEach(question => {
            if (answers[question.id] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        return Math.round((correctAnswers / quiz.questions.length) * 100);
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setShowResults(true);
    };

    const renderResults = () => {
        return (
            <div className="max-w-4xl mx-auto px-6 py-10">
                <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Quiz Results</h2>
                    
                    {/* Score Summary */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                            <div className="text-6xl font-bold text-blue-600 mb-2">
                                {Math.round((quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length / quiz.questions.length) * 100)}%
                            </div>
                            <p className="text-gray-600">Final Score</p>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                            <div className="text-6xl font-bold text-green-600 mb-2">
                                {quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length}/{quiz.questions.length}
                            </div>
                            <p className="text-gray-600">Correct Answers</p>
                        </div>
                    </div>

                    {/* Questions Review */}
                    <div className="space-y-6">
                        {quiz.questions.map((question, index) => {
                            const isCorrect = answers[question.id] === question.correctAnswer;
                            const selectedOption = question.options.find(opt => opt.text === answers[question.id]);
                            const correctOption = question.options.find(opt => opt.text === question.correctAnswer);
                            
                            return (
                                <div key={index} className={`rounded-lg p-6 ${
                                    isCorrect ? 'bg-green-50' : 'bg-red-50'
                                }`}>
                                    {/* Question Header */}
                                    <div className="mb-4 border-b pb-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                                isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {isCorrect ? '✓' : '✗'}
                                            </span>
                                            <span className="font-medium text-gray-600">Question {index + 1}</span>
                                        </div>
                                        <p className="text-xl font-semibold mt-2 ml-10">
                                            {question.questionText || question.question}
                                        </p>
                                    </div>

                                    {/* Answer Comparison */}
                                    <div className="ml-10 space-y-3">
                                        <div className="flex items-start gap-2">
                                            <span className="font-medium min-w-24">Your answer:</span>
                                            <span className={`${
                                                isCorrect ? 'text-green-600' : 'text-red-600'
                                            } font-medium`}>
                                                {answers[question.id]}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-start gap-2">
                                            <span className="font-medium min-w-24">Correct answer:</span>
                                            <span className="text-green-600 font-medium">
                                                {question.correctAnswer}
                                            </span>
                                        </div>

                                        {/* Enhanced Explanation Section */}
                                        <div className="mt-6 ml-10">
                                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                <div className="p-4 border-b border-gray-200 bg-gray-50">
                                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                        </svg>
                                                        Detailed Explanation
                                                    </h4>
                                                </div>
                                                
                                                <div className="p-4 space-y-4">
                                                    {/* General Explanation */}
                                                    <div className="text-gray-700">
                                                        <p className="mb-3">{question.explanation || "No explanation provided for this question."}</p>
                                                    </div>

                                                    {/* Why Your Answer is Correct/Incorrect */}
                                                    <div className={`p-3 rounded-lg ${
                                                        isCorrect ? 'bg-green-50' : 'bg-red-50'
                                                    }`}>
                                                        <h5 className={`font-medium mb-2 ${
                                                            isCorrect ? 'text-green-700' : 'text-red-700'
                                                        }`}>
                                                            {isCorrect ? '✓ Why this is correct:' : '✗ Why this is incorrect:'}
                                                        </h5>
                                                        <p className="text-gray-700">
                                                            {selectedOption?.explanation || 
                                                             (isCorrect 
                                                                ? "Great job! You selected the correct answer."
                                                                : "This wasn't the best choice. Let's see why:")}
                                                        </p>
                                                    </div>

                                                    {/* Correct Answer Explanation */}
                                                    {!isCorrect && (
                                                        <div className="p-3 bg-blue-50 rounded-lg">
                                                            <h5 className="font-medium mb-2 text-blue-700">
                                                                The correct answer explained:
                                                            </h5>
                                                            <p className="text-gray-700">
                                                                {correctOption?.explanation || 
                                                                 "The correct answer is more appropriate because it accurately addresses the question."}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Additional Resources */}
                                                    {question.additionalResources && (
                                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                                            <h5 className="font-medium mb-2 text-gray-700 flex items-center gap-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                                                </svg>
                                                                Additional Resources
                                                            </h5>
                                                            <p className="text-gray-600">
                                                                {question.additionalResources}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Button */}
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={() => navigate('/student')}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center p-8 bg-red-50 rounded-lg shadow-md">
                    <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Go Back
                    </button>
                </div>
            );
        }

        if (!quiz || !quiz.questions || quiz.questions.length === 0) {
            return (
                <div className="text-center p-8 bg-yellow-50 rounded-lg shadow-md">
                    <p className="text-yellow-800 text-lg font-medium mb-4">No quiz questions found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                    >
                        Go Back
                    </button>
                </div>
            );
        }

        if (showResults) {
            return renderResults();
        }

        const currentQuestionData = quiz.questions[currentQuestion];

        return (
            <div className="max-w-4xl mx-auto px-6 py-10">
                {/* Quiz Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
                    <div className="flex justify-center gap-4">
                        <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
                            <span className="text-blue-800 font-medium">
                                Question {currentQuestion + 1} of {quiz.questions.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-xl shadow-xl p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        {currentQuestionData.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-4">
                        {currentQuestionData.options.map((option, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 
                                    ${answers[currentQuestionData.id] === option.text 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentQuestionData.id}`}
                                    value={option.text}
                                    checked={answers[currentQuestionData.id] === option.text}
                                    onChange={() => handleAnswerSelect(currentQuestionData.id, option.text)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-4 text-lg text-gray-700">{option.text}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                        ← Previous
                    </button>
                    
                    {currentQuestion === quiz.questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
                        >
                            Submit Quiz ✓
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default QuizAttempt;