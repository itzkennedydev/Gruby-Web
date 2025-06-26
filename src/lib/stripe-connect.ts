import Stripe from 'stripe';

// Initialize Stripe with the correct API version and beta headers
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export interface StripeConnectConfig {
  businessName: string;
  businessUrl?: string;
  refreshUrl: string;
  returnUrl: string;
}

export async function createStripeConnectAccount(config: StripeConnectConfig) {
  return await stripe.accounts.create({
    type: 'express',
    business_profile: {
      name: config.businessName,
      url: config.businessUrl || 'https://gruby.com',
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
}

export async function createOnboardingLink(accountId: string, config: Pick<StripeConnectConfig, 'refreshUrl' | 'returnUrl'>) {
  return await stripe.accountLinks.create({
    account: accountId,
    refresh_url: config.refreshUrl,
    return_url: config.returnUrl,
    type: 'account_onboarding',
  });
}

export async function getAccountStatus(accountId: string) {
  return await stripe.accounts.retrieve(accountId);
}

export { stripe }; 