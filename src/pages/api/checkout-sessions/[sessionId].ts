import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia', // Updated to match the expected type
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { sessionId } = req.query;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required and must be a string' });
    }

    try {
      // Retrieve the session from Stripe, expanding necessary fields
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'customer_details'],
      });

      // Respond with the session details
      res.status(200).json(session);
    } catch (err) {
      console.error('Error retrieving session:', err);

      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    // Handle invalid method
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}
