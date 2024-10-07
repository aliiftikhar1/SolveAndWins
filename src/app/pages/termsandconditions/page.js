import React from 'react';
import UserLayout from '../../components/userlayout';

function TermsAndConditionsPage() {
  return (
    <UserLayout>
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="relative bg-white shadow">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Terms and Conditions"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-indigo-500 opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-20 px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            User Agreement
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
              Welcome to <span className="font-semibold">Solve and Win</span>. By accessing and using our website, you agree to comply with the following terms and conditions.
            </p>
          </section>

          {/* Use of Website */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Website</h2>
            <p className="text-gray-700 text-lg leading-7">
              Our website provides educational content and hosts timed competitions. You are responsible for ensuring that your use of the site complies with all applicable laws and these terms.
            </p>
          </section>

          {/* Account Responsibilities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Responsibilities</h2>
            <p className="text-gray-700 text-lg leading-7">
              You are responsible for maintaining the confidentiality of your account information and for all activities under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 text-lg leading-7">
              The content on <span className="font-semibold">Solve and Win</span>, including text, graphics, logos, and software, is owned by us or our content suppliers and protected by copyright and intellectual property laws.
            </p>
          </section>

          {/* Conduct */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conduct</h2>
            <p className="text-gray-700 text-lg leading-7 mb-4">
              You agree not to use the site to:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-7 space-y-2">
              <li>Transmit any content that is unlawful, harmful, or invasive of another's privacy.</li>
              <li>Cheat in competitions.</li>
              <li>Harm minors in any way.</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers</h2>
            <p className="text-gray-700 text-lg leading-7">
              <span className="font-semibold">Solve and Win</span> does not guarantee the accuracy or completeness of any information on the site. We are not responsible for any errors or omissions or for the results obtained from the use of such information.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 text-lg leading-7">
              In no event will <span className="font-semibold">Solve and Win</span> be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of or inability to use the site.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 text-lg leading-7">
              We reserve the right to make changes to these terms and conditions at any time. Continued use of the site following any changes indicates your acceptance of the new terms.
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

export default TermsAndConditionsPage;
