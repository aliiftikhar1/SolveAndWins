import React from 'react';
import UserLayout from '../../components/userlayout';
import { FaBullseye, FaEye } from 'react-icons/fa';


function AboutUsPage() {
  return (
    <UserLayout>
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Empowering Students"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-32 px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-white md:text-6xl">
            Solve and Win: Empowering Students Through Competition
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About Us</h2>
            <p className="text-xl text-gray-700 leading-8 mb-6">
              Welcome to <span className="font-semibold">Solve and Win</span>, an innovative learning platform designed to help students excel in their academic pursuits by engaging them in competitive and rewarding educational challenges. At <span className="font-semibold">Solve and Win</span>, we believe that learning should be exciting and invigorating. We provide comprehensive course content across various subjects, allowing students to prepare and test their knowledge in a dynamic, real-time environment.
            </p>
            <p className="text-xl text-gray-700 leading-8">
              Our platform is more than just a study tool; it’s a community of learners striving to push their limits. Periodic competitions are announced, offering students the opportunity to showcase their proficiency and speed. These timed tests challenge students to not only understand the material but to master it efficiently and effectively.
            </p>
          </section>

          {/* Mission and Vision */}
          <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Our Mission */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-700 text-white">
              {/* Icon */}
              <FaBullseye className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl leading-8 font-bold text-gray-900">
              Our Mission
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              To transform traditional learning by integrating elements of competition and reward, motivating students to achieve their best.
            </p>
          </div>

          {/* Our Vision */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-700 text-white">
              {/* Icon */}
              <FaEye className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl leading-8 font-bold text-gray-900">
              Our Vision
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              To be the leading educational platform that fosters academic excellence through innovative challenges and learning support.
            </p>
          </div>
        </div>
      </section>

          {/* Call to Action */}
          <section className="mt-16 text-center">
            <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Join us on this exhilarating educational journey
            </h2>
            <p className="mt-4 text-xl text-gray-700 leading-8">
              Where hard work meets recognition and success!
            </p>
            <div className="mt-8">
              <a
                href="/signup"
                className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800"
              >
                Get Started
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} Solve and Win. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </UserLayout>
  );
}

export default AboutUsPage;
