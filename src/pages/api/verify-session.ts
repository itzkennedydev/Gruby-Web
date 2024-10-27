import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe client with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { session_id } = req.query;

    // Validate the session ID
    if (typeof session_id !== 'string') {
      return res.status(400).json({ success: false, error: 'Invalid session ID' });
    }

    try {
      // Retrieve the Stripe checkout session
      const session = await stripe.checkout.sessions.retrieve(session_id);

      // Check if the payment was successful
      if (session.payment_status === 'paid') {
        // Here, you could update the database to mark the order as paid
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, error: 'Payment not completed' });
      }
    } catch (error) {
      console.error('Error verifying Stripe session:', error);

      // Provide more detailed error response
      return res.status(500).json({
        success: false,
        error: 'Error verifying payment',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}
