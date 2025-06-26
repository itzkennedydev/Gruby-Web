import { NextApiRequest, NextApiResponse } from 'next';
import { getStripe } from '@/lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { accountId, homeCookId } = req.body;

    if (!accountId || !homeCookId) {
      return res.status(400).json({ 
        error: 'Missing required fields: accountId, homeCookId' 
      });
    }

    const stripe = getStripe();

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/home-cook-onboarding/${homeCookId}`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/home-cook-onboarding/complete`,
      type: 'account_onboarding',
      collect: 'eventually_due',
    });

    return res.status(200).json({
      success: true,
      url: accountLink.url,
    });

  } catch (error: any) {
    console.error('Stripe account link error:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeError') {
      return res.status(400).json({
        error: error.message || 'Failed to create account link',
        code: error.code,
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
} 