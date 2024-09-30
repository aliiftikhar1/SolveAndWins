import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I participate in a competition?',
    answer:
      'Simply register for an account, browse our competitions, and click on the "Participate Now" button to join.',
  },
  // Add more FAQs here
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b">
              <button
                className="w-full text-left py-4 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl font-medium">{faq.question}</span>
                <span>{openIndex === index ? '-' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="pb-4 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
