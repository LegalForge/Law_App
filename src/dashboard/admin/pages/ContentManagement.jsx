import React, { useState } from 'react';
import { FiUpload, FiFile, FiTrash2, FiEye, FiEdit2 } from 'react-icons/fi';

function ContentManagement() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      title: "JavaScript Basics",
      fileName: "javascript_basics.pdf",
      uploadDate: "2024-02-20",
      size: "2.4 MB",
      topic: "JavaScript"
    },
    // Add more sample files
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      const newFile = {
        id: Date.now(),
        title: file.name.split('.')[0],
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        topic: "Uncategorized"
      };
      setUploadedFiles([...uploadedFiles, newFile]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <p className="text-gray-600 mt-1">Upload and manage learning materials</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Upload PDF Materials
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-2 text-center">
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input 
                    id="file-upload" 
                    name="file-upload" 
                    type="file" 
                    className="sr-only"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Materials</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FiFile className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{file.title}</h4>
                  <p className="text-sm text-gray-500">{file.fileName}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Uploaded: {file.uploadDate}
                    </span>
                    <span className="text-xs text-gray-500">
                      Size: {file.size}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {file.topic}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
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
    </div>
  );
}

export default ContentManagement; 