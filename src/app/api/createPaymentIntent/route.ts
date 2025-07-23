import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Validate and retrieve the Stripe secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// Initialize Stripe with the secret key
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-08-16',
});

// Define types for the request body
interface CreatePaymentIntentRequest {
  totalAmount: number;
}

// API route handler
export async function POST(request: NextRequest) {
  try {
    const body: CreatePaymentIntentRequest = await request.json();
    const { totalAmount } = body;

    // Log the received totalAmount
    console.log('Received totalAmount:', totalAmount);

    // Validate the totalAmount
    if (typeof totalAmount !== 'number' || isNaN(totalAmount) || totalAmount <= 0) {
      return NextResponse.json({ message: 'Invalid totalAmount' }, { status: 400 });
    }

    // Convert totalAmount to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
    });

    // Log successful PaymentIntent creation
    console.log('Created PaymentIntent:', paymentIntent.id);

    // Respond with the client secret
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment Intent Error:', error);

    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      console.error('Stripe error type:', error.type);
      console.error('Stripe error code:', error.code);
      console.error('Stripe error param:', error.param);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    // General error handling
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 