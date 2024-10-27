import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Validate and retrieve the Stripe secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// Initialize Stripe with the secret key
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-09-30.acacia',
});

// Define types for the request body
interface CreatePaymentIntentRequest {
  totalAmount: number;
}

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { totalAmount }: CreatePaymentIntentRequest = req.body as CreatePaymentIntentRequest; // Type assertion

    // Log the received totalAmount
    console.log('Received totalAmount:', totalAmount);

    // Validate the totalAmount
    if (typeof totalAmount !== 'number' || isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid totalAmount' });
    }

    // Convert totalAmount to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
    });

    // Log successful PaymentIntent creation
    console.log('Created PaymentIntent:', paymentIntent.id);

    // Respond with the client secret
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment Intent Error:', error);

    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      console.error('Stripe error type:', error.type);
      console.error('Stripe error code:', error.code);
      console.error('Stripe error param:', error.param);
      return res.status(500).json({ message: error.message });
    }

    // General error handling
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
