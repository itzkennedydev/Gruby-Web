import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with the publishable key from the environment variables
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
