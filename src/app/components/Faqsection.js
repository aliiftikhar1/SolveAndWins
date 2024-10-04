"use client";

import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I participate in a competition?',
    answer:
      'Simply register for an account, browse our competitions, and click on the "Participate Now" button to join.',
  },
  {
    question: 'What are the eligibility criteria?',
    answer:
      'Participants must be at least 18 years old and have a valid email address. Some competitions may have additional requirements, which will be specified in the competition details.',
  },
  {
    question: 'How are winners selected?',
    answer:
      'Winners are selected based on the competition rules, which may include factors like creativity, accuracy, speed, or a combination thereof. Details are provided in each competition\'s description.',
  },
  {
    question: 'When are the results announced?',
    answer:
      'Results are typically announced within a week after the competition deadline. Winners will be notified via email and their profiles will be updated on the platform.',
  },
  // Add more FAQs as needed
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Heading Section */}
          <div className="col-span-1 w-full flex items-start">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          {/* FAQs Section */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b">
                  <button
                    className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-xl font-medium">{faq.question}</span>
                    <span className="text-2xl font-bold">
                      {openIndex === index ? '-' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div
                      id={`faq-answer-${index}`}
                      className="pb-4 text-gray-700 transition-all duration-300"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQs;
