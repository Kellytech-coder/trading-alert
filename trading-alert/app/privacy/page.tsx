'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">Crypto Alert</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/about" className="px-5 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              About
            </Link>
            <Link href="/help" className="px-5 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Help
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">
          <span className="gradient-text">Privacy Policy</span>
        </h1>

        <div className="space-y-8 text-gray-300">
          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">1. Introduction</h2>
            <p className="leading-relaxed">
              At Crypto Alert, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our service. Please read this privacy policy 
              carefully. If you do not agree with the terms of this privacy policy, please do not access the service.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Register for an account</li>
              <li>Create price alerts</li>
              <li>Subscribe to our premium service</li>
              <li>Contact us for support</li>
            </ul>
            <p className="leading-relaxed mt-4">
              This information may include your name, email address, and payment information for premium subscribers.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our service</li>
              <li>Notify you when price alerts are triggered</li>
              <li>Process your subscription payments</li>
              <li>Provide customer support</li>
              <li>Improve and optimize our service</li>
            </ul>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">4. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">5. Third-Party Services</h2>
            <p className="leading-relaxed">
              We may use third-party service providers to help us operate our service. These parties have access 
              to your personal information only to perform these tasks on our behalf and are obligated not to 
              disclose or use it for any other purpose.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">6. Cookies</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to track the activity on our service and hold 
              certain information. You can instruct your browser to refuse all cookies or to indicate when a 
              cookie is being sent.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">7. Your Rights</h2>
            <p className="leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Correct any inaccurate personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
            </ul>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">8. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "last updated" date.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">9. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@cryptoalert.com
            </p>
          </section>

          <p className="text-gray-500 text-sm mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Crypto Alert. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
