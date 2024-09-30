import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Winning?</h2>
        <p className="text-xl mb-8">
          Join thousands of users who are already enjoying the benefits of
          Solveandwin. Don't miss out on the next big competition!
        </p>
        <a
          href="#"
          className="px-8 py-4 bg-white text-blue-600 rounded-md text-lg font-semibold hover:bg-gray-100"
        >
          Sign Up Today
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
