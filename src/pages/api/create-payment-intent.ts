// app/api/payment-intents/route.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16', // Update to the latest stable version
});

interface CreatePaymentIntentRequest {
  totalAmount: number;
}

interface PaymentIntentResponse {
  clientSecret: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const body = req.body;
    console.log('Received request body:', JSON.stringify(body, null, 2)); // Log the received body

    const { totalAmount } = body as CreatePaymentIntentRequest;
    console.log('Extracted totalAmount:', totalAmount); // Log extracted amount

    // Validate totalAmount
    if (typeof totalAmount !== 'number' || isNaN(totalAmount) || totalAmount <= 0) {
      console.log('Invalid totalAmount:', totalAmount); // Log invalid amount
      return res.status(400).json(
        { message: 'Invalid totalAmount' }
      );
    }

    // Ensure the amount is in cents and is an integer
    const amountInCents = Math.round(totalAmount);
    console.log('Amount in cents:', amountInCents); // Log amount in cents

    if (amountInCents < 50) { // Stripe minimum is 50 cents
      return res.status(400).json({ message: 'Amount must be at least $0.50' });
    }

    console.log('Creating PaymentIntent for amount:', amountInCents); // Log amount before creating PaymentIntent

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
    });

    if (!paymentIntent.client_secret) {
      throw new Error('Failed to create PaymentIntent: No client_secret returned');
    }

    console.log('PaymentIntent created successfully'); // Log success

    return res.status(200).json<PaymentIntentResponse>(
      { clientSecret: paymentIntent.client_secret },
    );
  } catch (error) {
    console.error('Payment Intent Error:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error stack:', error.stack);
    }
    
    if (error instanceof Stripe.errors.StripeError) {
      console.error('Stripe error type:', error.type);
      console.error('Stripe error code:', error.code);
      console.error('Stripe error param:', error.param);
    }

    return res.status(500).json({ message: errorMessage });
  }
}
