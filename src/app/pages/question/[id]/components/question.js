'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaRegClock, FaCheckCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { useRouter } from 'next/navigation';

const QuestionPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Competition ID
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null); // Initialize timeLeft as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for quiz results
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if the user has already submitted
  const [competitionDuration, setCompetitionDuration] = useState(null); // State to store competition duration
  const [timeTaken, setTimeTaken] = useState(0); // Track time taken by the user
  const [quizStartTime, setQuizStartTime] = useState(null); // Store the quiz start time
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isMounted, setIsMounted] = useState(false); // To track if the component is mounted

  // Fetch user info from JWT token
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      alert('Login to see the dashboard!');
      router.push('/UserLogin');
    } else {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
      setUserEmail(decodedToken.email);
      setUserId(decodedToken.id);
    }
  }, [router]);

  // Mark component as mounted
  useEffect(() => {
    setIsMounted(true); // Mark component as mounted to ensure modal is shown correctly
  }, []);

  // Fetch competition duration, questions, and check if the result exists for the current competition
  useEffect(() => {
    if (id && userId && isMounted) {
      const fetchData = async () => {
        try {
          // Fetch competition details including duration
          const competitionResponse = await fetch(`/api/competition/${id}`);
          if (!competitionResponse.ok) {
            throw new Error(`Error: ${competitionResponse.status}`);
          }
          const competitionData = await competitionResponse.json();
          const competitionDurationInMinutes = competitionData.duration || 5; // Default to 5 minutes if not provided
          setCompetitionDuration(competitionDurationInMinutes);

          // Fetch questions
          const questionsResponse = await fetch(`/api/onecompetitionquestion/${id}`);
          if (!questionsResponse.ok) {
            throw new Error(`Error: ${questionsResponse.status}`);
          }
          const questionsData = await questionsResponse.json();
          setQuestions(questionsData);

          // Fetch previous results for the current user
          const resultResponse = await fetch(`/api/results/${userId}`);
          if (resultResponse.ok) {
            const resultData = await resultResponse.json();

            // Check if the user has submitted the quiz for the current competition
            const existingResult = resultData.find(
              (result) => result.competitionId === parseInt(id, 10)
            );
            if (existingResult) {
              setHasSubmitted(true); // User has already submitted the quiz
              setIsModalOpen(true); // Open the modal to show the result
            } else {
              // Start the timer after loading all data if no previous submission
              setTimeLeft(competitionDurationInMinutes * 60); // Set timeLeft in seconds based on duration
              setQuizStartTime(Date.now()); // Start tracking time
            }
          } else if (resultResponse.status !== 404) {
            throw new Error(`Error fetching results: ${resultResponse.status}`);
          }
        } catch (error) {
          setError('Failed to load data.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id, userId, isMounted]);

  // Timer effect to auto-submit when time runs out
  useEffect(() => {
    if (score !== null || timeLeft === null || hasSubmitted) return; // Stop timer if quiz is submitted or timeLeft is not initialized
    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((time) => (time > 0 ? time - 1 : time)); // Decrease time
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, score, hasSubmitted]);

  // Handle answer selection
  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  // Handle quiz submission and score calculation
  // Handle quiz submission and score calculation
const handleSubmitQuiz = async () => {
  const now = Date.now();
  const totalTimeTaken = Math.floor((now - quizStartTime) / 1000); // Calculate time taken in seconds

  let calculatedScore = 0;
  const wrongs = [];

  questions.forEach((question) => {
    if (answers[question.id] === question.key) {
      calculatedScore += 1;
    } else {
      wrongs.push({
        question: question.qText,
        yourAnswer: answers[question.id] || 'No answer selected',
        correctAnswer: question.key,
      });
    }
  });

  setScore(calculatedScore);
  setWrongAnswers(wrongs);
  setTimeTaken(totalTimeTaken); // Set the time taken
  setIsModalOpen(true); // Open the modal to show results

  try {
    const resultData = {
      competitionId: parseInt(id, 10),
      userId: userId,
      noOfQuestions: questions.length,
      correctAnswers: calculatedScore,
      score: parseFloat(((calculatedScore / questions.length) * 100).toFixed(2)),
      timeAttempted: new Date().toISOString(),
      timeTaken: parseInt(totalTimeTaken, 10), // Ensure timeTaken is an integer
      wrongAnswers: wrongs,
    };

    const response = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultData),
    });

    if (!response.ok) {
      throw new Error(`Error posting result: ${response.status}`);
    }
  } catch (error) {
    console.error('Error posting result:', error);
  }
};


  // Helper function to format time in mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
   router.push('/pages/competitions'); // Redirect to another page if user has already submitted
    
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-2xl text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-2xl text-red-200">{error}</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-2xl text-white">No questions found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        {/* Timer and Quiz Heading */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Quiz</h1>
          <div className="flex items-center space-x-4">
            <div style={{ width: 60, height: 60 }}>
              <CircularProgressbar
                value={(timeLeft / (competitionDuration * 60)) * 100} // Adjust the timer based on competition duration
                text={`${formatTime(timeLeft)}`}
                styles={buildStyles({
                  textColor: 'white',
                  textSize: '24px',
                  pathColor: timeLeft > 60 ? '#22c55e' : '#ef4444',
                  trailColor: '#374151',
                })}
              />
            </div>
            <FaRegClock className="text-white text-2xl" />
          </div>
        </div>

        {/* Display questions only if the user has not submitted the quiz */}
        {!hasSubmitted && (
          <>
            {/* Display current question */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                {currentQuestionIndex + 1}. {questions[currentQuestionIndex].qText}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['op1', 'op2', 'op3', 'op4'].map((optionKey, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
                      answers[questions[currentQuestionIndex].id] ===
                      questions[currentQuestionIndex][optionKey]
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white transform scale-105'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestionIndex].id}`}
                      value={questions[currentQuestionIndex][optionKey]}
                      checked={
                        answers[questions[currentQuestionIndex].id] ===
                        questions[currentQuestionIndex][optionKey]
                      }
                      onChange={() =>
                        handleOptionChange(
                          questions[currentQuestionIndex].id,
                          questions[currentQuestionIndex][optionKey]
                        )
                      }
                      className="form-radio h-5 w-5 text-blue-500"
                    />
                    <span className="ml-3">{questions[currentQuestionIndex][optionKey]}</span>
                  </label>
                ))}
              </div>

              {/* Next and Previous buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() =>
                    currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)
                  }
                  className={`py-2 px-4 rounded-md text-white ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-400 to-blue-500 hover:opacity-90'
                  }`}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    currentQuestionIndex < questions.length - 1 &&
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                  }
                  className={`py-2 px-4 rounded-md text-white ${
                    currentQuestionIndex === questions.length - 1
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-90'
                  }`}
                >
                  Next
                </button>
              </div>

              {/* Submit Button (only shown on the last question) */}
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  type="submit"
                  onClick={handleSubmitQuiz}
                  className="mt-6 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-md hover:opacity-90 transition-opacity duration-200 text-lg font-semibold"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </>
        )}

        {/* Custom Modal for quiz results or quiz already submitted */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <div className="bg-gray-800 text-white rounded-lg p-8 w-11/12 max-w-lg shadow-lg relative z-20">
              {hasSubmitted ? (
                <div className="text-center">
                  <FaCheckCircle className="text-green-400 text-6xl mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Your Quiz Has Been Submitted</h2>
                  <p className="text-xl">You have already completed this quiz.</p>
                  <button
                    onClick={handleCloseModal}
                    className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity duration-200 text-lg font-semibold"
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center">Quiz Results</h2>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                      <p className="text-xl">Total Questions: {questions.length}</p>
                      <p className="text-xl">
                        Correct Answers: <span className="text-green-400">{score}</span>
                      </p>
                      <p className="text-xl">
                        Wrong Answers: <span className="text-red-400">{wrongAnswers.length}</span>
                      </p>
                      <p className="text-xl">
                        Time Taken: <span className="text-blue-400">{formatTime(timeTaken)}</span>
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div style={{ width: 120, height: 120 }}>
                        <CircularProgressbar
                          value={(score / questions.length) * 100}
                          text={`${((score / questions.length) * 100).toFixed(0)}%`}
                          styles={buildStyles({
                            textColor: 'white',
                            textSize: '24px',
                            pathColor: '#22c55e',
                            trailColor: '#374151',
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  {wrongAnswers.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold mb-4">Review Incorrect Answers:</h3>
                      <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                        {wrongAnswers.map((item, idx) => (
                          <div key={idx} className="bg-gray-700 p-4 rounded-lg shadow-md">
                            <p className="mb-2">
                              <strong>Question {idx + 1}:</strong> {item.question}
                            </p>
                            <p className="text-red-400">
                              <strong>Your Answer:</strong> {item.yourAnswer}
                            </p>
                            <p className="text-green-400">
                              <strong>Correct Answer:</strong> {item.correctAnswer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="mt-6 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity duration-200 text-lg font-semibold"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
