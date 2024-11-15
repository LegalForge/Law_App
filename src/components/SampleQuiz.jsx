import React, { useState } from 'react';

const SampleQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);

  const sampleQuestions = [
    {
      question: "What principle was established in Donoghue v Stevenson?",
      choices: [
        "The neighbor principle and duty of care",
        "The postal rule in contract law",
        "The principle of vicarious liability",
        "The rule against perpetuities"
      ],
      correctAnswer: 0
    },
    {
      question: "In R v Brown (1993), what key legal principle was established?",
      choices: [
        "Consent is a valid defense to assault",
        "Consent is not a defense to causing actual bodily harm",
        "Self-defense must be proportionate",
        "Provocation reduces murder to manslaughter"
      ],
      correctAnswer: 1
    },
    {
      question: "Which case established the 'reasonable person' test in negligence?",
      choices: [
        "Carlill v Carbolic Smoke Ball Co",
        "Hedley Byrne v Heller",
        "Vaughan v Menlove",
        "Rylands v Fletcher"
      ],
      correctAnswer: 2
    }
  ];

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowCelebration(true);
    }
  };

  const handleSubmit = () => {
    onComplete(score);
  };
  if (showCelebration) {
    return (
      <div className="text-center space-y-6 py-8">
        <h3 className="text-3xl font-bold text-gray-900">🌟 Great Effort!</h3>
        <p className="text-xl">You scored {score} out of {sampleQuestions.length}</p>
        <p className="text-gray-600">
          Keep pushing forward—you're doing amazing! Sign up to Legal Forage to access more quizzes and track your progress!
        </p>
        <button 
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 
            transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Create Free Account
        </button>
      </div>
    );
}


  return (
    <div className='bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 backdrop-blur-sm p-8 rounded-xl 
      flex flex-col items-center justify-center font-sans gap-8 
      transform transition-all duration-300 hover:shadow-xl relative overflow-hidden'>
      
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-grid opacity-[0.07]"></div>
      <div className="absolute inset-0 bg-dots opacity-[0.05]"></div>
      
      {/* Geometric Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 
        bg-gradient-to-br from-blue-300/20 to-teal-300/20 
        rounded-full -mr-20 -mt-20 animate-pulse"></div>
      
      {/* Left Side Decorations */}
      <div className="absolute left-10 top-20 w-8 h-8 
        bg-gradient-to-r from-indigo-400/20 to-purple-400/20 
        rounded-lg rotate-12 animate-float"></div>
      <div className="absolute left-20 top-40 w-6 h-6 
        bg-gradient-to-br from-amber-300/30 to-orange-300/30 
        clip-path-hexagon animate-float-delay"></div>
      
      {/* Right Side Decorations */}
      <div className="absolute right-12 top-1/4 w-10 h-10 
        bg-gradient-to-br from-emerald-300/20 to-teal-300/20 
        clip-path-triangle animate-float-reverse"></div>
      <div className="absolute right-20 bottom-1/3 w-8 h-8 
        bg-gradient-to-r from-pink-300/20 to-rose-300/20 
        clip-path-star animate-spin-slow"></div>

      {/* Content Section */}
      <div className='text-center relative z-10'>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 
            text-white rounded-full text-sm font-medium shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-ping 
              inline-block mr-2"></span>
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </span>
        </div>
        <h1 className='bg-gradient-to-r from-blue-600 to-blue-500 text-transparent 
          bg-clip-text text-[34px] font-semibold sm:text-[44px] leading-tight'>
          {sampleQuestions[currentQuestion].question}
        </h1>
      </div>

      {/* Answer Options */}
      <div className='flex flex-col space-y-4 w-full max-w-2xl relative z-10'>
        {sampleQuestions[currentQuestion].choices.map((choice, index) => (
          <div 
            key={index}
            onClick={() => handleAnswer(index)}
            className='flex items-center bg-white/80 backdrop-blur-sm rounded-lg 
              shadow-lg cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 
              hover:to-teal-50 transition-all duration-300 group'
          >
            <div className='flex items-center justify-center w-12 h-12 
              bg-gradient-to-r from-blue-600 to-blue-500 group-hover:from-blue-500 
              group-hover:to-blue-400 transition-all duration-300 rounded-l-lg'>
              <p className='text-white text-2xl font-bold'>
                {String.fromCharCode(65 + index)}
              </p>
            </div>
            <p className='text-gray-800 text-lg flex-1 px-4 py-3'>{choice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SampleQuiz; 