'use client'
import { useState } from "react";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/forgetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Password reset link sent successfully!");
            } else {
                setMessage(data.error || "Something went wrong!");
            }
        } catch (error) {
            setMessage("Error sending password reset email. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h2>
            
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Enter your email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
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
                <p className="text-red-500 mt-3 text-center">{message}</p> 
                <p className="mt-4 text-center text-sm text-gray-600">
                    Remembered your password? 
                    <a href="/UserLogin" className="text-blue-500 hover:text-blue-600 font-semibold ml-1">Log in</a>
                </p>
            </div>
        </div>
    );
}
