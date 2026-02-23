import { NextResponse } from 'next/server';
import { getTopCryptos, getCryptoPrice } from '@/lib/crypto';

// GET - Get market data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const crypto = searchParams.get('crypto');
    const top = searchParams.get('top');

    // If requesting a specific crypto
    if (crypto) {
      const priceData = await getCryptoPrice(crypto);
      
      if (!priceData) {
        return NextResponse.json(
          { error: 'Cryptocurrency not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        crypto: crypto.toLowerCase(),
        price: priceData.usd,
        change24h: priceData.usd_24h_change,
      });
    }

    // If requesting top cryptos
    if (top) {
      const limit = parseInt(top) || 20;
      const topCryptos = await getTopCryptos(limit);
      return NextResponse.json({ cryptos: topCryptos });
    }

    // Default: return top 10 cryptos
    const topCryptos = await getTopCryptos(10);
    return NextResponse.json({ cryptos: topCryptos });
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
