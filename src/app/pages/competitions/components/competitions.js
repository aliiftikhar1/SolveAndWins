'use client';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; 

export default function Competition() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [login, setuserlogin] = useState(false);
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

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
    
    } else {
      setuserlogin(true);
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
      setUserEmail(decodedToken.email);
      setUserRole(decodedToken.role);
      console.log("---DECODED----");
      console.log(
        "Name",
        decodedToken.name,
        "email",
        decodedToken.email,
        "Role",
        decodedToken.role
      );
    }
  }, [router]);

  // Handle start button click
  const handleStartCompetition = (competitionId) => {
    if(login === true){
      router.push(`/pages/competitions/${competitionId}`);
      console.log(`Starting competition with ID: ${competitionId}`);
    }else{
      router.push(`/UserLogin`);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 sm:mb-12 text-center text-white">
          Explore Competitions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitions.map((competition) => (
            <div
              key={competition.id}
              className="flex flex-col md:flex-row bg-gray-800/30 h-auto md:h-72 backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image on the top for mobile, left for desktop */}
              <div className="w-full md:w-1/3">
                <img
                  src={
                    competition.image
                      ? `https://solveandwins.advanceaitool.com/uploads/${competition.image}`
                      : 'https://cdn.pixabay.com/photo/2024/01/17/12/06/car-8514314_640.png'
                  }
                  alt={competition.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>

              {/* Description and other details */}
              <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
                    {competition.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 mb-4">
                    {competition.description}
                  </p>
                </div>

                {/* Start and End Dates */}
                <div className="text-xs sm:text-sm text-gray-300 mb-4">
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-gray-400" size={16} />
                    <strong className="mr-1">Start:</strong>
                    {new Date(competition.startedAt).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-gray-400" size={16} />
                    <strong className="mr-1">End:</strong>
                    {new Date(competition.endedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Button */}
                <div className="self-end">
                  <button
                    onClick={() => handleStartCompetition(competition.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Open Competition
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
