import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-6 md:flex md:justify-between">
        {/* Contact Information */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-4">
            <strong>Email:</strong> support@solveandwin.com
          </p>
          <p className="mb-4">
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
          <p className="mb-4">
            <strong>Address:</strong> 123 Innovation Drive, Tech City, TX 75001
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
        {/* Contact Form */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <form>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700"
            />
            <textarea
              placeholder="Message"
              className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-700"
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
