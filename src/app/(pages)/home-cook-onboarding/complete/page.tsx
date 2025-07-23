'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  ChefHat, 
  CheckCircle, 
  DollarSign, 
  Shield, 
  ArrowRight,
  RefreshCw,
  Plus,
  Settings,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const HomeCookOnboardingComplete: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (user) {
      syncStripeStatus();
      
      // Add a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        if (loading) {
          setLoading(false);
          setError('Request timed out. Please try refreshing the page.');
        }
      }, 10000); // 10 second timeout
      
      return () => clearTimeout(timeout);
    }
  }, [user]);

  const syncStripeStatus = async () => {
    try {
      setLoading(true);
      // Sync the Stripe account status
      const response = await fetch('/api/stripe/sync-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setOnboardingCompleted(data.onboardingCompleted);
        
        // If onboarding is not completed, show a message about pending verification
        if (!data.onboardingCompleted) {
          setError('Your account is being reviewed by Stripe. This usually takes 1-2 business days. You will be notified once your account is approved.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to sync account status');
      }
    } catch (err) {
      console.error('Error syncing status:', err);
      setError('Failed to sync Stripe account status. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    syncStripeStatus();
  };

  if (!user) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1920px] mx-auto px-4">
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
                {retryCount > 0 && (
                  <p className="text-sm text-gray-500 mt-2">Attempt {retryCount + 1}</p>
                )}
              </div>
            ) : error ? (
              <div className="space-y-4">
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
                <div className="text-center">
                  <Button onClick={handleRetry} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Success Message */}
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {onboardingCompleted 
                      ? "Congratulations! Your account is now ready to accept payments. You can start adding products and growing your business."
                      : "Your Stripe onboarding has been submitted successfully! Your account is currently under review and should be approved within 1-2 business days."
                    }
                  </AlertDescription>
                </Alert>

                {/* Next Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Add Products */}
                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardHeader className="text-center pb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Plus className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">Add Products</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Start by adding your first dish or meal to your menu
                      </p>
                      <Button asChild className="w-full">
                        <Link href="/add-product">
                          Add Your First Product
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Complete Profile */}
                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardHeader className="text-center pb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Settings className="w-6 h-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">Complete Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Add photos, bio, and cooking specialties to attract customers
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/profile">
                          Update Profile
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Subscription */}
                  <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                    <CardHeader className="text-center pb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CreditCard className="w-6 h-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg">Choose Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Select a subscription plan to unlock premium features
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/subscription">
                          View Plans
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Security Notice */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Your financial information is protected by Stripe's bank-level security</span>
                  </div>
                </div>

                {/* Main Action */}
                <div className="text-center">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-gray-700 hover:bg-gray-800"
                  >
                    <Link href="/">
                      Go to Dashboard
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeCookOnboardingComplete; 