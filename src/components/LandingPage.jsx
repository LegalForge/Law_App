import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SampleQuiz from './SampleQuiz';
import TestimonialCarousel from './TestimonialCarousel';
import { FaGraduationCap, FaBook, FaChartLine, FaUserFriends, FaStar, FaCheck, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import law from '../../src/assets/images/law.jpg'
import forage from '../../src/assets/images/forage.png'

const LandingPage = () => {
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
          Ready to access our full library of legal cases and  quizzes? Create an account or log in to:
        </p>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Access all  quizzes</li>
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
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-700 mb-3">Not ready to sign up? Try these free resources:</p>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPremiumPrompt(false);
                  scrollToVideo();
                }}
              >
                ▶ Watch our educational videos
              </a>
              <a 
                href="/blog" 
                className="block text-blue-600 hover:underline"
              >
                📚 Read our legal case summaries
              </a>
              <a 
                href="/resources" 
                className="block text-blue-600 hover:underline"
              >
                📋 Download free study guides
              </a>
            </div>
          </div>
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

  const features = [
    {
      icon: <FaGraduationCap className="text-4xl text-blue-600" />,
      title: "Expert-Crafted Content",
      description: "Learn from carefully curated legal cases designed by law professionals"
    },
    {
      icon: <FaBook className="text-4xl text-blue-600" />,
      title: "Comprehensive Library",
      description: "Access hundreds of real-world cases across different legal domains"
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-600" />,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics and insights"
    },
    {
      icon: <FaUserFriends className="text-4xl text-blue-600" />,
      title: "Community Learning",
      description: "Join a community of law students and professionals"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Law Students" },
    { number: "500+", label: "Case Studies" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Animated Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex justify-between items-center">
      {/* <Link to="/" className="text-3xl font-bold text-blue-700 transition duration-300 hover:text-blue-500">
        Legal Forage
      </Link> */}
      <img src={forage} alt="Legal Forage" className="w-28 h-18" />

      <div className="flex  gap-6">
        <Link to="/login" className="mt-3 text-lg text-gray-700 hover:text-blue-600 transition duration-200">
          Login
        </Link>
        <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105">
          Sign Up
        </Link>
      </div>
    </div>
  </div>
</nav>

      {/* Hero Section with Animation */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Master Legal Cases
            <span className="text-blue-600 block mt-2">Through Interactive Learning</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12">
            Transform your legal education with our innovative case study platform
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToQuiz}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all"
            >
              Try Sample Quiz
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToVideo}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition-all"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h4 className="text-4xl font-bold text-blue-600">{stat.number}</h4>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Legal Forage?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
              <ul className="space-y-4">
                {[
                  "Personalized learning path",
                  "Real-world case studies",
                  "Expert feedback and guidance",
                  "Progress tracking tools"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheck className="text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                Get Started <FaArrowRight />
              </motion.button>
            </div>
            <div className="md:w-1/2">
              <img 
                src={law}
                alt="Learning Platform" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section with Enhanced Design */}
      <section ref={videoRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">See How It Works</h2>
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative pb-[56.25%]">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/CezlmUwMXNo"
                title="Legal Forage Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
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

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Legal Forage</h3>
              <p className="text-gray-400">Transforming legal education through interactive learning</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link to="/support" className="text-gray-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 Legal Forage. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showPremiumPrompt && <PremiumPromptModal />}
    </div>
  );
}

export default LandingPage;