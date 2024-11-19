import React, { useState, useEffect } from 'react';
import { FiUpload, FiDownload, FiTrash2, FiEdit, FiX, FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi';
import { FiSearch } from "react-icons/fi";
import { toast } from 'react-toastify';
import { getUserCases, updateCase } from '../../../services/Cases';
import Swal from 'sweetalert2';
import { deleteCase } from '../../../services/Cases';
import { createCase } from '../../../services/Cases';
import { useNavigate } from 'react-router-dom';

 

// Update the PDF Preview Modal component
const PdfPreviewModal = ({ pdfUrl, onClose }) => {
    const [isError, setIsError] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg w-full h-[90vh] overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">PDF Preview</h3>
                    <div className="flex items-center gap-2">
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Open in New Tab
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    {isError ? (
                        <div className="h-full flex flex-col items-center justify-center p-4">
                            <p className="text-gray-600 mb-4">Unable to preview PDF directly.</p>
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Open PDF in New Tab
                            </a>
                        </div>
                    ) : (
                        <object
                            data={pdfUrl}
                            type="application/pdf"
                            className="w-full h-full"
                            onError={() => setIsError(true)}
                        >
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full"
                                title="PDF Preview"
                                onError={() => setIsError(true)}
                            >
                                <p>Your browser does not support PDF preview.</p>
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Click here to view the PDF
                                </a>
                            </iframe>
                        </object>
                    )}
                </div>
            </div>
        </div>
    );
};

