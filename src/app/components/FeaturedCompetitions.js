import React from 'react';

const competitions = [
  {
    title: 'Ultimate Trivia Challenge',
    description:
      'Test your general knowledge across various categories and stand a chance to win amazing rewards.',
    reward: 'First Prize: $500 Amazon Gift Card',
    countdown: 'Starts In: 3 Days 4 Hours',
    link: '#',
  },
  // Add more competition objects here
];

const FeaturedCompetitions = () => {
  return (
    <section id="competitions" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Competitions
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {competitions.map((comp, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{comp.title}</h3>
                <p className="text-gray-700 mb-4">{comp.description}</p>
                <p className="font-semibold mb-2">{comp.reward}</p>
                <p className="text-blue-600 mb-4">{comp.countdown}</p>
                <a
                  href={comp.link}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Participate Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompetitions;
