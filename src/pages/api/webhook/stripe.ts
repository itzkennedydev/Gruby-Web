import { NextApiRequest, NextApiResponse } from 'next';
import { getStripe } from '@/lib/stripe';
import { db } from '@/db/db';
import { homeCooks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = getStripe();
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).json({ error: 'No signature provided' });
  }

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    switch (event.type) {
      case 'account.updated':
        const account = event.data.object;
        
        // Find home cook by email (since we don't have account ID yet)
        if (account.email) {
          // Note: This is a simplified approach. In production, you might want to
          // store a temporary mapping or use metadata to link accounts
          console.log('Account updated:', account.id, account.email);
        }
        break;

      case 'account.application.authorized':
        const authorizedAccount = event.data.object;
        
        // This event is fired when an account is created and authorized
        // We can use the account ID to update our home cook record
        console.log('Account authorized:', authorizedAccount.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
} 