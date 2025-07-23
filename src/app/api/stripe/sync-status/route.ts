import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { homeCooks } from '@/server/db/schema';
import { stripe } from '@/lib/stripe-connect';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    console.log('Sync status called for user:', userId);
    
    if (!userId) {
      console.log('No user ID found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [cook] = await db
      .select()
      .from(homeCooks)
      .where(eq(homeCooks.userId, userId));

    console.log('Found home cook:', cook ? 'yes' : 'no');

    if (!cook?.stripeAccountId) {
      console.log('No Stripe account ID found for user');
      return NextResponse.json({ error: 'No Stripe account linked' }, { status: 400 });
    }

    console.log('Stripe account ID:', cook.stripeAccountId);

    // Retrieve the Stripe account to get current status
    const account = await stripe.accounts.retrieve(cook.stripeAccountId);
    console.log('Stripe account status:', account.details_submitted);

    // Update the home cook record with current status
    await db
      .update(homeCooks)
      .set({
        onboardingCompleted: account.details_submitted ? 'true' : 'false',
        stripeAccountStatus: account.details_submitted ? 'active' : 'pending',
      })
      .where(eq(homeCooks.id, cook.id));

    const result = { 
      success: true,
      status: account.details_submitted ? 'active' : 'pending',
      onboardingCompleted: account.details_submitted
    };
    
    console.log('Returning result:', result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('An error occurred when syncing the account status:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 