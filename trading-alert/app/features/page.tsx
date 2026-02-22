'use client';

import Link from 'next/link';

const features = [
  {
    title: 'Real-Time Price Alerts',
    description: 'Set custom price alerts for 13+ cryptocurrencies and receive instant email notifications when your target is hit.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: 'Multiple Cryptocurrencies',
    description: 'Monitor Bitcoin, Ethereum, and 11 other popular cryptocurrencies all in one place.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Price History Charts',
    description: 'View historical price data and trends to make informed trading decisions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Customizable Alerts',
    description: 'Set alerts for prices going above or below your target. Create multiple alerts per cryptocurrency.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: '24/7 Monitoring',
    description: 'Our servers monitor prices around the clock, so you never miss an opportunity even while you sleep.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Secure Account',
    description: 'Your data is encrypted and we never share your personal information with third parties.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const supportedCryptos = [
  { name: 'Bitcoin', symbol: 'BTC', color: 'from-orange-500 to-orange-600' },
  { name: 'Ethereum', symbol: 'ETH', color: 'from-blue-500 to-blue-600' },
  { name: 'BNB', symbol: 'BNB', color: 'from-yellow-500 to-yellow-600' },
  { name: 'XRP', symbol: 'XRP', color: 'from-gray-500 to-gray-600' },
  { name: 'Cardano', symbol: 'ADA', color: 'from-blue-400 to-blue-500' },
  { name: 'Solana', symbol: 'SOL', color: 'from-purple-500 to-purple-600' },
  { name: 'Dogecoin', symbol: 'DOGE', color: 'from-yellow-400 to-yellow-500' },
  { name: 'Polkadot', symbol: 'DOT', color: 'from-pink-500 to-pink-600' },
  { name: 'Litecoin', symbol: 'LTC', color: 'from-gray-400 to-gray-500' },
  { name: 'Avalanche', symbol: 'AVAX', color: 'from-red-500 to-red-600' },
  { name: 'Chainlink', symbol: 'LINK', color: 'from-blue-600 to-blue-700' },
  { name: 'Polygon', symbol: 'MATIC', color: 'from-purple-600 to-purple-700' },
  { name: 'Uniswap', symbol: 'UNI', color: 'from-pink-400 to-pink-500' },
];

export default function FeaturesPage() {
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
            <Link href="/features" className="px-5 py-2 text-emerald-400 font-medium transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="px-5 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/help" className="px-5 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Help
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for <span className="gradient-text">Crypto Trading</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Everything you need to stay on top of the cryptocurrency market and never miss a trading opportunity.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl border-2 border-gray-700 text-gray-300 text-lg font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="gradient-border p-6 hover:border-emerald-500/50 transition-colors">
                <div className="w-14 h-14 mb-4 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Cryptos */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">13+ Supported Cryptocurrencies</span>
            </h2>
            <p className="text-gray-400">Track all the major cryptocurrencies in one place</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {supportedCryptos.map((crypto) => (
              <div
                key={crypto.symbol}
                className="gradient-border p-4 text-center hover:border-emerald-500/50 transition-colors"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${crypto.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {crypto.symbol.charAt(0)}
                </div>
                <p className="font-medium">{crypto.symbol}</p>
                <p className="text-xs text-gray-500">{crypto.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">How It Works</span>
            </h2>
            <p className="text-gray-400">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Account</h3>
              <p className="text-gray-400">Sign up for free in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Set Alerts</h3>
              <p className="text-gray-400">Choose crypto and target price</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Get Notified</h3>
              <p className="text-gray-400">Receive instant email alerts</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-purple-900/20"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join thousands of crypto traders who never miss an opportunity.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Crypto Alert. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
