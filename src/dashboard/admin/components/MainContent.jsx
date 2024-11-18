// import React from 'react';
// import QuestionForm from '../QuestionForm';
// import QuestionsList from '../QuestionsList';
// import Settings from './Settings';

// function MainContent({ activeTab, setActiveTab, questions, handleAddQuestion, handleDeleteQuestion }) {
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'questions':
//         return (
//           <>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">Question Bank</h2>
//               <button
//                 onClick={() => setActiveTab('add')}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
//               >
//                 Add New Question
//               </button>
//             </div>
//             <QuestionsList 
//               questions={questions} 
//               onDelete={handleDeleteQuestion}
//             />
//           </>
//         );
//       case 'add':
//         return (
//           <>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Question</h2>
//             <QuestionForm onSubmit={handleAddQuestion} />
//           </>
//         );
//       case 'settings':
//         return <Settings />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <main className="p-6">
//       <div className="max-w-7xl mx-auto">
//         {renderContent()}
//       </div>
//     </main>
//   );
// }

// export default MainContent; 