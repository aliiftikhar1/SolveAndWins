import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12 text-gray-300">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-7 md:justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-4">
            <strong>Email:</strong> solveandwins@gmail.com
          </p>
          <p className="mb-4">
            <strong>Phone:</strong> +923356768338
          </p>
          <p className="mb-4">
            <strong>Address:</strong> Mandi Bahaduddin, Punjab, Pakistan
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-2xl hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2 hover:text-white">
              <a href="/pages/aboutus">About Us</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="/pages/competitions">Competitions</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="/pages/blog">Blog</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="/pages/contactus">Contact Us</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="/pages/termsandconditions">Terms & Conditions</a>
            </li>
            <li className="mb-2 hover:text-white">
              <a href="/pages/privacypolicy">Privacy Policy</a>
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
          <p className="mt-2">Email: solveandwins@gmail.com</p>
          <p className="mt-2">Phone: +923356768338</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
