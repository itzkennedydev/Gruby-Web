import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { 
  ChefHat, 
  CheckCircle, 
  DollarSign, 
  Shield, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import Layout from '@/components/Layout';

const HomeCookOnboardingComplete: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const { homeCookId } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountLinked, setAccountLinked] = useState(false);

  useEffect(() => {
    if (homeCookId && user) {
      linkStripeAccount();
    }
  }, [homeCookId, user]);

  const linkStripeAccount = async () => {
    try {
      // Get the account ID from the URL parameters (Stripe adds this)
      const urlParams = new URLSearchParams(window.location.search);
      const accountId = urlParams.get('account_id');
      
      if (accountId && homeCookId) {
        // Update the home cook record with the Stripe account ID
        const response = await fetch('/api/home-cook-onboarding/link-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            homeCookId: homeCookId,
            stripeAccountId: accountId,
            userId: user?.id,
          }),
        });

        if (response.ok) {
          setAccountLinked(true);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to link account');
        }
      } else {
        // No account ID in URL, might be returning from existing account
        setAccountLinked(true);
      }
    } catch (err) {
      setError('Failed to link Stripe account');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please sign in to continue.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <ChefHat className="w-8 h-8 text-gray-700 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Onboarding Complete!</h1>
            </div>
          </div>

          {/* Success Card */}
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-600">Welcome to Gruby!</CardTitle>
              <CardDescription className="text-lg">
                Your Stripe Connect account has been successfully set up
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Setting up your account...</p>
                </div>
              ) : error ? (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              ) : (
                <>
                  {/* Success Message */}
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Congratulations! Your account is now ready to accept payments. You can start adding products and growing your business.
                    </AlertDescription>
                  </Alert>

                  {/* Next Steps */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-4">What's Next?</h3>
                    <div className="space-y-3 text-sm text-blue-800">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>Add your first product to start accepting orders</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        <span>Your payments will be automatically processed and transferred to your bank account</span>
                      </div>
                      <div className="flex items-center">
                        <ChefHat className="w-4 h-4 mr-2" />
                        <span>Build your customer base and grow your home cooking business</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-2" />
                      <span>Your financial information is protected by Stripe's bank-level security</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      asChild
                      variant="outline"
                      className="flex-1"
                    >
                      <Link href="/">
                        Go to Dashboard
                      </Link>
                    </Button>
                    
                    <Button 
                      asChild
                      className="flex-1 bg-gray-700 hover:bg-gray-800"
                    >
                      <Link href="/add-product">
                        Add Your First Product
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HomeCookOnboardingComplete; 