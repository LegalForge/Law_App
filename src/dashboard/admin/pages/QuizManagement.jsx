import React, { useState, useEffect } from 'react';
import { createQuiz, getQuizzes, updateQuiz, deleteQuiz } from '../../../services/Quizzes';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


function QuizManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    questions: [],
    timeLimit: 10,
    totalPoints: 0,
    passingScore: 10
  });
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ],
    correctAnswer: '',
    explanation: '',
    points: 20
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleSubmitQuiz = async () => {
    const { user, _id, id, createdAt, updatedAt, ...quizDataWithoutMetadata } = quizForm;
    
    const cleanedQuizData = {
      ...quizDataWithoutMetadata,
      title: quizForm.title,
      description: quizForm.description,
      category: quizForm.category,
      difficulty: quizForm.difficulty,
      timeLimit: quizForm.timeLimit,
      totalPoints: quizForm.totalPoints,
      passingScore: quizForm.passingScore,
      questions: quizForm.questions.map(question => {
        const { _id, id, user, createdAt, updatedAt, ...cleanQuestion } = question;
        return {
          ...cleanQuestion,
          options: question.options.map(option => {
            const { _id, id, createdAt, updatedAt, ...cleanOption } = option;
            return cleanOption;
          })
        };
      })
    };

    try {
      setLoading(true);
      if (selectedQuiz) {
        console.log(`Quiz URL: ${import.meta.env.VITE_BASE_URL}/quizzes/${selectedQuiz?.id}`);
        await updateQuiz(selectedQuiz.id, cleanedQuizData);
      } else {
        await createQuiz(cleanedQuizData, 'your-auth-token');
      }
      toast.success(`Quiz ${selectedQuiz ? 'updated' : 'created'} successfully!`);
      fetchQuizzes();
      resetForm();
    } catch (error) {
      console.error(`Error ${selectedQuiz ? 'updating' : 'creating'} quiz:`, error);
      toast.error(`Failed to ${selectedQuiz ? 'update' : 'create'} quiz. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = currentQuestion.options.map((option, i) => ({
      text: i === index ? value : option.text,
      isCorrect: i === index ? true : false
    }));
    
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions,
      correctAnswer: value
    }));
  };

  const handleAddQuestion = () => {
    const { _id, id, user, createdAt, updatedAt, ...cleanQuestion } = {
      questionText: currentQuestion.questionText,
      options: currentQuestion.options.map(({ _id, id, createdAt, updatedAt, ...option }) => option),
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      points: currentQuestion.points
    };

    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, cleanQuestion],
      totalPoints: prev.totalPoints + cleanQuestion.points
    }));

    // Reset current question form
    setCurrentQuestion({
      questionText: '',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ],
      correctAnswer: '',
      explanation: '',
      points: 20
    });
  };

  const resetForm = () => {
    setQuizForm({
      title: '',
      description: '',
      category: '',
      difficulty: '',
      questions: [],
      timeLimit: 10,
      totalPoints: 0,
      passingScore: 10
    });
    setSelectedQuiz(null);
  };

  const handleSelectQuiz = (quiz) => {
    const { user, _id, id, createdAt, updatedAt, ...cleanQuiz } = quiz;
    const cleanedQuiz = {
      ...cleanQuiz,
      questions: quiz.questions.map(question => {
        const { _id, id, user, createdAt, updatedAt, ...cleanQuestion } = question;
        return {
          ...cleanQuestion,
          options: question.options.map(({ _id, id, createdAt, updatedAt, ...option }) => option)
        };
      })
    };
    
    setSelectedQuiz(quiz);
    setQuizForm(cleanedQuiz);
  };

  const handleDeleteQuiz = async (quizId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      await deleteQuiz(quizId);
      toast.success("Quiz deleted successfully!");
      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
      if (selectedQuiz && selectedQuiz.id === quizId) {
        resetForm(); // Reset form if currently editing the deleted quiz
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">{selectedQuiz ? 'Edit Quiz' : 'Create Quiz'}</h2>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Quiz Title"
            value={quizForm.title}
            onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Quiz Description"
            value={quizForm.description}
            onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={quizForm.category}
            onChange={(e) => setQuizForm({ ...quizForm, category: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <select
            value={quizForm.difficulty}
            onChange={(e) => setQuizForm({ ...quizForm, difficulty: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          {/* Quiz Settings */}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Time Limit (minutes)"
              value={quizForm.timeLimit}
              onChange={(e) => setQuizForm({ ...quizForm, timeLimit: parseInt(e.target.value) })}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Passing Score"
              value={quizForm.passingScore}
              onChange={(e) => setQuizForm({ ...quizForm, passingScore: parseInt(e.target.value) })}
              className="p-2 border rounded"
            />
          </div>

          {/* Display Added Questions */}
          {quizForm.questions.length > 0 && (
            <div className="border p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold mb-4">Added Questions</h3>
              {quizForm.questions.map((question, idx) => (
                <div key={idx} className="mb-4 p-4 border rounded">
                  <p className="font-bold">{question.questionText}</p>
                  <ul className="ml-4">
                    {question.options.map((option, optIdx) => (
                      <li key={optIdx} className={option.isCorrect ? "text-green-600" : ""}>
                        {option.text} {option.isCorrect && "(Correct)"}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-600 mt-2">Points: {question.points}</p>
                </div>
              ))}
            </div>
          )}

          {/* Question Form */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Add Question</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Question Text"
                value={currentQuestion.questionText}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
                className="w-full p-2 border rounded"
              />
              
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={option.isCorrect}
                    onChange={() => handleOptionChange(index, option.text)}
                    className="mt-3"
                  />
                </div>
              ))}

              <textarea
                placeholder="Explanation"
                value={currentQuestion.explanation}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <input
                type="number"
                placeholder="Points"
                value={currentQuestion.points}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) })}
                className="w-full p-2 border rounded"
              />

              <button
                type="button"
                onClick={handleAddQuestion}
                className="bg-blue-600 text-white py-2 px-4 rounded-md w-full"
              >
                Add Question
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmitQuiz}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {loading ? 'Processing...' : selectedQuiz ? 'Update Quiz' : 'Create Quiz'}
          </button>
        </form>
      </div>
      {/* Quiz List */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Quizzes</h2>
        <div className="space-y-6">
          {quizzes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((quiz) => (
            <div key={quiz.id} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Category: {quiz.category}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Difficulty: {quiz.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Questions: {quiz.questions.length}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelectQuiz(quiz)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center transition-colors duration-200"
                    title="Edit Quiz"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex items-center transition-colors duration-200"
                    title="Delete Quiz"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {Math.ceil(quizzes.length / itemsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(quizzes.length / itemsPerPage)))}
              disabled={currentPage >= Math.ceil(quizzes.length / itemsPerPage)}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default QuizManagement;