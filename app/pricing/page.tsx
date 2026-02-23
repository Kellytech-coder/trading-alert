'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PaymentInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  currency: string;
  paymentReference: string | null;
  paymentStatus: string | null;
  isPremium: boolean;
}

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Payment proof form
  const [amount, setAmount] = useState('');
  const [transferDate, setTransferDate] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchPaymentInfo();
    }
  }, [session]);

  const fetchPaymentInfo = async () => {
    try {
      const response = await fetch('/api/payment');
      const data = await response.json();
      console.log('Payment info response:', data);
      if (response.ok) {
        setPaymentInfo(data);
      } else {
        // If error, still show payment details
        setPaymentInfo({
          bankName: 'GTBank',
          accountNumber: '0449984469',
          accountName: 'CRYPTO ALERT',
          amount: 5000,
          currency: 'NGN',
          paymentReference: null,
          paymentStatus: null,
          isPremium: false,
        });
      }
    } catch (error) {
      console.error('Error fetching payment info:', error);
      // Show default payment details
      setPaymentInfo({
        bankName: 'GTBank',
        accountNumber: '0449984469',
        accountName: 'CRYPTO ALERT',
        amount: 5000,
        currency: 'NGN',
        paymentReference: null,
        paymentStatus: null,
        isPremium: false,
      });
    }
  };

  const handleInitiatePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
      });

      const data = await response.json();
      console.log('Payment POST response:', data);

      if (response.ok) {
        setPaymentInfo(prev => prev ? { ...prev, ...data } : data);
        setSuccess('Payment reference generated! Please transfer ₦5,000 to the account below.');
      } else {
        setError(data.error || 'Failed to generate payment reference');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProof = async () => {
    if (!amount || !transferDate) {
      setError('Please enter the amount and transfer date');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/payment/proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, transferDate }),
      });

      const data = await response.json();
      console.log('Proof submission response:', data);

      if (response.ok) {
        setSuccess(data.message);
        setAmount('');
        setTransferDate('');
        fetchPaymentInfo();
      } else {
        setError(data.error || 'Failed to submit payment proof');
      }
    } catch (error) {
      console.error('Error submitting proof:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading' || !paymentInfo) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    );
  }

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
            <Link href="/pricing" className="px-4 py-2 text-emerald-400 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/help" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Help
            </Link>
            <Link href="/contact" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/dashboard" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/profile" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Upgrade to Premium</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get unlimited alerts and faster price updates with our premium plan
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-center">
            {success}
          </div>
        )}

        {/* Current Status */}
        {paymentInfo.isPremium ? (
          <div className="max-w-md mx-auto mb-8 p-6 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/20 rounded-xl text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-amber-400 mb-2">You are Premium!</h2>
            <p className="text-gray-300">You have unlimited alerts and notifications.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Payment Instructions */}
            <div className="gradient-border p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>
                <div className="text-5xl font-bold gradient-text mb-2">₦5,000</div>
                <p className="text-gray-400">per month</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-400">Bank Name</span>
                  <span className="font-medium">{paymentInfo.bankName}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-400">Account Number</span>
                  <span className="font-bold text-2xl text-emerald-400">{paymentInfo.accountNumber}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-400">Account Name</span>
                  <span className="font-medium">{paymentInfo.accountName}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-bold text-emerald-400 text-xl">₦{paymentInfo.amount.toLocaleString()}</span>
                </div>
              </div>

              {paymentInfo.paymentReference ? (
                <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                  <p className="text-sm text-gray-400 mb-1">Payment Reference</p>
                  <p className="font-mono font-bold text-emerald-400">{paymentInfo.paymentReference}</p>
                </div>
              ) : (
                <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-4">
                  <p className="text-sm text-blue-400">
                    Transfer ₦5,000 to the account above, then submit proof on the right.
                  </p>
                </div>
              )}
            </div>

            {/* Submit Payment Proof */}
            <div className="gradient-border p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Submit Payment Proof</h3>
              
              {paymentInfo.paymentStatus === 'pending_verification' || paymentInfo.paymentStatus === 'pending' ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">⏳</div>
                  <p className="text-gray-300 mb-2">Payment proof submitted!</p>
                  <p className="text-sm text-gray-500">We will verify and activate your premium within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount Transferred (₦)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="5000"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Transfer Date
                    </label>
                    <input
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                    />
                  </div>
                  <button
                    onClick={handleSubmitProof}
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 mt-4"
                  >
                    {submitting ? 'Submitting...' : 'Submit Payment Proof'}
                  </button>
                </div>
              )}

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-sm text-yellow-400">
                  <strong>Note:</strong> After you transfer, please submit your payment proof above. 
                  We will verify and activate your premium within 24 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Features Comparison */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Plan Features</h2>
          <div className="gradient-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-400">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-emerald-400">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-300">Active Alerts</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-400">3</td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-emerald-400">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-300">Email Notifications</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-400">10/month</td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-emerald-400">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-300">Price Check Frequency</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-400">5 min</td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-emerald-400">1 min</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-300">Supported Cryptos</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-400">13</td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-emerald-400">13</td>
                </tr>
              </tbody>
            </table>
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
