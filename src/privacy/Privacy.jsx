import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="text-gray-500 mb-8 text-center">
          Effective Date: July 29, 2026
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Privacy Policy for SocialSync
          </h2>
          <p className="text-gray-700 leading-7">
            Welcome to SocialSync. Your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your information
            when you use our application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-7">
            When you connect your social media accounts, we may collect:
          </p>

          <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-2">
            <li>Your name</li>
            <li>Email address</li>
            <li>Profile picture</li>
            <li>Social media account identifiers</li>
            <li>OAuth access and refresh tokens (when provided)</li>
            <li>Basic account information required to provide our services</li>
          </ul>

          <p className="mt-4 text-gray-700 leading-7">
            We only request the permissions necessary to connect your accounts
            and publish content on your behalf.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Authenticate your account</li>
            <li>Connect your social media accounts</li>
            <li>Publish content you choose to post</li>
            <li>Display connected accounts</li>
            <li>Improve the functionality and security of SocialSync</li>
          </ul>

          <p className="mt-4 text-gray-700">
            We do not sell or rent your personal information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Data Storage</h2>
          <p className="text-gray-700 leading-7">
            Your data is stored securely using industry-standard security
            practices. Access tokens and account information are used only to
            provide the features of the application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. Third-Party Services
          </h2>

          <p className="text-gray-700 leading-7">
            SocialSync integrates with third-party platforms including:
          </p>

          <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-2">
            <li>LinkedIn</li>
            <li>YouTube</li>
            <li>TikTok</li>
          </ul>

          <p className="mt-4 text-gray-700">
            Your use of these services is also governed by their respective
            privacy policies and terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Data Sharing</h2>

          <p className="text-gray-700 leading-7">
            We do not sell, trade, or share your personal information with third
            parties except when required by law or when necessary to provide the
            services you request.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>

          <p className="text-gray-700 leading-7">
            You may disconnect your social media accounts at any time. You may
            also request deletion of your stored information by contacting us.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Security</h2>

          <p className="text-gray-700 leading-7">
            We take reasonable technical and organizational measures to protect
            your information. However, no method of electronic storage or
            internet transmission is completely secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            8. Changes to This Policy
          </h2>

          <p className="text-gray-700 leading-7">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>

          <p className="text-gray-700">
            If you have any questions regarding this Privacy Policy, contact us
            at:
          </p>

          <p className="mt-3 font-medium">Email: your-email@example.com</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
