"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaUsers, FaTrophy, FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';


export default function SingleCompetition() {
  const router = useRouter();
  const { id } = useParams(); // Competition ID
  const [competition, setCompetition] = useState(null);
  const [dummyQuestions, setDummyQuestions] = useState([]); // State to store dummy questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track current question index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch competition details
  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const response = await fetch(`/api/competition/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setCompetition(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [id]);

  // Fetch dummy questions for this competition
  useEffect(() => {
    const fetchDummyQuestions = async () => {
      try {
        const response = await fetch(`/api/dummyquestions/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setDummyQuestions(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDummyQuestions();
  }, [id]);

  // Handle next and previous button click
  const handleNext = () => {
    if (currentQuestionIndex < dummyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-2xl text-white animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-2xl text-white">Error: {error}</p>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <p className="text-2xl text-white">No competition found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Competition Card */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          {/* Competition Image */}
          {competition.image && (
            <img
              src={`https://solveandwins.advanceaitool.com/uploads/${competition.image}`}
              alt={competition.title}
              className="w-full h-64 object-cover"
            />
          )}

          {/* Competition Details */}
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{competition.title}</h1>
            <p className="text-gray-600 mb-6">{competition.description}</p>

            {/* Status and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center">
                <FaTrophy className="text-yellow-500 text-2xl mr-3" />
                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span> {competition.status}
                </p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-500 text-2xl mr-3" />
                <p className="text-gray-700">
                  <span className="font-semibold">Start Date:</span>{" "}
                  {new Date(competition.startedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-red-500 text-2xl mr-3" />
                <p className="text-gray-700">
                  <span className="font-semibold">End Date:</span>{" "}
                  {new Date(competition.endedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                {(competition.start === 'Yes')&&(<>
                  <button
                  className="px-4 py-2 bg-purple-500 rounded text-white font-bold"
                  onClick={() => {
                    router.push(`/pages/question/${id}`);
                  }}
                >
                  Start Competition
                </button>
                </>)}
                

              </div>
            </div>

            {/* Participants */}
            {/* <div className="flex items-center mb-6">
              <FaUsers className="text-green-500 text-2xl mr-3" />
              <p className="text-gray-700">
                <span className="font-semibold">Total Participants:</span> {competition.participants.length}
              </p>
            </div> */}
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Questions</h2>

            {dummyQuestions.length > 0 ? (
              <>
                <div className="relative">
                  {/* Progress Indicator */}
                  <div className="absolute top-0 right-0 mt-2 mr-2 text-sm text-white">
                    Question {currentQuestionIndex + 1} of {dummyQuestions.length}
                  </div>

                  {/* Question Card */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-lg text-white shadow-md">
                    <h3 className="md:text-2xl text-lg font-semibold mb-4">
                      {dummyQuestions[currentQuestionIndex].qText}
                    </h3>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold transition duration-200 ${currentQuestionIndex === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                  >
                    <FaChevronLeft className="mr-2" />
                    Previous
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === dummyQuestions.length - 1}
                    className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold transition duration-200 ${currentQuestionIndex === dummyQuestions.length - 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                  >
                    Next
                    <FaChevronRight className="ml-2" />
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-700">No questions available for this competition.</p>
            )}
          </div>
        </div>

        {/* Results Section */}
        {/* {competition.results.length > 0 && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Results</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-sm text-left">User ID</th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-sm text-left">Score</th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-sm text-left">
                        Time Attempted
                      </th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-sm text-left">
                        Correct Answers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {competition.results.map((result) => (
                      <tr key={result.id} className="border-b">
                        <td className="py-2 px-4 text-gray-700">{result.userId}</td>
                        <td className="py-2 px-4 text-gray-700">{result.score}</td>
                        <td className="py-2 px-4 text-gray-700">
                          {new Date(result.timeAttempted).toLocaleString()}
                        </td>
                        <td className="py-2 px-4 text-gray-700">
                          {result.correctAnswers}/{result.noOfQuestions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
