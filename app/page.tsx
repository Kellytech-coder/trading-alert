'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

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
            <Link href="/about" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              About
            </Link>
            <Link href="/features" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/help" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Help
            </Link>
            <Link href="/contact" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex gap-4 items-center">
            {session ? (
              <>
                <Link href="/dashboard" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
                  Dashboard
                </Link>
                <Link href="/profile" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
                  Sign in
                </Link>
                <Link href="/signup" className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 font-medium transition-all">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Real-time crypto price alerts
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Never Miss</span> a Trading Opportunity
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Set price alerts for your favorite cryptocurrencies and get instant notifications 
            when prices hit your targets.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {!session && (
              <Link
                href="/signup"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25"
              >
                Start Free
              </Link>
            )}
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl border-2 border-gray-700 text-gray-300 text-lg font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all"
            >
              {session ? 'Go to Dashboard' : 'Learn More'}
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="gradient-border p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Notifications</h3>
              <p className="text-gray-400">
                Get email notifications immediately when your price target is reached.
              </p>
            </div>

            <div className="gradient-border p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
              <p className="text-gray-400">
                Accurate price data from major cryptocurrency exchanges.
              </p>
            </div>

            <div className="gradient-border p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Alerts</h3>
              <p className="text-gray-400">
                Receive notifications directly to your inbox, 24/7 monitoring.
              </p>
            </div>
          </div>
        </div>

        {/* Supported Cryptos */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Supported Cryptocurrencies</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Bitcoin', 'Ethereum', 'BNB', 'XRP', 'Cardano', 'Solana', 'Dogecoin', 'Polkadot', 'Litecoin', 'Avalanche', 'Chainlink', 'Polygon', 'Uniswap'].map((crypto) => (
              <span
                key={crypto}
                className="px-5 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-gray-300 hover:border-emerald-500 hover:text-emerald-400 transition-all cursor-default"
              >
                {crypto}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        {!session && (
          <div className="relative py-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-purple-900/20"></div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start?
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Create your free account and set your first price alert in minutes.
              </p>
              <Link
                href="/signup"
                className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Crypto Alert. All rights reserved.</p>
          <p className="text-sm text-gray-600 mt-2">Built with Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
