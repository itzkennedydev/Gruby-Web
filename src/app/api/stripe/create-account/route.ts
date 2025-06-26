import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { homeCooks, users } from '@/server/db/schema';
import { stripe } from '@/lib/stripe-connect';
import { getBaseUrl } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user and home cook associated with this user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.user_id, userId));

    const [cook] = await db
      .select()
      .from(homeCooks)
      .where(eq(homeCooks.userId, userId));

    if (!cook) {
      return NextResponse.json({ error: 'No home cook profile found' }, { status: 404 });
    }

    // Check if account already exists
    if (cook.stripeAccountId) {
      return NextResponse.json({ account: cook.stripeAccountId }, { status: 200 });
    }

    const baseUrl = getBaseUrl();

    // Create Stripe Connect account following official documentation
    const account = await stripe.accounts.create({
      type: 'express',
      business_profile: {
        name: cook.businessName || cook.name,
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.gruby.io',
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    // Update the home cook record with the Stripe account ID
    await db
      .update(homeCooks)
      .set({ 
        stripeAccountId: account.id,
        stripeAccountStatus: account.details_submitted ? 'active' : 'pending' 
      })
      .where(eq(homeCooks.id, cook.id));

    return NextResponse.json({ account: account.id }, { status: 200 });
  } catch (error) {
    console.error('An error occurred when calling the Stripe API to create an account:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 