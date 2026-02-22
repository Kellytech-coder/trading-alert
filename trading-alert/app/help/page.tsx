'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I create a price alert?',
    answer: 'Go to your Dashboard and use the form on the left to create a new alert. Select your desired cryptocurrency, target price, and condition (above or below).'
  },
  {
    question: 'What is the difference between Free and Premium?',
    answer: 'Free users can create up to 3 alerts and receive 10 email notifications per month. Premium users get unlimited alerts and notifications for ₦5,000/month.'
  },
  {
    question: 'How do I upgrade to Premium?',
    answer: 'Click on "Pricing" in the navigation menu or the "Upgrade Now" button on your dashboard. Transfer ₦5,000 to the GTBank account provided and submit your payment proof.'
  },
  {
    question: 'How long does premium activation take?',
    answer: 'Once you submit your payment proof, we verify it within 24 hours. Your premium will be activated immediately after verification.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can manage your subscription from the Profile page. Your premium features will remain active until the end of your current billing period.'
  },
  {
    question: "Why didn't I receive an email notification?",
    answer: 'Check if you have reached your monthly limit (10 for free users), verify your email is correct, check spam/junk folder, or ensure at least one alert has been triggered.'
  },
  {
    question: 'How often are prices updated?',
    answer: 'Free users get price checks every 5 minutes, while Premium members enjoy near real-time updates every minute.'
  },
  {
    question: 'What cryptocurrencies are supported?',
    answer: 'We support Bitcoin, Ethereum, BNB, XRP, Cardano, Solana, Dogecoin, Polkadot, Litecoin, Avalanche, Chainlink, Polygon, and Uniswap.'
  }
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex gap-4">
            <Link href="/dashboard" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Help & Support</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get answers to common questions about Crypto Alert
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500"
          />
        </div>

        {/* Contact Card */}
        <div className="max-w-md mx-auto mb-12 gradient-border p-6 text-center">
          <p className="text-lg font-medium text-white mb-2">Still need help?</p>
          <p className="text-gray-400 mb-4">Contact our support team</p>
          <a
            href="mailto:support@cryptoalert.com"
            className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all"
          >
            Contact Support
          </a>
        </div>

        {/* FAQs Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="gradient-border p-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-medium text-white">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <p className="mt-3 pt-3 border-t border-gray-800 text-sm text-gray-400">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No FAQs found matching your search.
          </div>
        )}
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
