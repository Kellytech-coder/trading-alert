'use client';

import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/login" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">About Crypto Alert</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your trusted companion for cryptocurrency price monitoring and instant notifications
          </p>
        </div>

        {/* Mission Section */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Crypto Alert was built with a simple mission: to help cryptocurrency traders never miss a trading opportunity. 
            We believe that everyone should have access to real-time price alerts, regardless of their trading experience 
            or budget. That's why we offer a generous free tier alongside our premium subscription.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="gradient-border p-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Notifications</h3>
            <p className="text-gray-400">
              Get email notifications the moment your target price is reached. Never miss a trade again.
            </p>
          </div>

          <div className="gradient-border p-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Prices</h3>
            <p className="text-gray-400">
              We track prices from major exchanges to give you accurate, up-to-the-minute data.
            </p>
          </div>

          <div className="gradient-border p-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Flexible Pricing</h3>
            <p className="text-gray-400">
              Start free with 3 alerts, upgrade to premium for unlimited notifications.
            </p>
          </div>

          <div className="gradient-border p-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-gray-400">
              Your data is encrypted and we never share your information with third parties.
            </p>
          </div>
        </div>

        {/* Supported Cryptos */}
        <div className="gradient-border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Supported Cryptocurrencies</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Bitcoin', 'Ethereum', 'BNB', 'XRP', 'Cardano', 'Solana', 'Dogecoin', 'Polkadot', 'Litecoin', 'Avalanche', 'Chainlink', 'Polygon', 'Uniswap'].map((crypto) => (
              <span
                key={crypto}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300"
              >
                {crypto}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-6">Ready to start monitoring your favorite cryptocurrencies?</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3 border-2 border-emerald-500 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/10 transition-all"
            >
              View Pricing
            </Link>
          </div>
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
