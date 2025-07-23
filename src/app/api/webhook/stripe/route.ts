import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { db } from '@/server/db';
import { homeCooks } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    console.log('[Webhook] Received webhook request');
    const body = await request.text();
    const signature = headers().get('stripe-signature')!;

    console.log('[Webhook] Signature received:', !!signature);
    console.log('[Webhook] Body length:', body.length);

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('[Webhook] Event constructed successfully:', event.type);
    } catch (err) {
      console.error('[Webhook] Signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('[Webhook] Processing event type:', event.type);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('[Webhook] Handling checkout.session.completed');
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.created':
        console.log('[Webhook] Handling customer.subscription.created');
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.updated':
        console.log('[Webhook] Handling customer.subscription.updated');
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        console.log('[Webhook] Handling customer.subscription.deleted');
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case 'invoice.payment_succeeded':
        console.log('[Webhook] Handling invoice.payment_succeeded');
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        console.log('[Webhook] Handling invoice.payment_failed');
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    console.log('[Webhook] Event processed successfully');
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Webhook] Error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (session.mode === 'subscription' && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    await handleSubscriptionCreated(subscription);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const homeCookId = subscription.metadata.homeCookId;
  
  if (homeCookId) {
    try {
      await db
        .update(homeCooks)
        .set({
          subscriptionStatus: subscription.status,
          subscriptionId: subscription.id,
          subscriptionEndDate: new Date(subscription.current_period_end * 1000),
          onboardingCompleted: subscription.status === 'active' ? 'true' : undefined,
        })
        .where(eq(homeCooks.id, homeCookId));
      console.log(`[Webhook] Updated homeCook ${homeCookId} to status ${subscription.status}`);
    } catch (err) {
      console.error(`[Webhook] Failed to update homeCook ${homeCookId}:`, err);
    }
  } else {
    console.warn('[Webhook] No homeCookId in subscription metadata');
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const homeCookId = subscription.metadata.homeCookId;
  
  if (homeCookId) {
    try {
      await db
        .update(homeCooks)
        .set({
          subscriptionStatus: subscription.status,
          subscriptionEndDate: new Date(subscription.current_period_end * 1000),
          onboardingCompleted: subscription.status === 'active' ? 'true' : undefined,
        })
        .where(eq(homeCooks.id, homeCookId));
      console.log(`[Webhook] Updated homeCook ${homeCookId} to status ${subscription.status}`);
    } catch (err) {
      console.error(`[Webhook] Failed to update homeCook ${homeCookId}:`, err);
    }
  } else {
    console.warn('[Webhook] No homeCookId in subscription metadata');
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const homeCookId = subscription.metadata.homeCookId;
  
  if (homeCookId) {
    await db
      .update(homeCooks)
      .set({
        subscriptionStatus: 'cancelled',
        subscriptionEndDate: new Date(subscription.canceled_at! * 1000),
      })
      .where(eq(homeCooks.id, homeCookId));
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
    await handleSubscriptionUpdated(subscription);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
    await db
      .update(homeCooks)
      .set({
        subscriptionStatus: 'past_due',
      })
      .where(eq(homeCooks.subscriptionId, subscription.id));
  }
} 