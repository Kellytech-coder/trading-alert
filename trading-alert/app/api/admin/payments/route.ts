import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Simple admin key check (in production, use proper admin authentication)
const ADMIN_KEY = process.env.ADMIN_KEY || 'admin_secret_key';

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.nextUrl.searchParams.get('admin_key');
    
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pendingPayments = await prisma.user.findMany({
      where: {
        OR: [
          { paymentStatus: 'pending_verification' },
          { paymentStatus: 'pending' },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
        paymentReference: true,
        paymentAmount: true,
        paymentDate: true,
        paymentStatus: true,
        subscriptionStatus: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ payments: pendingPayments });
  } catch (error) {
    console.error('Admin payment list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminKey = req.nextUrl.searchParams.get('admin_key');
    
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, action } = await req.json();

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'User ID and action are required' },
        { status: 400 }
      );
    }

    if (action === 'verify') {
      // Activate premium subscription
      const subscriptionEnd = new Date();
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);

      await prisma.user.update({
        where: { id: userId },
        data: {
          isPremium: true,
          subscriptionStatus: 'active',
          paymentStatus: 'verified',
          subscriptionStartDate: new Date(),
          subscriptionEndDate: subscriptionEnd,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Payment verified and premium activated',
      });
    } else if (action === 'reject') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          isPremium: false,
          subscriptionStatus: 'canceled',
          paymentStatus: 'rejected',
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Payment rejected',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Admin payment action error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment action' },
      { status: 500 }
    );
  }
}
