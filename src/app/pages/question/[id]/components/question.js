'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaRegClock } from 'react-icons/fa';
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
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousResults, setPreviousResults] = useState([]);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

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
      console.log("---DECODED----");
      console.log(
        "Name",
        decodedToken.name,
        "email",
        decodedToken.email,
        "Id",
        decodedToken.id
      );
    }
  }, [router]);

  // Fetch questions and previous results from the API
  useEffect(() => {
    // Ensure userId is available before fetching data
    if (id && userId) {
      const fetchData = async () => {
        try {
          // Fetch questions
          const questionsResponse = await fetch(`/api/onecompetitionquestion/${id}`);
          if (!questionsResponse.ok) {
            throw new Error(`Error: ${questionsResponse.status}`);
          }
          const questionsData = await questionsResponse.json();
          setQuestions(questionsData);

          // Fetch previous results for the user
          const resultResponse = await fetch(`/api/results/${userId}`);
          if (resultResponse.ok) {
            const resultData = await resultResponse.json();
            if (resultData && resultData.length > 0) {
              // Filter results for the current competition
              const filteredResults = resultData.filter(
                (result) => result.competitionId === parseInt(id, 10)
              );
              setPreviousResults(filteredResults);
            }
          } else if (resultResponse.status !== 404) {
            throw new Error(`Error fetching results: ${resultResponse.status}`);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load data.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, userId]);

  // Timer effect
  useEffect(() => {
    if (score !== null) {
      // Stop timer if quiz is submitted
      return;
    }

    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, score]);

  // Handle answer selection
  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  // Handle quiz submission and score calculation
  const handleSubmitQuiz = async () => {
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
    setIsModalOpen(true); // Open the modal to show results

    // Post the result to the API
    try {
      const resultData = {
        competitionId: parseInt(id, 10),
        userId: userId,
        noOfQuestions: questions.length,
        correctAnswers: calculatedScore,
        score: ((calculatedScore / questions.length) * 100).toFixed(2),
        timeAttempted: new Date().toISOString(),
        wrongAnswers: wrongs, // Include wrong answers if needed
      };

      const response = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultData),
      });

      if (!response.ok) {
        throw new Error(`Error posting result: ${response.status}`);
      }

      const savedResult = await response.json();
      // Update the previousResults state with the new result
      setPreviousResults((prevResults) => [savedResult, ...prevResults]);
    } catch (error) {
      console.error('Error posting result:', error);
      // Handle error if needed
    }
  };

  // Format time left in MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
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
      <div className="container mx-auto px-6 flex">
        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-white">Quiz</h1>
            <div className="flex items-center space-x-4">
              <div style={{ width: 60, height: 60 }}>
                <CircularProgressbar
                  value={(timeLeft / 300) * 100}
                  text={`${formatTime(timeLeft)}`}
                  styles={buildStyles({
                    textColor: 'white',
                    textSize: '24px',
                    pathColor: timeLeft > 60 ? '#22c55e' : '#ef4444', // Green to Red
                    trailColor: '#374151',
                  })}
                />
              </div>
              <FaRegClock className="text-white text-2xl" />
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitQuiz();
            }}
          >
            {questions.map((question, index) => (
              <div key={question.id} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  {index + 1}. {question.qText}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['op1', 'op2', 'op3', 'op4'].map((optionKey, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200
                        ${
                          answers[question.id] === question[optionKey]
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white transform scale-105'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={question[optionKey]}
                        checked={answers[question.id] === question[optionKey]}
                        onChange={() =>
                          handleOptionChange(question.id, question[optionKey])
                        }
                        className="form-radio h-5 w-5 text-blue-500"
                      />
                      <span className="ml-3">{question[optionKey]}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-md hover:opacity-90 transition-opacity duration-200 text-lg font-semibold"
            >
              Submit Quiz
            </button>
          </form>

          {/* Custom Modal for showing results */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black bg-opacity-70"
                onClick={() => setIsModalOpen(false)}
              ></div>
              {/* Modal Content */}
              <div className="bg-gray-800 text-white rounded-lg max-w-4xl w-full mx-4 md:mx-auto p-8 z-10 relative transform transition-transform duration-300">
                <h2 className="text-3xl font-bold mb-6 text-center">Quiz Results</h2>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <p className="text-xl">Total Questions: {questions.length}</p>
                    <p className="text-xl">
                      Correct Answers: <span className="text-green-400">{score}</span>
                    </p>
                    <p className="text-xl">
                      Wrong Answers:{' '}
                      <span className="text-red-400">{wrongAnswers.length}</span>
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
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
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
                <div className="flex flex-col md:flex-row md:justify-end md:space-x-4 mt-8">
                  <button
                    onClick={() => {
                      // Reset the quiz if needed
                      setScore(null);
                      setAnswers({});
                      setWrongAnswers([]);
                      setTimeLeft(300);
                      setIsModalOpen(false);
                    }}
                    className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 mb-4 md:mb-0"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full md:w-auto bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar for Previous Results */}
        {previousResults.length > 0 && (
          <div className="hidden lg:block w-1/4 pl-6">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Previous Results</h2>
              <div className="space-y-4 max-h-screen overflow-y-auto pr-2">
                {previousResults.map((result, idx) => (
                  <div key={result.id} className="bg-gray-700 p-4 rounded-lg">
                    <p className="mb-2">
                      <strong>Attempt {previousResults.length - idx}:</strong>{' '}
                      {new Date(result.timeAttempted).toLocaleString()}
                    </p>
                    <p className="mb-1">
                      <strong>Score:</strong> {result.score}%
                    </p>
                    <p className="mb-1">
                      <strong>Correct Answers:</strong> {result.correctAnswers} /{' '}
                      {result.noOfQuestions}
                    </p>
                    {/* Display wrong answers if available */}
                    {result.wrongAnswers && result.wrongAnswers.length > 0 && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-blue-400">
                          View Incorrect Answers
                        </summary>
                        <div className="mt-2 space-y-2">
                          {result.wrongAnswers.map((item, idx) => (
                            <div key={idx} className="bg-gray-600 p-2 rounded">
                              <p className="mb-1">
                                <strong>Q{idx + 1}:</strong> {item.question}
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
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
