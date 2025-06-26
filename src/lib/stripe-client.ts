import { loadStripe } from '@stripe/stripe-js';
import { env } from '@/env';

// Client-side Stripe instance (for frontend only)
export const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Client-side types for Stripe operations
export interface OnboardingData {
  businessName: string;
  businessType: 'individual' | 'company';
  email: string;
  phone: string;
  dateOfBirth: string;
  ssnLast4: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  taxId?: string;
}

export interface HomeCookOnboardingStatus {
  accountId: string;
  status: string;
  requirements: {
    currently_due: string[];
    eventually_due: string[];
    past_due: string[];
  };
  isComplete: boolean;
} 