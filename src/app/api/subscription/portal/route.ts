import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { homeCooks } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the home cook profile
    const homeCook = await db
      .select()
      .from(homeCooks)
      .where(eq(homeCooks.userId, userId))
      .limit(1);

    if (homeCook.length === 0) {
      return NextResponse.json({ error: 'Home cook profile not found' }, { status: 404 });
    }

    const profile = homeCook[0];

    if (!profile.subscriptionId) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    // Get the subscription to find the customer ID
    const subscription = await stripe.subscriptions.retrieve(profile.subscriptionId);
    
    if (!subscription.customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Create a customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.customer as string,
      return_url: `${request.nextUrl.origin}/profile`,
    });

    return NextResponse.json({ 
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return NextResponse.json({ error: 'Failed to create customer portal session' }, { status: 500 });
  }
} 