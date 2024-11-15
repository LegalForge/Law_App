import React, { useState } from 'react';
import { 
  FiBook, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiFile, 
  FiList,
  FiEye,
  FiLink,
  FiMoreVertical,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';

function CourseManagement() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Complete guide to JavaScript basics",
      materials: [
        {
          id: 1,
          type: 'pdf',
          title: 'Introduction to JavaScript',
          fileName: 'js_intro.pdf',
          uploadDate: '2024-02-20'
        },
        {
          id: 2,
          type: 'pdf',
          title: 'JavaScript Functions',
          fileName: 'js_functions.pdf',
          uploadDate: '2024-02-21'
        }
      ],
      quizzes: [
        {
          id: 1,
          title: 'JavaScript Basics Quiz',
          questions: 15,
          duration: 30,
          difficulty: 'Beginner'
        },
        {
          id: 2,
          title: 'JavaScript Functions Quiz',
          questions: 20,
          duration: 45,
          difficulty: 'Intermediate'
        }
      ]
    },
    // Add more courses
  ]);

  const [expandedCourse, setExpandedCourse] = useState(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
            <p className="text-gray-600 mt-1">Manage courses, content, and related quizzes</p>
          </div>
          <button
            onClick={() => setIsAddingCourse(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm">
            {/* Course Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiBook className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {expandedCourse === course.id ? 
                      <FiChevronDown className="w-5 h-5" /> : 
                      <FiChevronRight className="w-5 h-5" />
                    }
                  </button>
                  <div className="relative">
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <FiMoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCourse === course.id && (
              <div className="p-6 space-y-6">
                {/* Course Materials */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Course Materials</h4>
                    <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                      <FiPlus className="w-4 h-4" />
                      <span>Add Material</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {course.materials.map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <FiFile className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{material.title}</p>
                            <p className="text-sm text-gray-500">
                              Uploaded on {new Date(material.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-500">
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-500">
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-red-400 hover:text-red-500">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Quizzes */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Related Quizzes</h4>
                    <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                      <FiPlus className="w-4 h-4" />
                      <span>Add Quiz</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {course.quizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <FiList className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{quiz.title}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500">
                                {quiz.questions} Questions
                              </span>
                              <span className="text-sm text-gray-500">
                                {quiz.duration} Minutes
                              </span>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {quiz.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-500">
                            <FiLink className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-500">
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-red-400 hover:text-red-500">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      {isAddingCourse && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Course</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter course description"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setIsAddingCourse(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseManagement; 