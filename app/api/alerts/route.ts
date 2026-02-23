import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getCryptoPrice } from '@/lib/crypto';

// GET - List all alerts for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const alerts = await prisma.alert.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        triggeredAlerts: {
          orderBy: { triggeredAt: 'desc' },
          take: 1,
        },
      },
    });

    // Get current prices for each alert
    const alertsWithPrices = await Promise.all(
      alerts.map(async (alert: any) => {
        const priceData = await getCryptoPrice(alert.crypto);
        return {
          ...alert,
          currentPrice: priceData?.usd || null,
        };
      })
    );

    return NextResponse.json({ alerts: alertsWithPrices });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new alert
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user to check subscription status
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { crypto, targetPrice, condition } = await request.json();

    // Validate input
    if (!crypto || !targetPrice || !condition) {
      return NextResponse.json(
        { error: 'Crypto, target price, and condition are required' },
        { status: 400 }
      );
    }

    if (condition !== 'above' && condition !== 'below') {
      return NextResponse.json(
        { error: 'Condition must be either "above" or "below"' },
        { status: 400 }
      );
    }

    // Check free tier limit (only for non-premium users)
    if (!user.isPremium) {
      const activeAlerts = await prisma.alert.count({
        where: {
          userId: session.user.id,
          isActive: true,
        },
      });

      const FREE_ALERT_LIMIT = 3;

      if (activeAlerts >= FREE_ALERT_LIMIT) {
        return NextResponse.json(
          { 
            error: 'Free tier limit reached',
            message: 'You have reached the maximum of 3 free alerts. Upgrade to Premium for unlimited alerts!',
            upgradeUrl: '/pricing',
            limit: FREE_ALERT_LIMIT,
            current: activeAlerts,
          },
          { status: 403 }
        );
      }
    }

    // Verify the crypto exists by getting its price
    const priceData = await getCryptoPrice(crypto);
    if (!priceData) {
      return NextResponse.json(
        { error: 'Invalid cryptocurrency' },
        { status: 400 }
      );
    }

    // Create the alert
    const alert = await prisma.alert.create({
      data: {
        userId: session.user.id,
        crypto: crypto.toLowerCase(),
        targetPrice: parseFloat(targetPrice),
        condition,
        isActive: true,
      },
    });

    return NextResponse.json(
      { message: 'Alert created successfully', alert },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an alert
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const alertId = searchParams.get('id');

    if (!alertId) {
      return NextResponse.json(
        { error: 'Alert ID is required' },
        { status: 400 }
      );
    }

    // Verify the alert belongs to the user
    const alert = await prisma.alert.findFirst({
      where: {
        id: alertId,
        userId: session.user.id,
      },
    });

    if (!alert) {
      return NextResponse.json(
        { error: 'Alert not found' },
        { status: 404 }
      );
    }

    // Delete the alert (this will also delete triggered alerts due to cascade)
    await prisma.alert.delete({
      where: { id: alertId },
    });

    return NextResponse.json({ message: 'Alert deleted successfully' });
  } catch (error) {
    console.error('Error deleting alert:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