function CasesManagement() {
    const [caseData, setCaseData] = useState({
        title: '',
        summary: '',
        citation: '',
        icon: null
    });
    const [fileName, setFileName] = useState('');
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [casesPerPage] = useState(2); // Number of cases per page
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        try {
            setLoading(true);
            // const response = await fetch('https://law-api-8un9.onrender.com/cases');
            const response = await getUserCases();

            // const data = await response.json();
            setCases(response.data);

        } catch (error) {
            console.error('Error fetching cases:', error);
            // alert('Failed to fetch cases');
            toast.error('Failed to fetch cases');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCaseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCaseData(prev => ({
            ...prev,
            icon: file
        }));
        setFileName(file.name);
    };

    // Create
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', caseData.title);
        formData.append('summary', caseData.summary);
        formData.append('citation', caseData.citation);
        
        if (caseData.icon) {
            formData.append('icon', caseData.icon);
        }

        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Authentication token not found. Please log in again.');
            setLoading(false);
            navigate('/login');
            return;
        }

        try {
            const response = await createCase(formData, `Bearer ${token}`);

            if (response.status === 200 || response.status === 201) {
                toast.success('Case uploaded successfully!');
                resetForm();
                fetchCases();
            }
        } catch (error) {
            console.error('Error:', error);
            if (error?.response?.status === 401) {
                localStorage.removeItem('token');
                toast.error('Session expired. Please login again.');
                navigate('/login');
                return;
            }
            const errorMessage = error?.response?.data?.message || 'Failed to upload case';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        try {
            if (!id) {
                toast.error('Invalid case ID');
                return;
            }

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

            setLoading(true);
            await deleteCase(id);
            toast.success('Case deleted successfully');
            await fetchCases(); // Refresh the cases list

        } catch (error) {
            console.error('Error deleting case:', error);
            toast.error(error?.response?.data?.message || 'Failed to delete case');
        } finally {
            setLoading(false);
        }
    };
    
    // Edit
    const handleEdit = (caseItem) => {
        setIsEditing(true);
        setEditingId(caseItem.id);
        setCaseData({
            title: caseItem.title,
            summary: caseItem.summary,
            citation: caseItem.citation,
            icon: null
        });
        setFileName('');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Debug log
        console.log('Updating case with ID:', editingId);

        const formData = new FormData();
        formData.append('title', caseData.title);
        formData.append('summary', caseData.summary);
        formData.append('citation', caseData.citation);

        if (caseData.icon) {
            formData.append('icon', caseData.icon);
        }

        try {
            // Make sure editingId exists and is in the correct format
            if (!editingId) {
                toast.error('No case selected for update');
                return;
            }

            const response = await updateCase(editingId, formData);
            if (response.status === 200 || response.status === 201) {
                toast.success('Case updated successfully!');
                resetForm();
                fetchCases();
                setEditingId(null); // Clear editing state
            }
        } catch (error) {
            console.error('Error updating case:', error);
            console.log('Error response:', error.response); // Debug log
            
            if (error.response?.status === 404) {
                toast.error('Case not found. Please refresh and try again.');
            } else {
                const errorMessage = error?.response?.data?.message || 'Failed to update case';
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCaseData({
            title: '',
            summary: '',
            citation: '',
            icon: null
        });
        setFileName('');
        setIsEditing(false);
        setEditingId(null);
    };

    // Add this function to filter cases
    const getFilteredCases = () => {
        return cases.filter(caseItem => {
            const matchesSearch =
                caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caseItem.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caseItem.summary.toLowerCase().includes(searchTerm.toLowerCase());

            if (filterCriteria === 'all') return matchesSearch;
            if (filterCriteria === 'recent') {
                // Assuming cases have a timestamp or date field
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return matchesSearch && new Date(caseItem.createdAt) >= thirtyDaysAgo;
            }
            if (filterCriteria === 'constitutional law') {
                return matchesSearch && caseItem.category === 'constitutional';
            }
            if (filterCriteria === 'criminal') {
                return matchesSearch && caseItem.category === 'criminal';
            }
            
            // Add more filter criteria as needed
            return matchesSearch;
        });
    };

    // Pagination logic
    const indexOfLastCase = currentPage * casesPerPage;
    const indexOfFirstCase = indexOfLastCase - casesPerPage;
    const filteredCases = getFilteredCases();
    const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);
    const totalPages = Math.ceil(filteredCases.length / casesPerPage);

    // Pagination controls
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterCriteria]);

    // Pagination component
    const Pagination = () => {
        if (totalPages <= 1) return null;

        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex items-center justify-center space-x-2 mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FiChevronLeft className="w-5 h-5" />
                </button>

                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-1 rounded-md border border-gray-300"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-2">...</span>}
                    </>
                )}

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-1 rounded-md border ${currentPage === number
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {number}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-2">...</span>}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-1 rounded-md border border-gray-300"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FiChevronRight className="w-5 h-5" />
                </button>
            </div>
        );
    };

    const handlePreview = (pdfUrl) => {
        console.log('PDF URL:', pdfUrl);
        setSelectedPdf(pdfUrl);
        setShowPdfPreview(true);
    };

    const CaseItem = ({ caseItem }) => (
        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{caseItem.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{caseItem.citation}</p>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {caseItem.summary}
                    </p>
                </div>
                <div className="flex space-x-2 ml-4">
                    <button
                        onClick={() => handlePreview(caseItem.icon)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="Preview PDF"
                        
                    >
                        <FiEye />
                    </button>
                    <button
                        // onClick={() => window.open(caseItem.icon, '_blank')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="Download PDF"
                    onClick={() => {
                        const downloadUrl = caseItem.icon;
                        const fileName = `${caseItem.title}.pdf`;
                        
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        return downloadLink;
                    }}
                    >
                        <FiDownload />
                    </button>
                    <button
                        onClick={() => handleEdit(caseItem)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        title="Edit Case"
                    >
                        <FiEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(caseItem.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Delete Case"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload/Edit Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-6">
                        {isEditing ? 'Edit Case' : 'Upload New Case'}
                    </h2>

                    <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Case Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={caseData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Summary
                            </label>
                            <textarea
                                name="summary"
                                value={caseData.summary}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Citation
                            </label>
                            <input
                                type="text"
                                name="citation"
                                value={caseData.citation}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PDF Document {isEditing && '(Optional - Leave empty to keep current PDF)'}
                            </label>
                            <div className="mt-1 flex items-center">
                                <label className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                    <FiUpload className="mr-2" />
                                    {fileName || (isEditing ? 'Upload new PDF' : 'Upload PDF')}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        required={!isEditing}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                            >
                                {loading ? 'Processing...' : isEditing ? 'Update Case' : 'Upload Case'}
                            </button>

                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Cases List */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-6">Cases List</h2>

                    <div className="mb-6 space-y-4">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search cases..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <select
                                value={filterCriteria}
                                onChange={(e) => setFilterCriteria(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Cases</option>
                                <option value="recent">Recent Cases</option>
                                <option value="constitutional">Constitutional Law</option>
                                <option value="criminal">Criminal Law</option>
                            </select>

                            {(searchTerm || filterCriteria !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterCriteria('all');
                                    }}
                                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
                        <span>
                            {filteredCases.length}
                            {filteredCases.length === 1 ? ' case' : ' cases'} found
                        </span>
                        <span>
                            Showing {indexOfFirstCase + 1}-
                            {Math.min(indexOfLastCase, filteredCases.length)} of{' '}
                            {filteredCases.length}
                        </span>
                    </div>

                    {loading && !cases.length ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredCases.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                {cases.length === 0
                                    ? 'No cases uploaded yet'
                                    : 'No cases match your search criteria'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {currentCases.map((caseItem) => (
                                    <CaseItem
                                        key={caseItem.id}
                                        caseItem={caseItem}
                                    />
                                ))}
                            </div>
                            <Pagination />
                        </>
                    )}
                </div>
            </div>

            {showPdfPreview && (
                <PdfPreviewModal
                    pdfUrl={selectedPdf}
                    onClose={() => {
                        setShowPdfPreview(false);
                        setSelectedPdf(null);
                    }}
                />
            )}
        </>
    );
}

export default CasesManagement; 