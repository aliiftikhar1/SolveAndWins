"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const FeaturedCompetitions = () => {
  // State variables to manage competitions, loading state, and errors
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured competitions from the API
  useEffect(() => {
    const fetchFeaturedCompetitions = async () => {
      try {
        const response = await axios.get("/api/featuredcompetition");
        setCompetitions(response.data); // Assuming the API returns an array of competitions
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured competitions:", err);
        setError("Failed to load featured competitions. Please try again later.");
        setLoading(false);
      }
    };

    fetchFeaturedCompetitions();
  }, []);

  // Retry fetching data (optional)
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setCompetitions([]);
    // Re-run the useEffect by calling fetchFeaturedCompetitions again
    const fetchFeaturedCompetitions = async () => {
      try {
        const response = await axios.get("/api/featuredcompetition");
        setCompetitions(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured competitions:", err);
        setError("Failed to load featured competitions. Please try again later.");
        setLoading(false);
      }
    };

    fetchFeaturedCompetitions();
  };

  return (
    <section id="competitions" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Competitions
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="ml-2 text-gray-700">Loading...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Competitions Grid */}
        {!loading && !error && competitions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {competitions.map((comp, index) => (
              <a href="/pages/competitions" key={index}>
                <div
                  className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-h-[400px] flex flex-col"
                >
                  {comp.image && (
                    <img
                      src={`https://solveandwins.advanceaitool.com/uploads/${comp.image}`}
                      alt={comp.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{comp.title}</h3>
                      <p className="text-gray-700 mb-4">{comp.description}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">{comp.reward}</p>
                      <p className="text-blue-600 mb-4">{comp.countdown}</p>
                      <a
                        href={comp.link}
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                      >
                        Participate Now
                      </a>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* No Competitions Found */}
        {!loading && !error && competitions.length === 0 && (
          <p className="text-center text-gray-500">No featured competitions available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedCompetitions;
