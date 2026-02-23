import { NextResponse } from 'next/server';
import { checkAllAlerts } from '@/lib/alerts';

// This endpoint should be protected by a secret key in production
// It's designed to be called by an external cron service (e.g., Vercel Cron, Railway Cron)
export async function GET(request: Request) {
  try {
    // Check for authorization header in production
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // In production, verify the cron secret
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Starting scheduled alert check...');
    await checkAllAlerts();
    console.log('Scheduled alert check completed');

    return NextResponse.json({
      success: true,
      message: 'Alert check completed',
    });
  } catch (error) {
    console.error('Error in scheduled alert check:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
