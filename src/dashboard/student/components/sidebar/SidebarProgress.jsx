import React from 'react'

const SidebarProgress = ({ quizProgress }) => {
    return (
        <div className="px-4 py-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${quizProgress || 0}%` }}
                ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
                Progress: {quizProgress || 0}%
            </p>
        </div>
    );
}

export default SidebarProgress