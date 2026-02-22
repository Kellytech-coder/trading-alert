import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { amount, transferDate, description } = await req.json();

    if (!amount || !transferDate) {
      return NextResponse.json(
        { error: 'Amount and transfer date are required' },
        { status: 400 }
      );
    }

    // Update user with payment proof submission
    // In a real app, you'd upload the proof to cloud storage
    await prisma.user.update({
      where: { id: user.id },
      data: {
        paymentStatus: 'pending_verification',
        paymentAmount: parseFloat(amount),
        paymentDate: new Date(transferDate),
        subscriptionStatus: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment proof submitted. We will verify and activate your premium within 24 hours.',
    });
  } catch (error) {
    console.error('Payment proof error:', error);
    return NextResponse.json(
      { error: 'Failed to submit payment proof' },
      { status: 500 }
    );
  }
}
