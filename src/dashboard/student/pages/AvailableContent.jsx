import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCases } from '../../../services/Cases';
import { getQuizzes } from '../../../services/Quizzes';

function AvailableContent({ onStartQuiz, onStartCase }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [cases, setCases] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                setLoading(true);
                const response = await getCases();
                console.log('API Response:', response.data);
                setCases(response.data);
            } catch (err) {
                setError('Failed to load cases. Please try again later.');
                console.error('Error fetching cases:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCases();
    }, []);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await getQuizzes();
            setQuizzes(response.data);
        };
        fetchQuizzes();
    }, []);

    const handleViewCase = (caseId) => {
        console.log('Viewing case:', caseId);
        if (!caseId) {
            console.error('No case ID provided');
            return;
        }
        navigate(`/cases/${caseId}`);
    };

    const handleStartQuiz = (quizId) => {
        navigate(`/quiz/${quizId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-blue-600 hover:underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header and Tabs */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Available Content</h1>
                <div className="flex space-x-2">
                    <TabButton
                        active={activeTab === 'all'}
                        onClick={() => setActiveTab('all')}
                    >
                        All
                    </TabButton>
                    <TabButton
                        active={activeTab === 'quizzes'}
                        onClick={() => setActiveTab('quizzes')}
                    >
                        Quizzes
                    </TabButton>
                    <TabButton
                        active={activeTab === 'cases'}
                        onClick={() => setActiveTab('cases')}
                    >
                        Cases
                    </TabButton>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render Quizzes */}
                {(activeTab === 'all' || activeTab === 'quizzes') && (
                    <>
                        {quizzes.map(quiz => (
                            <div key={quiz.id} className="relative">
                                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Quiz
                                </div>
                                <ContentCard
                                    key={quiz.id}
                                    type="quiz" 
                                    data={quiz}
                                    onStart={() => handleStartQuiz(quiz.id)}
                                    onView={() => console.log('Quiz details not implemented yet')}
                                />
                            </div>
                        ))}
                    </>
                )}

                {/* Render Cases */}
                {(activeTab === 'all' || activeTab === 'cases') &&
                    cases.map(caseItem => (
                        <div key={caseItem.id} className="relative">
                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Case
                            </div>
                            <div
                                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-200 p-6"
                                onClick={() => handleViewCase(caseItem.id)}
                            >
                                <div className="space-y-6">
                                    {caseItem.title && (
                                        <div className="border-b border-gray-200 pb-4">
                                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                                                {caseItem.title}
                                            </h3>
                                        </div>
                                    )}

                                    {caseItem.summary && (
                                        <div className="bg-gray-100 rounded-md p-4">
                                            <p className="text-gray-700 line-clamp-3 leading-relaxed">
                                                {caseItem.summary.length > 150 ? `${caseItem.summary.substring(0, 150)}...` : caseItem.summary}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div className="text-sm text-gray-500 font-medium">
                                                Added {new Date(caseItem.createdAt).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewCase(caseItem.id);
                                            }}
                                            className="inline-flex items-center px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            <span>Details</span>
                                            <svg
                                                className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Empty States */}
            {renderEmptyState(activeTab, cases, quizzes)}
        </div>
    );
}

// Helper Components
function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg transition-colors ${active
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
        >
            {children}
        </button>
    );
}

function ContentCard({ type, data, onStart, onView }) {
    if (!data) return null;

    const { title, description, duration, difficulty } = data;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    type === 'quiz' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                }`}>
                    {type === 'quiz' ? 'Quiz' : 'Case'}
                </span>
                {duration && (
                    <span className="text-gray-600 text-sm font-medium">
                        {duration}
                    </span>
                )}
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-base line-clamp-2">{description}</p>
            </div>

            {difficulty && (
                <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${
                    difficulty === 'Advanced' 
                        ? 'bg-red-100 text-red-800' 
                        : difficulty === 'Intermediate' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                }`}>
                    {difficulty}
                </span>
            )}

            <div className="flex space-x-3 pt-2">
                <button
                    onClick={onStart}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium
                        hover:bg-blue-700 active:bg-blue-800
                        transition-colors duration-200 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Start
                </button>
            </div>
        </div>
    );
}

function renderEmptyState(activeTab, cases, quizzes) {
    const noContent = (
        activeTab === 'cases' && cases.length === 0 ||
        activeTab === 'quizzes' && quizzes.length === 0 ||
        (activeTab === 'all' && cases.length === 0 && quizzes.length === 0)
    );

    if (noContent) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No {activeTab === 'all' ? 'content' : activeTab.slice(0, -1)} available
                </h3>
                <p className="text-gray-500">
                    Check back later for new {activeTab === 'all' ? 'content' : activeTab}
                </p>
            </div>
        );
    }

    return null;
}

export default AvailableContent;