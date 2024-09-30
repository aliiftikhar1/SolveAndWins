import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12 text-gray-300">
      <div className="container mx-auto px-6 md:flex md:justify-between">
        {/* Quick Links */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2 hover:text-white">
              <a href="#">About Us</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="#">Competitions</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="#">Blog</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="#">Careers</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="#">Terms of Service</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        {/* Newsletter Subscription */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Stay Updated!</h3>
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest news and exclusive offers.
          </p>
          <form>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 border border-gray-600"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Company Information */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">Company Information</h3>
          <p>&copy; 2023 Solveandwin, Inc. All rights reserved.</p>
          <p className="mt-4">
            123 Innovation Drive, Tech City, TX 75001
          </p>
          <p className="mt-2">Email: support@solveandwin.com</p>
          <p className="mt-2">Phone: +1 (800) 123-4567</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
