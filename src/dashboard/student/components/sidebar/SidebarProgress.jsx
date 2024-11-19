import React from 'react'

const SidebarProgress = () => {
    return (
        <div className="p-6 border-t border-gray-200 bg-gradient-to-br from-blue-50 to-white">
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide">Current Progress</h3>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: '60%' }}
                    >
                        <div className="h-full animate-pulse bg-white bg-opacity-20"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xs font-medium text-gray-600">6 of 10 quizzes completed</p>
                    <span className="text-xs font-bold text-blue-600">60%</span>
                </div>
            </div>
        </div>
    );
}

export default SidebarProgress