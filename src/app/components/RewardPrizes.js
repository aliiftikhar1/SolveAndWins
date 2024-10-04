"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API calls

const RewardsPrizes = () => {
  const [prizes, setPrizes] = useState([]); // State to store the prizes
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch prizes from API when the component mounts
  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const response = await axios.get('/api/prize'); // Replace with your actual API endpoint
        setPrizes(response.data); // Store prizes in state
      } catch (error) {
        console.error('Error fetching prizes:', error);
        setError('Failed to load prizes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrizes();
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-12">
          Rewards and Prizes
        </h2>

        {/* Section Description */}
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          At <strong>Solveandwin</strong>, we believe in rewarding talent and
          effort. Our competitions offer a variety of prizes to motivate and
          acknowledge our top performers.
        </p>

        {/* Prizes Container */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Loading State */}
          {isLoading ? (
            <p className="text-center w-full">Loading prizes...</p>
          ) : error ? (
            /* Error State */
            <p className="text-center w-full text-red-500">{error}</p>
          ) : prizes.length > 0 ? (
            /* Prizes Display */
            prizes.map((prize) => (
              <div
                key={prize.id || prize.title}
                className="text-center w-full sm:w-1/2 lg:w-1/4 px-4"
              >
                <img
                  src={`https://solveandwins.advanceaitool.com/uploads/${prize.image}`}
                  alt={prize.title}
                  className="mx-auto mb-4 h-40 w-40 object-cover rounded-full"
                />
                <h3 className="text-xl font-semibold mb-2">{prize.title}</h3>
                <p className="text-gray-700">{prize.description}</p>
              </div>
            ))
          ) : (
            /* No Prizes Available */
            <p className="text-center w-full">No prizes available at the moment.</p>
          )}
        </div>

        {/* Testimonial Section */}
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
