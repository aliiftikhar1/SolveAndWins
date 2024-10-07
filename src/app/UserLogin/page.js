'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const UserLoginForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [status, setStatus] = useState('');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Registration form state
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    fathername: '',
    education: '',
    institute: '',
    dob: '',
    city: '',
    province: '',
    // fbProfile: '',
    // tiktok: '',
    whatsappNo: '',
    country: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // If token exists, redirect to admin home
      router.push('/pages/competitions');
    }
  }, [router]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setStatus('Logging in...');

    const res = await fetch('/api/userlogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('Login successful');
      Cookies.set('token', data.token);
      router.push('/pages/competitions'); // Redirect to admin home
    } else {
      setStatus(data.message || 'Error logging in');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setStatus('Registering...');

    // Add validation for password match
    if (formData.password !== formData.confirmPassword) {
      setStatus('Passwords do not match');
      return;
    }

    // Send data as JSON
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        fathername: formData.fathername,
        education: formData.education,
        institute: formData.institute,
        dob: formData.dob,
        city: formData.city,
        province: formData.province,
        // fbProfile: formData.fbProfile,
        // tiktok: formData.tiktok,
        whatsappNo: formData.whatsappNo,
        country: formData.country,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('Registration successful');
      setIsLogin(true); // Switch back to login form after successful registration
    } else {
      setStatus(data.message || 'Error registering');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen py-8 flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-500 to-yellow-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-center flex-col items-center mb-6">
          <h1 className="text-5xl text-center font-bold">Solve And Wins</h1>
          <h2 className="text-2xl font-bold mt-4">
            {isLogin ? 'User Login' : 'User Registration'}
          </h2>
        </div>

        {isLogin ? (
          // Login Form
          <form onSubmit={handleLoginSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="">
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
              <div className="">
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
            </div>
            {/* <div className=" text-right">
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
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </p>
          </form>
        ) : (
          // Registration Form
          <form onSubmit={handleRegisterSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Full Name */}
              <div className="">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Email */}
              <div className="">
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
               {/* WhatsApp Number */}
               <div className=" col-span-2">
                <label className="block text-gray-700">WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsappNo"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="WhatsApp Number"
                  value={formData.whatsappNo}
                  onChange={handleInputChange}
                />
              </div>
              {/* Password */}
              <div className="">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Confirm Password */}
              <div className="">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Address */}
              <div className=" col-span-2">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              {/* Father's Name */}
              <div className="">
                <label className="block text-gray-700">Father's Name</label>
                <input
                  type="text"
                  name="fathername"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Father's Name"
                  value={formData.fathername}
                  onChange={handleInputChange}
                />
              </div>
              {/* Education */}
              <div className="">
                <label className="block text-gray-700">Education</label>
                <input
                  type="text"
                  name="education"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Education"
                  value={formData.education}
                  onChange={handleInputChange}
                />
              </div>
              {/* Institute */}
              <div className=" col-span-2">
                <label className="block text-gray-700">Institute</label>
                <input
                  type="text"
                  name="institute"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Institute"
                  value={formData.institute}
                  onChange={handleInputChange}
                />
              </div>
              {/* Date of Birth */}
              <div className="">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
               {/* Country */}
               <div className="">
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
                {/* Province */}
                <div className="">
                <label className="block text-gray-700">Province</label>
                <input
                  type="text"
                  name="province"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleInputChange}
                />
              </div>
              {/* City */}
              <div className="">
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
             
              {/* Facebook Profile */}
              {/* <div className=" col-span-2">
                <label className="block text-gray-700">Facebook Profile</label>
                <input
                  type="url"
                  name="fbProfile"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Facebook Profile URL"
                  value={formData.fbProfile}
                  onChange={handleInputChange}
                />
              </div> */}
              {/* TikTok */}
              {/* <div className=" col-span-2">
                <label className="block text-gray-700">TikTok</label>
                <input
                  type="text"
                  name="tiktok"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="TikTok Username"
                  value={formData.tiktok}
                  onChange={handleInputChange}
                />
              </div> */}
             
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Register
            </button>
            {status && <p className="mt-4 text-center text-red-500">{status}</p>}
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserLoginForm;
