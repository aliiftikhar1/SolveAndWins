'use client'
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ResetPassword() {
    const params = useParams();
    const email = decodeURIComponent(params.id); // Decode the email fetched from URL
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('/api/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Password reset successfully!");
            } else {
                setMessage(data.error || "Something went wrong!");
            }
        } catch (error) {
            setMessage("Error resetting password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h2>
                <p className="text-sm text-gray-600 text-center mb-6">Email: {email}</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
                {message && (<div className="w-full flex flex-col"><p className="mt-4 text-center text-sm text-red-600">{message}</p>
                <a href="/UserLogin" className="text-black font-bold hover:text-blue-700 text-center py-2 px-4 mt-3 bg-gray-400">
                    Goto Login Page
                </a>
                </div>)
                }
            </div>
        </div>
    );
}
