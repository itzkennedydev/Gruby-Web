import { NextApiRequest, NextApiResponse } from 'next';
import { getStripe } from '@/lib/stripe';
import { db } from '@/server/db';
import { homeCooks } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { homeCookId, userId, email } = req.body;

      if (!homeCookId || !userId || !email) {
        return res.status(400).json({ 
          error: 'Missing required fields: homeCookId, userId, email' 
        });
      }

      // Check if this home cook already has a Stripe account
      const existingHomeCook = await db.select()
        .from(homeCooks)
        .where(eq(homeCooks.id, homeCookId))
        .limit(1);

      if (existingHomeCook.length === 0) {
        return res.status(404).json({ error: 'Home cook not found' });
      }

      const homeCookData = existingHomeCook[0];

      const stripe = getStripe();

      // If home cook already has a Stripe account, create account link for existing account
      if (homeCookData.stripeAccountId) {
        try {
          // Verify the account still exists in Stripe
          const account = await stripe.accounts.retrieve(homeCookData.stripeAccountId);
          
          // Create a new account link for continuing onboarding
          const accountLink = await stripe.accountLinks.create({
            account: homeCookData.stripeAccountId,
            refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/home-cook-onboarding/${homeCookId}`,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/home-cook-onboarding/complete?homeCookId=${homeCookId}`,
            type: 'account_onboarding',
            collect: 'eventually_due',
          });

          return res.status(200).json({
            success: true,
            accountId: homeCookData.stripeAccountId,
            onboardingUrl: accountLink.url,
            message: 'Continuing existing onboarding'
          });
        } catch (stripeError) {
          // If Stripe account doesn't exist, remove the reference and continue
          console.log('Stripe account not found, will create new one through onboarding');
          await db.update(homeCooks)
            .set({
              stripeAccountId: null,
              stripeAccountStatus: null,
              onboardingCompleted: 'false',
              updatedAt: new Date(),
            })
            .where(eq(homeCooks.id, homeCookId));
        }
      }

      // Create an account link for new account onboarding
      // Stripe will handle account creation during the onboarding process
      const accountLink = await stripe.accountLinks.create({
        type: 'account_onboarding',
        collect: 'eventually_due',
        refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/home-cook-onboarding/${homeCookId}`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/home-cook-onboarding/complete?homeCookId=${homeCookId}`,
        // Pre-fill some data if available
        prefilled_data: {
          email: email,
          business_profile: {
            name: homeCookData.name,
            url: process.env.NEXT_PUBLIC_APP_URL || 'https://gruby.com',
          },
        },
      });

      return res.status(200).json({
        success: true,
        onboardingUrl: accountLink.url,
        message: 'Starting new onboarding'
      });

    } catch (error: any) {
      console.error('Stripe onboarding error:', error);
      
      // Handle specific Stripe errors
      if (error.type === 'StripeError') {
        return res.status(400).json({
          error: error.message || 'Failed to create onboarding link',
          code: error.code,
        });
      }

      return res.status(500).json({
        error: 'Internal server error',
        message: error.message,
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { homeCookId } = req.query;

      if (!homeCookId || typeof homeCookId !== 'string') {
        return res.status(400).json({ error: 'homeCookId is required' });
      }

      // Get home cook with Stripe account info
      const homeCook = await db.select().from(homeCooks).where(eq(homeCooks.id, homeCookId)).limit(1);

      if (!homeCook || homeCook.length === 0) {
        return res.status(404).json({ error: 'Home cook not found' });
      }

      const homeCookData = homeCook[0];

      if (!homeCookData.stripeAccountId) {
        return res.status(404).json({ error: 'No Stripe account found for this home cook' });
      }

      const stripe = getStripe();

      // Get account details from Stripe
      const account = await stripe.accounts.retrieve(homeCookData.stripeAccountId);

      // Get requirements
      const requirements = account.requirements;
      const isComplete = Boolean(account.charges_enabled && account.payouts_enabled);

      // Update home cook status if it has changed
      const newStatus = account.charges_enabled ? 'active' : 'pending';
      if (homeCookData.stripeAccountStatus !== newStatus) {
        await db.update(homeCooks)
          .set({
            stripeAccountStatus: newStatus,
            onboardingCompleted: isComplete.toString(),
            updatedAt: new Date(),
          })
          .where(eq(homeCooks.id, homeCookId));
      }

      return res.status(200).json({
        homeCook: {
          ...homeCookData,
          stripeAccountStatus: newStatus,
          onboardingCompleted: isComplete.toString(),
        },
        onboardingStatus: {
          status: newStatus,
          isComplete,
          requirements,
        },
      });

    } catch (error: any) {
      console.error('Error getting onboarding status:', error);
      
      if (error.type === 'StripeError') {
        return res.status(400).json({
          error: error.message || 'Failed to get account status',
          code: error.code,
        });
      }

      return res.status(500).json({ error: 'Failed to get onboarding status' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
} 