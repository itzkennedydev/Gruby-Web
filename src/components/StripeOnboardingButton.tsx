import React from 'react';
import { Button } from '@/components/ui/button';
import { useStripeOnboarding } from '@/hooks/useStripeOnboarding';
import { CreditCard, Loader2 } from 'lucide-react';

interface StripeOnboardingButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const StripeOnboardingButton: React.FC<StripeOnboardingButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  onSuccess,
  onError,
}) => {
  const { isLoading, error, createAccount, createOnboardingLink } = useStripeOnboarding();

  const handleClick = async () => {
    try {
      // Step 1: Create Stripe account
      const accountId = await createAccount();
      
      if (!accountId) {
        onError?.(error || 'Failed to create Stripe account');
        return;
      }

      // Step 2: Create onboarding link
      const onboardingUrl = await createOnboardingLink(accountId);
      
      if (!onboardingUrl) {
        onError?.(error || 'Failed to create onboarding link');
        return;
      }

      // Step 3: Redirect to Stripe onboarding
      window.location.href = onboardingUrl;
      
      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      onError?.(errorMessage);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Setting up...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          {children || 'Start Payment Setup'}
        </>
      )}
    </Button>
  );
};

export default StripeOnboardingButton; 