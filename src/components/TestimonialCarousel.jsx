import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "John Doe",
    role: "Law Student, Harvard",
    initials: "JD",
    quote: "Legal Forage has been invaluable in helping me understand complex legal cases. The quiz feature really helps reinforce my learning."
  },
  {
    name: "Sarah Johnson",
    role: "Law Student, Yale",
    initials: "SJ",
    quote: "The case summaries are concise yet comprehensive. It's like having a personal tutor guiding you through each case."
  },
  {
    name: "Michael Brown",
    role: "Law Student, Stanford",
    initials: "MB",
    quote: "The progress tracking feature helps me identify areas where I need to focus more. It's transformed how I prepare for exams."
  }
];

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [effect, setEffect] = useState('slide');

  const transitions = {
    slide: {
      enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      }),
      center: {
        x: 0,
        opacity: 1
      },
      exit: (direction) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      })
    },
    fade: {
      enter: {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      center: {
        opacity: 1,
        scale: 1,
        y: 0
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        y: -50
      }
    },
    flip: {
      enter: (direction) => ({
        rotateY: direction > 0 ? 90 : -90,
        opacity: 0,
        scale: 0.5
      }),
      center: {
        rotateY: 0,
        opacity: 1,
        scale: 1
      },
      exit: (direction) => ({
        rotateY: direction < 0 ? 90 : -90,
        opacity: 0,
        scale: 0.5
      })
    },
    spiral: {
      enter: {
        scale: 0,
        rotate: -720,
        opacity: 0
      },
      center: {
        scale: 1,
        rotate: 0,
        opacity: 1
      },
      exit: {
        scale: 0,
        rotate: 720,
        opacity: 0
      }
    },
    bounce: {
      enter: (direction) => ({
        y: direction > 0 ? 200 : -200,
        opacity: 0,
        scale: 1.5
      }),
      center: {
        y: 0,
        opacity: 1,
        scale: 1
      },
      exit: (direction) => ({
        y: direction < 0 ? 200 : -200,
        opacity: 0,
        scale: 0.5
      })
    },
    elastic: {
      enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        scaleX: 2,
        opacity: 0
      }),
      center: {
        x: 0,
        scaleX: 1,
        opacity: 1
      },
      exit: (direction) => ({
        x: direction < 0 ? 1000 : -1000,
        scaleX: 2,
        opacity: 0
      })
    },
    fold: {
      enter: (direction) => ({
        originX: direction > 0 ? 1 : 0,
        scaleX: 0,
        opacity: 0
      }),
      center: {
        scaleX: 1,
        opacity: 1
      },
      exit: (direction) => ({
        originX: direction < 0 ? 1 : 0,
        scaleX: 0,
        opacity: 0
      })
    },
    swing: {
      enter: (direction) => ({
        rotateZ: direction > 0 ? 45 : -45,
        y: 100,
        opacity: 0
      }),
      center: {
        rotateZ: 0,
        y: 0,
        opacity: 1
      },
      exit: (direction) => ({
        rotateZ: direction < 0 ? 45 : -45,
        y: -100,
        opacity: 0
      })
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setEffect((prev) => {
        const effects = Object.keys(transitions);
        const currentIndex = effects.indexOf(prev);
        return effects[(currentIndex + 1) % effects.length];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto px-4">
      <div className="relative h-[300px] overflow-hidden perspective-1000">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={transitions[effect]}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              y: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              rotate: { duration: 0.7 },
              rotateY: { duration: 0.7 },
              rotateZ: { type: "spring", stiffness: 200, damping: 20 },
              scaleX: { type: "spring", stiffness: 300, damping: 25 }
            }}
            className="absolute w-full"
          >
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg
              backdrop-blur-sm border border-blue-100/20">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center mb-6"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center
                  transform hover:scale-110 transition-transform">
                  <span className="text-blue-600 text-2xl font-semibold">
                    {testimonials[current].initials}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">{testimonials[current].name}</h4>
                  <p className="text-gray-500">{testimonials[current].role}</p>
                </div>
              </motion.div>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-lg italic"
              >
                "{testimonials[current].quote}"
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`rounded-full transition-all duration-300
              ${index === current ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-blue-400 w-3'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{ height: '12px' }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1, x: -4 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setDirection(-1);
          setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white p-2 rounded-full 
          shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Previous testimonial"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, x: 4 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setDirection(1);
          setCurrent((prev) => (prev + 1) % testimonials.length);
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white p-2 rounded-full 
          shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Next testimonial"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
}

export default TestimonialCarousel; 