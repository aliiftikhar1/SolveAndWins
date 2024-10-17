import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="container z-50 mx-auto px-6 py-20 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          Unleash Your Potential. Win Exciting Prizes!
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-center max-w-2xl">
          Join Solveandwin: Compete, Solve Challenges, and Earn Rewards Like Never Before
        </p>
        <div className="mt-8 flex space-x-4">
          <a
            href="/UserLogin"
            className="md:px-6 md:py-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-medium md:text-lg font-semibold cursor-pointer"
          >
            Get Started Now
          </a>
          <a
            href="/pages/competitions"
            className="md:px-6 md:py-3 px-4 py-2 bg-transparent border cursor-pointer border-white hover:bg-white hover:text-gray-900 rounded-md text-medium md:text-lg font-semibold"
          >
            Explore Competitions
          </a>
        </div>
      </div>
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-fixed bg-center opacity-30"
        style={{ backgroundImage: 'url(/pro1.png)' }}
      ></div> */}
    </section>
  );
};

export default HeroSection;
