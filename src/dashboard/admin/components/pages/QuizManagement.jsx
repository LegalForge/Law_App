import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { getCases } from '../../../../services/Cases';

function QuizManagement() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [questionForm, setQuestionForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: null,
    caseId: "",
    caseName: ""
  });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await getCases();
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCaseSelect = (e) => {
    const caseId = e.target.value;
    const selectedCaseData = cases.find(c => c.id === caseId);
    setSelectedCase(caseId);
    setQuestionForm(prev => ({
      ...prev,
      caseId: caseId,
      caseName: selectedCaseData?.title || ''
    }));
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!selectedCase) {
      alert("Please select a case first");
      return;
    }
    if (!questionForm.question || 
        questionForm.options.some(opt => !opt) || 
        questionForm.correctAnswer === null) {
      alert("Please fill all fields and select a correct answer");
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/questions', {
        ...questionForm,
        caseId: selectedCase
      });

      setQuestionForm({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: null,
        caseId: selectedCase,
        caseName: cases.find(c => c.id === selectedCase)?.title || ''
      });
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Question</h2>

        <form onSubmit={handleAddQuestion} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Case
            </label>
            <select
              value={selectedCase}
              onChange={handleCaseSelect}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a case</option>
              {cases.map((caseItem) => (
                <option key={caseItem.id} value={caseItem.id}>
                  {caseItem.title}
                </option>
              ))}
            </select>
          </div>

          {selectedCase && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text
                </label>
                <textarea
                  name="question"
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer Options
                </label>
                {questionForm.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={questionForm.correctAnswer === index}
                      onChange={() => setQuestionForm({ ...questionForm, correctAnswer: index })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...questionForm.options];
                        newOptions[index] = e.target.value;
                        setQuestionForm({ ...questionForm, options: newOptions });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                >
                  {loading ? 'Processing...' : 'Add Question'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Questions for Selected Case</h2>
      </div>
    </div>
  );
}

export default QuizManagement; 