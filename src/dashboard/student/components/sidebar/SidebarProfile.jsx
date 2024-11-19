import React from 'react';
import forage from '../../../../assets/images/forage.png';

const SidebarProfile = () => {
    return (
      <div className="p-8 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center justify-center">
          <div className="relative group">
            <img 
              src={forage} 
              alt="Legal Forage" 
              className="w-36 h-28 hover:scale-105 transition-all duration-300 ease-in-out shadow-xl rounded-xl cursor-pointer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
          </div>
        </div>
        <div className="text-center mt-6 space-y-2">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300">
            Legal Forage
          </h2>
          <p className="text-sm text-gray-600 font-semibold tracking-wide">Your Legal Learning Partner</p>
          <div className="flex justify-center space-x-1">
            <div className="h-1 w-8 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="h-1 w-8 bg-blue-400 rounded-full animate-pulse delay-100"></div>
            <div className="h-1 w-8 bg-blue-200 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    );
  }
  export default SidebarProfile;