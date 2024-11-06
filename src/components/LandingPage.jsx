import React, { useRef } from 'react';
import SampleQuiz from './SampleQuiz';
import TestimonialCarousel from './TestimonialCarousel';

function LandingPage() {
  const videoRef = useRef(null);
  const quizRef = useRef(null);

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

      {/* Sample Quiz Section */}
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
            <SampleQuiz />
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

      {/* Call to Action Section */}
      <section className="my-16 text-center bg-blue-50 rounded-xl p-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Excel in Your Legal Studies?
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join Legal Forage today and transform how you learn case law.
        </p>
        {/* ... CTA button ... */}
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>© 2024 Legal Forage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;