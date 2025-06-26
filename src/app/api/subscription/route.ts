import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { homeCooks } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const SUBSCRIPTION_PRICE_ID = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

// Professional subscription description
const SUBSCRIPTION_DESCRIPTION = 'Gruby Home Cook Professional Subscription - Access to unlimited product listings, enhanced visibility, analytics, and priority support to grow your home cooking business.';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate Stripe configuration
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json({ error: 'Stripe configuration error' }, { status: 500 });
    }

    if (!SUBSCRIPTION_PRICE_ID) {
      console.error('STRIPE_SUBSCRIPTION_PRICE_ID is not configured');
      return NextResponse.json({ error: 'Subscription price not configured' }, { status: 500 });
    }

    // Verify the price exists in Stripe
    try {
      await stripe.prices.retrieve(SUBSCRIPTION_PRICE_ID);
    } catch (priceError) {
      console.error('Invalid Stripe price ID:', priceError);
      return NextResponse.json({ error: 'Invalid subscription price configuration' }, { status: 500 });
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

    // Check if they already have an active subscription
    if (profile.subscriptionStatus === 'active') {
      return NextResponse.json({ 
        error: 'You already have an active subscription',
        subscriptionId: profile.subscriptionId 
      }, { status: 400 });
    }

    console.log('Creating checkout session for user:', userId, 'with price:', SUBSCRIPTION_PRICE_ID);

    // Create a checkout session for subscription with 5-day trial
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/profile?subscription=success`,
      cancel_url: `${request.nextUrl.origin}/profile?subscription=cancelled`,
      metadata: {
        homeCookId: profile.id,
        userId: userId,
        homeCookName: profile.name,
        subscriptionType: 'professional',
      },
      customer_email: profile.businessName ? undefined : undefined, // Will be collected in checkout
      subscription_data: {
        metadata: {
          homeCookId: profile.id,
          userId: userId,
          homeCookName: profile.name,
          subscriptionType: 'professional',
        },
        description: SUBSCRIPTION_DESCRIPTION,
        trial_period_days: 5, // 5-day free trial
      },
      payment_intent_data: {
        metadata: {
          homeCookId: profile.id,
          userId: userId,
          homeCookName: profile.name,
          subscriptionType: 'professional',
        },
        description: SUBSCRIPTION_DESCRIPTION,
      },
    });

    console.log('Checkout session created successfully:', session.id);

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    
    // Log more details about the error
    if (error instanceof Stripe.errors.StripeError) {
      console.error('Stripe error details:', {
        type: error.type,
        code: error.code,
        message: error.message,
        decline_code: error.decline_code,
        param: error.param,
      });
    }
    
    return NextResponse.json({ 
      error: 'Failed to create subscription',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the home cook profile with subscription info
    const homeCook = await db
      .select({
        id: homeCooks.id,
        name: homeCooks.name,
        subscriptionStatus: homeCooks.subscriptionStatus,
        subscriptionId: homeCooks.subscriptionId,
        subscriptionEndDate: homeCooks.subscriptionEndDate,
        onboardingCompleted: homeCooks.onboardingCompleted,
      })
      .from(homeCooks)
      .where(eq(homeCooks.userId, userId))
      .limit(1);

    if (homeCook.length === 0) {
      return NextResponse.json({ error: 'Home cook profile not found' }, { status: 404 });
    }

    return NextResponse.json(homeCook[0]);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
} 