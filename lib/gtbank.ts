// GTBank Payment Configuration
// This is a manual payment system - users transfer to the account and submit proof

export const GTBANK_CONFIG = {
  bankName: 'GTBank',
  accountNumber: '0449984469',
  accountName: 'CRYPTO ALERT', // Account name for account 0449984469
  amount: 5000, // N5,000 Naira per month
  currency: 'NGN',
};

// Generate payment reference
export function generatePaymentReference(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CA${timestamp}${random}`;
}
