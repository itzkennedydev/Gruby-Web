import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { homeCooks } from '@/server/db/schema';
import { stripe } from '@/lib/stripe-connect';
import { getBaseUrl } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { account } = body;

    if (!account) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    // Verify the account belongs to this user
    const [cook] = await db
      .select()
      .from(homeCooks)
      .where(eq(homeCooks.userId, userId));

    if (!cook || cook.stripeAccountId !== account) {
      return NextResponse.json({ error: 'Account not found or access denied' }, { status: 403 });
    }

    const baseUrl = getBaseUrl();

    // Create Account Link following official documentation
    const accountLink = await stripe.accountLinks.create({
      account: account,
      refresh_url: `${baseUrl}/home-cook-onboarding/${cook.id}`,
      return_url: `${baseUrl}/profile`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url }, { status: 200 });
  } catch (error) {
    console.error('An error occurred when creating the Account Link:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 