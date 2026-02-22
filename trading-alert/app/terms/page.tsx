'use client';

import Link from 'next/link';

export default function TermsPage() {
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
          <span className="gradient-text">Terms of Service</span>
        </h1>

        <div className="space-y-8 text-gray-300">
          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using Crypto Alert, you accept and agree to be bound by the terms and provision 
              of this agreement. Additionally, when using Crypto Alert's services, you shall be subject to any 
              posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">2. Description of Service</h2>
            <p className="leading-relaxed mb-4">
              Crypto Alert provides users with cryptocurrency price monitoring and alert services, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Real-time price tracking for supported cryptocurrencies</li>
              <li>Customizable price alerts sent via email</li>
              <li>Dashboard for managing alerts</li>
              <li>Premium subscription with enhanced features</li>
            </ul>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">3. User Registration</h2>
            <p className="leading-relaxed mb-4">
              To use our service, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">4. Subscription and Payments</h2>
            <p className="leading-relaxed mb-4">
              Our premium subscription service:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Costs ₦5,000 Naira per month</li>
              <li>Automatically renews unless cancelled</li>
              <li>Can be cancelled at any time from your profile</li>
              <li>Refunds are not provided for partial months</li>
            </ul>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">5. User Conduct</h2>
            <p className="leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to the service</li>
              <li>Interfere with or disrupt the service</li>
              <li>Create multiple accounts to bypass restrictions</li>
              <li>Use the service to send spam or malicious content</li>
            </ul>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">6. Intellectual Property</h2>
            <p className="leading-relaxed">
              The Crypto Alert service, including all content, features, and functionality, is owned by us 
              and is protected by international copyright, trademark, patent, trade secret, and other 
              intellectual property or proprietary rights laws.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">7. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO REPRESENTATIONS 
              OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED 
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">8. Limitation of Liability</h2>
            <p className="leading-relaxed">
              IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR 
              PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, 
              OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO 
              ACCESS OR USE THE SERVICE.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">9. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless Crypto Alert and its officers, directors, 
              employees, agents, and affiliates from and against any and all claims, damages, obligations, 
              losses, liabilities, costs, and expenses arising from your use of the service.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">10. Termination</h2>
            <p className="leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, 
              for any reason, including breach of these Terms. Upon termination, your right to use the 
              Service will immediately cease.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">11. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Nigeria, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">12. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of any 
              material changes by posting the new Terms on this page. Your continued use of the service 
              after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="gradient-border p-6">
            <h2 className="text-xl font-bold mb-4 text-white">13. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at support@cryptoalert.com
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
