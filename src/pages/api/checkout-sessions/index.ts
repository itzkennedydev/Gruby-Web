import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia', // Updated to match the expected type
});

// Define the item structure for better type safety
interface CheckoutItem {
  name: string;
  price: number; // Assuming price is in dollars, convert to cents when sending to Stripe
  quantity: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract items and userId from the request body
      const { items, userId }: { items: CheckoutItem[]; userId: string } = req.body as { items: CheckoutItem[]; userId: string };

      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        metadata: {
          userId, // Include the user ID in the metadata for future reference
        },
      });

      // Return the session ID for frontend to redirect to Stripe Checkout
      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.error('Error creating Stripe checkout session:', err);
      res.status(500).json({ statusCode: 500, message: (err as Error).message });
    }
  } else {
    // If not a POST request, return a 405 Method Not Allowed
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
