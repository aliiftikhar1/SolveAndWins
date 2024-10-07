import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import UserLayout from '../../components/userlayout';

function ContactUsPage() {
  return (
    <UserLayout>
      {/* Main Container */}
      <div className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <div className="bg-purple-700 text-center py-16">
          <h1 className="text-5xl font-extrabold text-white">Contact Us</h1>
          <p className="mt-4 text-xl text-purple-100">
            We'd love to hear from you!
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone Card */}
              <div className="bg-white shadow-xl rounded-lg p-8 flex items-center">
                <FaPhoneAlt className="h-16 w-16 text-purple-700 mr-6" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Phone</h2>
                  <p className="mt-4 text-lg text-gray-700">
                    +1 (123) 456-7890
                  </p>
                </div>
              </div>
              {/* Email Card */}
              <div className="bg-white shadow-xl rounded-lg p-8 flex items-center">
                <FaEnvelope className="h-16 w-16 text-purple-700 mr-6" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Email</h2>
                  <p className="mt-4 text-lg text-gray-700">
                    support@solveandwin.com
                  </p>
                </div>
              </div>
              {/* Address Card */}
              <div className="bg-white shadow-xl rounded-lg p-8 flex items-center">
                <FaMapMarkerAlt className="h-16 w-16 text-purple-700 mr-6" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Address</h2>
                  <p className="mt-4 text-lg text-gray-700">
                    123 Education Lane, Knowledge City
                  </p>
                </div>
              </div>
              {/* Working Hours Card */}
              <div className="bg-white shadow-xl rounded-lg p-8 flex items-center">
                <FaClock className="h-16 w-16 text-purple-700 mr-6" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Working Hours
                  </h2>
                  <p className="mt-4 text-lg text-gray-700">
                    Mon - Fri: 9 AM - 5 PM
                  </p>
                </div>
              </div>
            </div>
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

export default ContactUsPage;
