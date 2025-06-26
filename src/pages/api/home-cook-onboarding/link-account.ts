import { NextApiRequest, NextApiResponse } from 'next';
import { getStripe } from '@/lib/stripe';
import { db } from '@/db/db';
import { homeCooks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { homeCookId, stripeAccountId, userId } = req.body;

    if (!homeCookId || !stripeAccountId || !userId) {
      return res.status(400).json({ 
        error: 'Missing required fields: homeCookId, stripeAccountId, userId' 
      });
    }

    // Verify the home cook exists and belongs to the user
    const existingHomeCook = await db.select()
      .from(homeCooks)
      .where(eq(homeCooks.id, homeCookId))
      .limit(1);

    if (existingHomeCook.length === 0) {
      return res.status(404).json({ error: 'Home cook not found' });
    }

    const homeCookData = existingHomeCook[0];
    
    if (homeCookData.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Verify the Stripe account exists and get its status
    const stripe = getStripe();
    const account = await stripe.accounts.retrieve(stripeAccountId);

    // Update the home cook record with the Stripe account information
    await db.update(homeCooks)
      .set({
        stripeAccountId: stripeAccountId,
        stripeAccountStatus: account.charges_enabled ? 'active' : 'pending',
        onboardingCompleted: (account.charges_enabled && account.payouts_enabled).toString(),
        updatedAt: new Date(),
      })
      .where(eq(homeCooks.id, homeCookId));

    return res.status(200).json({
      success: true,
      message: 'Account linked successfully',
      accountStatus: account.charges_enabled ? 'active' : 'pending',
    });

  } catch (error: any) {
    console.error('Account linking error:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeError') {
      return res.status(400).json({
        error: error.message || 'Failed to verify Stripe account',
        code: error.code,
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
} 