import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET - List all triggered alerts for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const triggeredAlerts = await prisma.triggeredAlert.findMany({
      where: { userId: session.user.id },
      orderBy: { triggeredAt: 'desc' },
      include: {
        alert: {
          select: {
            crypto: true,
            targetPrice: true,
            condition: true,
          },
        },
      },
    });

    return NextResponse.json({ triggeredAlerts });
  } catch (error) {
    console.error('Error fetching triggered alerts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
