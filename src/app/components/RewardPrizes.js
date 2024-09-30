import React from 'react';

const rewards = [
  {
    title: 'Cash Prizes',
    description: 'Up to $1,000 for top winners.',
    image: '/images/cash-prize.jpg',
  },
  {
    title: 'Gift Cards',
    description: 'Amazon, Apple Store, Google Play, and more.',
    image: '/images/gift-cards.jpg',
  },
  {
    title: 'Gadgets',
    description: 'Smartphones, tablets, and smartwatches.',
    image: '/images/gadgets.jpg',
  },
  {
    title: 'Exclusive Merchandise',
    description: 'Branded T-shirts, mugs, and accessories.',
    image: '/images/merchandise.jpg',
  },
];

const RewardsPrizes = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Rewards and Prizes
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          At <strong>Solveandwin</strong>, we believe in rewarding talent and
          effort. Our competitions offer a variety of prizes to motivate and
          acknowledge our top performers.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {rewards.map((reward, index) => (
            <div key={index} className="text-center">
              <img
                src={reward.image}
                alt={reward.title}
                className="mx-auto mb-4 h-40 w-40 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
              <p className="text-gray-700">{reward.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <blockquote className="text-center text-xl italic text-gray-800 max-w-3xl mx-auto">
            "Winning the grand prize in the Math Mastery Marathon was an
            incredible experience! The challenges were engaging, and the rewards
            were fantastic."
            <br />
            <span className="font-semibold mt-4 block">
              — Alex Johnson, Competition Winner
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default RewardsPrizes;
