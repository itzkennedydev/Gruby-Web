// File: src/pages/api/createCheckoutSession.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
}

export default async function createCheckoutSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { cartItems } = req.body as { cartItems: CartItem[] };

      // Ensure cartItems is provided and not empty
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'No items in the cart' });
      }

      console.log('Received cartItems:', JSON.stringify(cartItems, null, 2));

      // Map cart items to Stripe's expected line items format
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map((item) => {
        console.log('Processing item:', JSON.stringify(item, null, 2));
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        
        if (!item.name || isNaN(price) || isNaN(quantity)) {
          console.error(`Invalid item data: ${JSON.stringify(item)}`);
          return null; // Return null for invalid items
        }

        // Define price_data only if valid
        const priceData: Stripe.Checkout.SessionCreateParams.LineItem['price_data'] = {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            images: item.imageUrl ? [item.imageUrl] : undefined,
          },
          unit_amount: Math.round(price * 100), // Stripe expects amounts in cents
        };

        // Ensure priceData is defined before returning
        return {
          price_data: priceData,
          quantity: quantity,
        } as Stripe.Checkout.SessionCreateParams.LineItem; // Type assertion here
      }).filter((item): item is Stripe.Checkout.SessionCreateParams.LineItem => item !== null); // Type assertion here

      if (lineItems.length === 0) {
        return res.status(400).json({ error: 'No valid items in the cart' });
      }

      console.log('Prepared lineItems:', JSON.stringify(lineItems, null, 2));

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      // Send the sessionId back to the client
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      res.status(500).json({ 
        error: 'Failed to create checkout session', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  } else {
    // Return 405 if method is not POST
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
