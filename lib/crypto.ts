import axios from 'axios';

// CoinGecko API base URL
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Map of common crypto IDs for CoinGecko API
export const CRYPTO_MAP: Record<string, string> = {
  bitcoin: 'bitcoin',
  btc: 'bitcoin',
  ethereum: 'ethereum',
  eth: 'ethereum',
  binancecoin: 'binancecoin',
  bnb: 'binancecoin',
  ripple: 'ripple',
  xrp: 'ripple',
  cardano: 'cardano',
  ada: 'cardano',
  solana: 'solana',
  sol: 'solana',
  dogecoin: 'dogecoin',
  doge: 'dogecoin',
  polkadot: 'polkadot',
  dot: 'polkadot',
  litecoin: 'litecoin',
  ltc: 'litecoin',
  avalanche: 'avalanche-2',
  avax: 'avalanche-2',
  chainlink: 'chainlink',
  link: 'chainlink',
  polygon: 'matic-network',
  matic: 'matic-network',
  uniswap: 'uniswap',
  uni: 'uniswap',
};

// Get the CoinGecko ID for a crypto symbol
export const getCoinGeckoId = (crypto: string): string => {
  const lowerCrypto = crypto.toLowerCase();
  return CRYPTO_MAP[lowerCrypto] || lowerCrypto;
};

// Interface for price data
export interface CryptoPrice {
  usd: number;
  usd_24h_change?: number;
}

// Get current price for a single cryptocurrency
export const getCryptoPrice = async (crypto: string): Promise<CryptoPrice | null> => {
  try {
    const coinId = getCoinGeckoId(crypto);
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: {
        ids: coinId,
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    });

    if (response.data && response.data[coinId]) {
      return {
        usd: response.data[coinId].usd,
        usd_24h_change: response.data[coinId].usd_24h_change,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${crypto}:`, error);
    return null;
  }
};

// Get current prices for multiple cryptocurrencies
export const getMultipleCryptoPrices = async (cryptos: string[]): Promise<Record<string, CryptoPrice>> => {
  try {
    const coinIds = cryptos.map(c => getCoinGeckoId(c)).join(',');
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: {
        ids: coinIds,
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    });

    const prices: Record<string, CryptoPrice> = {};
    
    if (response.data) {
      for (const crypto of cryptos) {
        const coinId = getCoinGeckoId(crypto);
        if (response.data[coinId]) {
          prices[crypto.toLowerCase()] = {
            usd: response.data[coinId].usd,
            usd_24h_change: response.data[coinId].usd_24h_change,
          };
        }
      }
    }
    
    return prices;
  } catch (error) {
    console.error('Error fetching multiple prices:', error);
    return {};
  }
};

// Get list of supported cryptocurrencies
export const getSupportedCryptos = async (): Promise<Array<{ id: string; symbol: string; name: string }>> => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/list`);
    return response.data.slice(0, 100); // Return first 100 for dropdown
  } catch (error) {
    console.error('Error fetching supported cryptos:', error);
    return [];
  }
};

// Get top cryptocurrencies by market cap
export const getTopCryptos = async (limit: number = 20): Promise<Array<{
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}>> => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top cryptos:', error);
    return [];
  }
};
