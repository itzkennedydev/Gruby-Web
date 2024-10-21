import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export async function createPaymentIntent(cartItems: CartItem[]): Promise<{ clientSecret: string }> {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItems }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create payment intent');
  }

  return await response.json();
}
