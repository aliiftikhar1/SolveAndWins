'use client';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Competition() {
  const [competitions, setCompetitions] = useState([]);
  const router = useRouter();

  // Fetch competitions from the API
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('/api/competition');
        const data = await response.json();
        setCompetitions(data);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  // Handle start button click
  const handleStartCompetition = (competitionId) => {
    router.push(`/pages/question/${competitionId}`);
    console.log(`Starting competition with ID: ${competitionId}`);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-white">
          Explore Competitions
        </h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {competitions.map((competition) => (
            <div
              key={competition.id}
              className="bg-gray-800/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Replace with actual image URL */}
              <img
                src={
                  competition.imageUrl ||
                  'https://cdn.pixabay.com/photo/2024/01/17/12/06/car-8514314_640.png'
                }
                alt={competition.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  {competition.title}
                </h2>
                <p className="text-gray-200 h-16 overflow-hidden">
                  {competition.description}
                </p>
                <div className="mt-4 mb-6">
                  <p className="flex items-center text-white text-sm">
                    <FaCalendarAlt className="mr-1 text-white" size={16} />
                    <strong className="mr-1">Start:</strong>
                    {new Date(competition.startedAt).toLocaleDateString()}
                  </p>
                  <p className="flex items-center text-white text-sm">
                    <FaCalendarAlt className="mr-1 text-white" size={16} />
                    <strong className="mr-1">End:</strong>
                    {new Date(competition.endedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleStartCompetition(competition.id)}
                  className="w-full bg-white/20 font-bold text-2xl text-white py-2 px-4 rounded-md hover:bg-white/30 transition-colors duration-200"
                >
                  Start Competition
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
