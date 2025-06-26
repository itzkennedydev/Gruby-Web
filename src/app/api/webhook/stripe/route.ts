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
    const body = await request.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
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
    await db
      .update(homeCooks)
      .set({
        subscriptionStatus: subscription.status,
        subscriptionId: subscription.id,
        subscriptionEndDate: new Date(subscription.current_period_end * 1000),
      })
      .where(eq(homeCooks.id, homeCookId));
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const homeCookId = subscription.metadata.homeCookId;
  
  if (homeCookId) {
    await db
      .update(homeCooks)
      .set({
        subscriptionStatus: subscription.status,
        subscriptionEndDate: new Date(subscription.current_period_end * 1000),
      })
      .where(eq(homeCooks.id, homeCookId));
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