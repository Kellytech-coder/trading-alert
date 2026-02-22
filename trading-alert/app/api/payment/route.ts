import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GTBANK_CONFIG, generatePaymentReference } from '@/lib/gtbank';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('Session:', JSON.stringify(session));
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized - No email in session' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate payment reference
    const paymentRef = generatePaymentReference();
    console.log('Generated payment reference:', paymentRef);
    
    // Create pending payment record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        paymentReference: paymentRef,
        paymentStatus: 'pending',
        paymentAmount: GTBANK_CONFIG.amount,
        subscriptionStatus: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      paymentReference: paymentRef,
      bankName: GTBANK_CONFIG.bankName,
      accountNumber: GTBANK_CONFIG.accountNumber,
      accountName: GTBANK_CONFIG.accountName,
      amount: GTBANK_CONFIG.amount,
      message: 'Payment reference generated. Please make transfer and submit proof.',
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Failed to generate payment reference: ' + String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized - No email in session' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      bankName: GTBANK_CONFIG.bankName,
      accountNumber: GTBANK_CONFIG.accountNumber,
      accountName: GTBANK_CONFIG.accountName,
      amount: GTBANK_CONFIG.amount,
      currency: GTBANK_CONFIG.currency,
      paymentReference: user.paymentReference,
      paymentStatus: user.paymentStatus,
      isPremium: user.isPremium,
    });
  } catch (error) {
    console.error('Error fetching payment info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment info: ' + String(error) },
      { status: 500 }
    );
  }
}
