import { loadStripe } from '@stripe/stripe-js';
import { env } from '@/env';

// Client-side Stripe instance (for frontend)
export const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Server-side Stripe instance (for API routes only)
let stripe: any = null;

export function getStripe() {
  if (!stripe) {
    if (typeof window !== 'undefined') {
      throw new Error('Stripe server instance cannot be used on the client side');
    }
    
    if (!env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    
    const Stripe = require('stripe');
    stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }
  return stripe;
}

// CartItem interface representing items in the cart
export interface CartItem {
  id: string;
  name: string;
  price: number; // Price in dollars (must be converted to cents for Stripe)
  quantity: number;
}

interface CheckoutSessionResponse {
  sessionId: string;
}

interface ErrorResponse {
  error: string;
}

// Create a Stripe Checkout session
export async function createCheckoutSession(cartItems: CartItem[]) {
  const stripe = await stripePromise;

  // Call your server to create a Stripe Checkout session
  const response = await fetch('/api/createCheckoutSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItems }),
  });

  // Handle errors from the server response
  if (!response.ok) {
    const errorData = await response.json() as ErrorResponse;
    throw new Error(errorData.error || 'Failed to create checkout session');
  }

  const { sessionId } = await response.json() as CheckoutSessionResponse;

  // Redirect to Stripe Checkout using the session ID
  if (stripe) {
    const result = await stripe.redirectToCheckout({ sessionId });

    // Handle any error from the Stripe redirection
    if (result.error) {
      console.error('Stripe checkout error:', result.error);
      throw result.error;
    }
  }
}
