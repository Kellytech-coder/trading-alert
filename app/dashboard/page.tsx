'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Popular cryptocurrencies for the dropdown
const POPULAR_CRYPTOS = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC' },
  { id: 'uniswap', name: 'Uniswap', symbol: 'UNI' },
];

interface Alert {
  id: string;
  crypto: string;
  targetPrice: number;
  condition: string;
  isActive: boolean;
  createdAt: string;
  currentPrice: number | null;
}

interface TriggeredAlert {
  id: string;
  triggeredAt: string;
  priceAtTrigger: number;
  alert: {
    crypto: string;
    targetPrice: number;
    condition: string;
  };
}

interface SubscriptionData {
  isPremium: boolean;
  alertCount: number;
  freeAlertLimit: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [triggeredAlerts, setTriggeredAlerts] = useState<TriggeredAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  
  // Form state
  const [crypto, setCrypto] = useState('bitcoin');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState('above');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchAlerts();
      fetchTriggeredAlerts();
      fetchSubscription();
    }
  }, [session]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions');
      const data = await response.json();
      if (response.ok) {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts');
      const data = await response.json();
      if (response.ok) {
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTriggeredAlerts = async () => {
    try {
      const response = await fetch('/api/alerts/triggered');
      const data = await response.json();
      if (response.ok) {
        setTriggeredAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error('Error fetching triggered alerts:', error);
    }
  };

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crypto, targetPrice, condition }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.upgradeUrl) {
          setFormError(data.message);
        } else {
          setFormError(data.error || 'Failed to create alert');
        }
      } else {
        setFormSuccess('Alert created successfully!');
        setTargetPrice('');
        fetchAlerts();
        fetchSubscription();
      }
    } catch (error) {
      setFormError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts?id=${alertId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchAlerts();
        fetchSubscription();
      }
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  const getCryptoSymbol = (cryptoId: string) => {
    const crypto = POPULAR_CRYPTOS.find(c => c.id === cryptoId);
    return crypto ? crypto.symbol : cryptoId.toUpperCase();
  };

  const getCryptoName = (cryptoId: string) => {
    const crypto = POPULAR_CRYPTOS.find(c => c.id === cryptoId);
    return crypto ? crypto.name : cryptoId;
  };

  if (status === 'loading' || loading) {
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
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
              Pricing
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{session?.user?.name}</p>
                <p className="text-xs text-gray-400">{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Banner */}
        {subscription && !subscription.isPremium && (
          <div className="mb-8 p-4 bg-gradient-to-r from-emerald-900/30 to-purple-900/30 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Upgrade to Premium</p>
                  <p className="text-sm text-gray-400">Get unlimited alerts for just ₦5,000/month</p>
                </div>
              </div>
              <Link
                href="/pricing"
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        )}

        {subscription && subscription.isPremium && (
          <div className="mb-8 p-4 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center premium-badge">
                <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">Premium Active</p>
                <p className="text-sm text-gray-400">You have unlimited alerts and notifications</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Alert Form */}
          <div className="lg:col-span-1">
            <div className="gradient-border p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Create New Alert</h2>
              
              {subscription && (
                <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active Alerts</span>
                    <span className={subscription.alertCount >= subscription.freeAlertLimit ? 'text-red-400' : 'text-emerald-400'}>
                      {subscription.alertCount} / {subscription.freeAlertLimit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${subscription.alertCount >= subscription.freeAlertLimit ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min((subscription.alertCount / subscription.freeAlertLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {formError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm">
                  {formSuccess}
                </div>
              )}

              <form onSubmit={handleCreateAlert} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cryptocurrency</label>
                  <select
                    value={crypto}
                    onChange={(e) => setCrypto(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white"
                  >
                    {POPULAR_CRYPTOS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="50000"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Condition</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCondition('above')}
                      className={`px-4 py-3 rounded-lg font-medium transition-all ${
                        condition === 'above'
                          ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400'
                          : 'bg-gray-800/50 border-2 border-gray-700 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      Above ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => setCondition('below')}
                      className={`px-4 py-3 rounded-lg font-medium transition-all ${
                        condition === 'below'
                          ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                          : 'bg-gray-800/50 border-2 border-gray-700 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      Below ▼
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Alert'}
                </button>
              </form>
            </div>
          </div>

          {/* Alerts List */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
                }`}
              >
                Active Alerts ({alerts.filter(a => a.isActive).length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'history'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
                }`}
              >
                History ({triggeredAlerts.length})
              </button>
            </div>

            {/* Alerts */}
            <div className="space-y-4">
              {activeTab === 'active' ? (
                alerts.length > 0 ? (
                  <div className="grid gap-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="gradient-border p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-xl flex items-center justify-center">
                              <span className="text-lg font-bold text-emerald-400">
                                {getCryptoSymbol(alert.crypto).substring(0, 2)}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-lg">
                                  {getCryptoSymbol(alert.crypto)}
                                </span>
                                {alert.isActive ? (
                                  <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    Active
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                                    Inactive
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 mt-1">
                                Price {alert.condition}{' '}
                                <span className="font-medium text-white">
                                  ${alert.targetPrice.toLocaleString()}
                                </span>
                              </p>
                              {alert.currentPrice && (
                                <p className="text-xs text-gray-500">
                                  Current: ${alert.currentPrice.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteAlert(alert.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <p className="text-gray-400">No alerts yet</p>
                    <p className="text-sm text-gray-500 mt-1">Create your first alert to get started</p>
                  </div>
                )
              ) : triggeredAlerts.length > 0 ? (
                <div className="grid gap-4">
                  {triggeredAlerts.map((alert) => (
                    <div key={alert.id} className="gradient-border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">
                              {getCryptoSymbol(alert.alert.crypto)}
                            </span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                              Triggered
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            Price {alert.alert.condition}{' '}
                            <span className="font-medium">
                              ${alert.alert.targetPrice.toLocaleString()}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            Triggered at: ${alert.priceAtTrigger.toLocaleString()}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(alert.triggeredAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400">No triggered alerts yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
