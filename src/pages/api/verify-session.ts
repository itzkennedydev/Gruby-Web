import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { session_id } = req.query;

    if (typeof session_id !== 'string') {
      return res.status(400).json({ success: false, error: 'Invalid session ID' });
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (session.payment_status === 'paid') {
        // Here you would typically update your database to mark the order as paid
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, error: 'Payment not completed' });
      }
    } catch (error) {
      console.error('Error verifying Stripe session:', error);
      return res.status(500).json({ success: false, error: 'Error verifying payment' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
