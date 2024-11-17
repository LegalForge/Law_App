// import React from 'react';
// import { FiList, FiPlus, FiSettings, FiLogOut } from 'react-icons/fi';

// function Sidebar({ activeTab, setActiveTab, isSidebarOpen }) {
//   return (
//     <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
//       ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
//       <div className="h-full flex flex-col">
//         {/* Logo Area */}
//         <div className="flex items-center justify-center p-6 border-b">
//           <h1 className="text-2xl font-bold text-blue-600">Quiz Admin</h1>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex-1 p-4 space-y-2">
//           <button
//             onClick={() => setActiveTab('questions')}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
//               ${activeTab === 'questions' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//           >
//             <FiList className="w-5 h-5" />
//             <span>Questions</span>
//           </button>

//           <button
//             onClick={() => setActiveTab('add')}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
//               ${activeTab === 'add' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//           >
//             <FiPlus className="w-5 h-5" />
//             <span>Add Question</span>
//           </button>

//           <button
//             onClick={() => setActiveTab('settings')}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
//               ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//           >
//             <FiSettings className="w-5 h-5" />
//             <span>Settings</span>
//           </button>
//         </nav>

//         {/* Logout Button */}
//         <div className="p-4 border-t">
//           <button
//             className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
//           >
//             <FiLogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar; 