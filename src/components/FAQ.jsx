import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const faqData = [
  {
    question: "Is CasePrep free to use?",
    answer: "We offer a free tier with access to basic features. Premium features are available with a subscription."
  },
  {
    question: "How often is content updated?",
    answer: "We regularly update our case library and add new quizzes weekly to ensure you have access to the latest content."
  },
  {
    question: "Can I track my progress over time?",
    answer: "Yes! Our platform includes detailed analytics and progress tracking to help you monitor your improvement."
  },
  {
    question: "Is CasePrep suitable for all law students?",
    answer: "Yes, our content is designed to benefit law students at all levels, from first-year students to those preparing for the bar exam."
  }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
      >
        <h4 className="font-semibold text-lg">{question}</h4>
        <ChevronDownIcon 
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="p-6 pt-0 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  return (
    <section className="my-16">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold text-center text-gray-900 mb-8"
      >
        Frequently Asked Questions
      </motion.h3>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}

export default FAQ; 