import React, { useState } from 'react';
import { FiMail, FiPhone, FiMessageCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { toast } from 'react-toastify';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full py-4 px-6 flex justify-between items-center hover:bg-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-left">{question}</span>
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {isOpen && (
                <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{answer}</p>
                </div>
            )}
        </div>
    );
};

const HelpSupport = () => {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const faqs = [
        {
            question: "How do I upload a new case?",
            answer: "To upload a new case, go to the Cases Management page and use the 'Upload New Case' form. Fill in the required details including title, summary, citation, and attach the PDF document."
        },
        {
            question: "How can I edit or delete an existing case?",
            answer: "On the Cases Management page, each case has edit and delete buttons. Click the edit icon to modify the case details or the trash icon to delete it."
        },
        {
            question: "What file formats are supported for case uploads?",
            answer: "Currently, we only support PDF files for case document uploads. Please ensure your documents are in PDF format before uploading."
        },
        // Add more FAQs as needed
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your contact form submission logic here
        toast.success('Support ticket submitted successfully!');
        setContactForm({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Help & Support</h1>

            {/* Quick Links */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <a href="#documentation" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">Documentation</h3>
                    <p className="text-gray-600">Access detailed guides and documentation</p>
                </a>
                <a href="#contact" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">Contact Support</h3>
                    <p className="text-gray-600">Get in touch with our support team</p>
                </a>
                <a href="#faqs" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">FAQs</h3>
                    <p className="text-gray-600">Find answers to common questions</p>
                </a>
            </div>

            {/* FAQs Section */}
            <section id="faqs" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={contactForm.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FiMail className="w-5 h-5 mr-3 text-blue-600" />
                                <span>support@example.com</span>
                            </div>
                            <div className="flex items-center">
                                <FiPhone className="w-5 h-5 mr-3 text-blue-600" />
                                <span>+1 (234) 567-8900</span>
                            </div>
                            <div className="flex items-center">
                                <FiMessageCircle className="w-5 h-5 mr-3 text-blue-600" />
                                <span>Live chat available 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HelpSupport;