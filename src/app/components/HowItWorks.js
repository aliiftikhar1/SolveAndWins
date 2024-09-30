import React from 'react';
import { FaUserPlus, FaListUl, FaBrain, FaTrophy } from 'react-icons/fa';

const steps = [
  {
    icon: <FaUserPlus size={40} className="text-blue-600" />,
    title: 'Register',
    description:
      'Sign up for a free account in just a few minutes. All you need is an email address to get started.',
  },
  {
    icon: <FaListUl size={40} className="text-green-600" />,
    title: 'Choose a Competition',
    description:
      'Browse through our list of exciting competitions and select the ones that interest you.',
  },
  {
    icon: <FaBrain size={40} className="text-purple-600" />,
    title: 'Solve Challenges',
    description:
      'Put your knowledge and skills to the test by answering questions and solving problems.',
  },
  {
    icon: <FaTrophy size={40} className="text-yellow-600" />,
    title: 'Win Rewards',
    description:
      'Score high and climb the leaderboard to win fantastic prizes and earn recognition.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
