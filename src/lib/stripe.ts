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

