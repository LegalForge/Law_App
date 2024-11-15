import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SampleQuiz from './SampleQuiz';
import TestimonialCarousel from './TestimonialCarousel';

function LandingPage() {
  const videoRef = useRef(null);
  const quizRef = useRef(null);
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ 
      behavior: 'smooth'
    });
  };

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ 
      behavior: 'smooth'
    });
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
    setShowPremiumPrompt(true);
  };

  const PremiumPromptModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Great job on completing the trial quiz!</h2>
        <p className="mb-2">Your score: {quizScore}%</p>
        <p className="mb-6">
          Ready to access our full library of legal case quizzes? Create an account or log in to:
        </p>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Access all premium quizzes</li>
          <li>Track your progress</li>
          <li>Save your scores</li>
          <li>Get personalized recommendations</li>
        </ul>
        <div className="flex flex-col gap-3">
          <Link 
            to="/register" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center"
          >
            Create Free Account
          </Link>
          <Link 
            to="/login" 
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 text-center"
          >
            Log In
          </Link>
          <button 
            onClick={() => setShowPremiumPrompt(false)}
            className="text-gray-500 hover:text-gray-700 text-sm mt-2"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Legal Forage
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          Master Legal Cases Through Interactive Learning
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Sample Quiz
          </button>
          <button 
            onClick={scrollToVideo}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Watch Demo
          </button>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoRef} className="my-16">
        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          How Legal Forage Works
        </h3>
        <div className="relative w-full pb-[56.25%] bg-gray-100 rounded-xl overflow-hidden">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Legal Forage Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Updated Sample Quiz Section */}
      <section ref={quizRef} className="my-16">
        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          Try a Sample Quiz
        </h3>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-8 border border-blue-100">
            <div className="mb-8 text-center">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full">
                Sample Quiz
              </span>
            </div>
            <SampleQuiz onComplete={handleQuizComplete} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="my-16">
        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          What Our Users Say
        </h3>
        <TestimonialCarousel />
      </section>

      {/* Updated Call to Action Section */}
      <section className="my-16 text-center bg-blue-50 rounded-xl p-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Excel in Your Legal Studies?
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join Legal Forage today and get access to our complete library of case law quizzes.
        </p>
        <Link 
          to="/register"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>© 2024 Legal Forage. All rights reserved.</p>
        </div>
      </footer>

      {/* Premium Prompt Modal */}
      {showPremiumPrompt && <PremiumPromptModal />}
    </div>
  );
}

export default LandingPage;