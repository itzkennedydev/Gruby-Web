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

    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
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

    console.log(`[Debug] Updating subscription for user ${userId} with subscription ID ${subscriptionId}`);

    // Fetch subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    console.log(`[Debug] Stripe subscription status: ${subscription.status}`);
    
    // Update the database
    await db
      .update(homeCooks)
      .set({
        subscriptionStatus: subscription.status,
        subscriptionId: subscription.id,
        subscriptionEndDate: new Date(subscription.current_period_end * 1000),
        onboardingCompleted: subscription.status === 'active' ? 'true' : profile.onboardingCompleted,
      })
      .where(eq(homeCooks.id, profile.id));

    console.log(`[Debug] Successfully updated subscription status to ${subscription.status}`);

    return NextResponse.json({ 
      success: true, 
      subscriptionStatus: subscription.status,
      subscriptionId: subscription.id,
      message: 'Subscription status updated successfully'
    });
  } catch (error) {
    console.error('[Debug] Error updating subscription:', error);
    return NextResponse.json({ 
      error: 'Failed to update subscription',
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

    // Get the home cook profile
    const homeCook = await db
      .select({
        id: homeCooks.id,
        name: homeCooks.name,
        subscriptionStatus: homeCooks.subscriptionStatus,
        subscriptionId: homeCooks.subscriptionId,
        subscriptionEndDate: homeCooks.subscriptionEndDate,
        onboardingCompleted: homeCooks.onboardingCompleted,
        userId: homeCooks.userId,
      })
      .from(homeCooks)
      .where(eq(homeCooks.userId, userId))
      .limit(1);

    if (homeCook.length === 0) {
      return NextResponse.json({ error: 'Home cook profile not found' }, { status: 404 });
    }

    const profile = homeCook[0];

    console.log(`[Debug] Current profile status:`, {
      userId: profile.userId,
      subscriptionStatus: profile.subscriptionStatus,
      subscriptionId: profile.subscriptionId,
      onboardingCompleted: profile.onboardingCompleted,
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('[Debug] Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
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

    console.log(`[Debug] Manually setting subscription to active for user ${userId}`);

    // Manually set subscription as active
    await db
      .update(homeCooks)
      .set({
        subscriptionStatus: 'active',
        subscriptionId: profile.subscriptionId || 'manual_activation',
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        onboardingCompleted: 'true',
      })
      .where(eq(homeCooks.id, profile.id));

    console.log(`[Debug] Successfully set subscription to active`);

    return NextResponse.json({ 
      success: true, 
      subscriptionStatus: 'active',
      message: 'Subscription manually set to active for testing'
    });
  } catch (error) {
    console.error('[Debug] Error setting subscription:', error);
    return NextResponse.json({ 
      error: 'Failed to set subscription',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 