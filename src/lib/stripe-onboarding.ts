/**
 * Utility functions for Stripe Express onboarding
 */

export interface OnboardingResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Start Stripe Express onboarding process
 * This function creates an onboarding link and redirects the user to Stripe
 */
export const startStripeOnboarding = async (): Promise<OnboardingResult> => {
  try {
    // Step 1: Create connected account
    const accountResponse = await fetch('/api/stripe/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!accountResponse.ok) {
      const errorData = await accountResponse.json();
      return {
        success: false,
        error: errorData.error || 'Failed to create connected account',
      };
    }

    const { account } = await accountResponse.json();

    // Step 2: Create onboarding link
    const linkResponse = await fetch('/api/stripe/create-onboarding-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account }),
    });

    if (!linkResponse.ok) {
      const errorData = await linkResponse.json();
      return {
        success: false,
        error: errorData.error || 'Failed to create onboarding link',
      };
    }

    const { url } = await linkResponse.json();
    
    // Redirect to Stripe's hosted onboarding
    window.location.href = url;
    
    return {
      success: true,
      url,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Sync Stripe account status after onboarding completion
 */
export const syncStripeStatus = async (): Promise<{
  success: boolean;
  onboardingCompleted?: boolean;
  status?: string;
  error?: string;
}> => {
  try {
    const response = await fetch('/api/stripe/sync-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || 'Failed to sync account status',
      };
    }

    const data = await response.json();
    return {
      success: true,
      onboardingCompleted: data.onboardingCompleted,
      status: data.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sync Stripe account status',
    };
  }
};

/**
 * Check if user has completed Stripe onboarding
 */
export const checkOnboardingStatus = async (): Promise<{
  success: boolean;
  hasCompletedOnboarding?: boolean;
  error?: string;
}> => {
  try {
    const response = await fetch('/api/stripe/sync-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || 'Failed to check onboarding status',
      };
    }

    const data = await response.json();
    return {
      success: true,
      hasCompletedOnboarding: data.onboardingCompleted,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to check onboarding status',
    };
  }
}; 