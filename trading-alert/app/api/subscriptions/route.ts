import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const FREE_ALERT_LIMIT = 3;
const FREE_EMAIL_LIMIT = 10;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        alerts: {
          where: { isActive: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Reset email count if it's a new month
    const now = new Date();
    if (user.lastEmailReset) {
      const lastReset = new Date(user.lastEmailReset);
      if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailsThisMonth: 0,
            lastEmailReset: now,
          },
        });
        user.emailsThisMonth = 0;
      }
    }

    return NextResponse.json({
      isPremium: user.isPremium,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionEndDate: user.subscriptionEndDate,
      alertCount: user.alerts.length,
      freeAlertLimit: FREE_ALERT_LIMIT,
      freeEmailLimit: FREE_EMAIL_LIMIT,
      emailsThisMonth: user.emailsThisMonth,
    });
  } catch (error) {
    console.error('Subscription fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}
