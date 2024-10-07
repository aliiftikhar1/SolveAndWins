'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserLayout from "../../../components/userlayout";

export default function Profile() {
    const [user, setUserData] = useState(null);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`/api/user/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching user details: ${response.statusText}`);
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchUserResults = async () => {
            try {
                const response = await fetch(`/api/results/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching user results: ${response.statusText}`);
                }
                const data = await response.json();
                setResults(data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (id) {
            fetchUserDetails();
            fetchUserResults();
        }
    }, [id]);

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!user) {
        return <div className="text-center text-blue-500">Loading...</div>;
    }

    // Function to convert seconds to HH:MM:SS format
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const paddedHours = String(hours).padStart(2, '0');
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');

        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    };

    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                {/* User Profile Card */}
                <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <img
                            src={`https://solveandwins.advanceaitool.com/uploads/${user.image}`}
                            className="w-40 h-40 rounded-full mx-auto md:mx-0 border-4 border-blue-500"
                            alt="User Profile"
                        />
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">{user.fullname}</h2>
                        <p className="text-gray-600"><strong>Father Name:</strong> {user.fathername}</p>
                        <p className="text-gray-600"><strong>Date of Birth:</strong> {user.dob}</p>
                        <p className="text-gray-600"><strong>Education:</strong> {user.education}</p>
                        <p className="text-gray-600"><strong>Institute:</strong> {user.institute}</p>
                        <p className="text-gray-600"><strong>Address:</strong> {user.city}, {user.province}, {user.country}</p>
                        <p className="text-gray-600"><strong>WhatsApp Number:</strong> {user.whatsappNo}</p>
                    </div>
                </div>

                {/* User Results Table */}
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">User Results</h3>
                    {results ? (
                        <table className="w-full text-left bg-white shadow-lg rounded-lg">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-lg">Competition</th>
                                    <th className="py-3 px-6 text-lg">No. of Questions</th>
                                    <th className="py-3 px-6 text-lg">Correct Answers</th>
                                    <th className="py-3 px-6 text-lg">Score</th>
                                    <th className="py-3 px-6 text-lg">Time Taken (HH:MM:SS)</th>
                                    <th className="py-3 px-6 text-lg">Time Attempted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="py-4 px-6 border-b">{result.competition.title}</td>
                                        <td className="py-4 px-6 border-b">{result.noOfQuestions}</td>
                                        <td className="py-4 px-6 border-b">{result.correctAnswers}</td>
                                        <td className="py-4 px-6 border-b">{result.score}</td>
                                        <td className="py-4 px-6 border-b">{formatTime(result.timeTaken)}</td>
                                        <td className="py-4 px-6 border-b">{new Date(result.timeAttempted).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-blue-500">Loading results...</div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
