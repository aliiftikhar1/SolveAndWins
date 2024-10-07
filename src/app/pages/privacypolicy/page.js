import React from 'react';
import UserLayout from '../../components/userlayout';

function PrivacyPolicyPage() {
  return (
    <UserLayout>
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="relative bg-white shadow">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Privacy Policy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-500 opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-20 px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Commitment to Your Privacy
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 text-lg leading-7">
              At <span className="font-semibold">Solve and Win</span>, we are committed to protecting the privacy and security of our users. This Privacy Policy outlines the types of information we collect, how it is used, and the steps we take to protect it.
            </p>
          </section>

          {/* Information Collection */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Collection</h2>
            <p className="text-gray-700 text-lg leading-7">
              We collect information in several ways, including when you register on our site, participate in a competition, or contact us directly. The information collected may include your name, email address, educational background, and performance data.
            </p>
          </section>

          {/* Use of Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Information</h2>
            <p className="text-gray-700 text-lg leading-7 mb-4">
              The information we collect is used to:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-7 space-y-2">
              <li>Provide and improve our services.</li>
              <li>Conduct competitions and announce winners.</li>
              <li>Communicate important updates and offers.</li>
              <li>Respond to inquiries and support needs.</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 text-lg leading-7">
              We implement a variety of security measures to maintain the safety of your personal information. Access to personal data is restricted, and sensitive data is encrypted.
            </p>
          </section>

          {/* Third-Party Disclosure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Disclosure</h2>
            <p className="text-gray-700 text-lg leading-7">
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except where necessary to provide our services (e.g., hosting partners, advisors).
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Rights</h2>
            <p className="text-gray-700 text-lg leading-7">
              You have the right to access, correct, or delete your personal information. For any such requests, please contact us at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.
            </p>
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

export default PrivacyPolicyPage;
