import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCaseById } from '../../../services/Cases';
import StudentSidebar from '../components/StudentSidebar';
import StudentNavbar from '../components/StudentNavbar';

function CaseDetails() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await getCaseById(id);
        setCaseData(response.data);
      } catch (err) {
        setError('Failed to load case details');
        console.error('Error fetching case:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-red-600 p-5 text-center font-medium">{error}</div>
  );
  
  if (!caseData) return (
    <div className="text-gray-600 p-5 text-center">No case found</div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <StudentNavbar 
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
          activeTab="Case Details"
        />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Main Content Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
                <h1 className="text-3xl font-bold text-white">{caseData.title}</h1>
                <p className="text-blue-100 mt-2 flex items-center">
                  <span className="mr-2">📅</span>
                  {formatDate(caseData.createdAt)}
                </p>
              </div>

              {/* Content Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Left Column - Case Information */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Case Details Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">📋</span>
                        Case Details
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600 font-medium w-24">Citation:</span>
                          <span className="text-gray-900 flex-1">{caseData.citation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary Card */}
                    {caseData.summary && (
                      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">📝</span>
                          Summary
                        </h2>
                        <div className="prose prose-blue max-w-none">
                          <p className="text-gray-700 leading-relaxed">{caseData.summary}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Document Viewer */}
                  <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">📄</span>
                        Case Document
                      </h2>
                      <div className="rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src={`https://savefiles.org/${caseData.icon}?shareable_link=499`}
                          className="w-full h-[700px]"
                          title="Case Document"
                        />
                      </div>
                      
                      {/* Document Actions */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Showing preview of first page only
                        </div>
                        <div className="flex items-center space-x-4">
                          {/* <a
                            href={`https://docs.google.com/document/d/${caseData.icon}?shareable_link=499#page=1`}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            <span className="mr-2">🔗</span>
                            View Full Document
                          </a> */}
                          <a
                            href={`https://savefiles.org/${caseData.icon}?shareable_link=499`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <span className="mr-2">⬇️</span>
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end">
                  <button 
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <span className="mr-2">←</span>
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDetails;