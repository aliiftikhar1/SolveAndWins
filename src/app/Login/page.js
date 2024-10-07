'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // If token exists, redirect to admin home
      router.push('/pages/competitions');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Logging in...');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('Login successful');
      Cookies.set('token', data.token);
      router.push('/admin'); // Redirect to admin home
    } else {
      setStatus(data.message || 'Error logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-500 to-yellow-500">
      <div className="bg-gradient-to-r from-white via-gray-100 to-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-center flex-col items-center mb-6">
          <h1 className='text-5xl text-center font-bold'>Solve And Wins</h1>
          <h2 className="text-2xl font-bold mt-4">Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="mb-4 text-right">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div> */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          {status && <p className="mt-4 text-center text-red-500">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
