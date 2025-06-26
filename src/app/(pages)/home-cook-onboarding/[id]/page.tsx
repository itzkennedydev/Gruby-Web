'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  ChefHat, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/Layout';

interface OnboardingStatus {
  homeCook: any;
  onboardingStatus: {
    status: string;
    isComplete: boolean;
    requirements: any;
  };
}

const HomeCookOnboardingStatus: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    if (!id) return;
    
    try {
      const response = await fetch(`/api/home-cook-onboarding?homeCookId=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch onboarding status');
      }
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStatus();
    }
  }, [id]);

  const handleContinueOnboarding = async () => {
    if (!status?.homeCook?.stripeAccountId) return;

    try {
      const response = await fetch('/api/home-cook-onboarding/account-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: status.homeCook.stripeAccountId,
          homeCookId: id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create onboarding link');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to continue onboarding');
    }
  };

  const getStatusIcon = () => {
    if (!status) return <Clock className="w-8 h-8 text-gray-400" />;
    
    switch (status.onboardingStatus.status) {
      case 'active':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'pending':
        return <Clock className="w-8 h-8 text-orange-600" />;
      case 'restricted':
        return <AlertCircle className="w-8 h-8 text-red-600" />;
      default:
        return <Clock className="w-8 h-8 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    if (!status) return 'Loading...';
    
    switch (status.onboardingStatus.status) {
      case 'active':
        return 'Your account is active and ready to accept payments!';
      case 'pending':
        return 'Your account is being reviewed. Please complete the remaining requirements.';
      case 'restricted':
        return 'Your account has restrictions. Please contact support.';
      default:
        return 'Setting up your account...';
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
                Please sign in to view your onboarding status.
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
              <ChefHat className="w-8 h-8 text-orange-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Onboarding Status</h1>
            </div>
          </div>

          {/* Status Card */}
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                {getStatusIcon()}
              </div>
              <CardTitle className="text-2xl">
                {status?.homeCook?.businessName || 'Home Cook'} Account
              </CardTitle>
              <CardDescription className="text-lg">
                {getStatusMessage()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading your status...</p>
                </div>
              ) : status ? (
                <>
                  {/* Account Details */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Account Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${
                          status.onboardingStatus.status === 'active' ? 'text-green-600' :
                          status.onboardingStatus.status === 'pending' ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {status.onboardingStatus.status.charAt(0).toUpperCase() + status.onboardingStatus.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account ID:</span>
                        <span className="font-mono text-xs">{status.homeCook.stripeAccountId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Business Name:</span>
                        <span>{status.homeCook.businessName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  {status.onboardingStatus.requirements && (
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="font-semibold text-blue-900 mb-4">Required Information</h3>
                      <div className="space-y-2 text-sm text-blue-800">
                        {Object.entries(status.onboardingStatus.requirements).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex items-center">
                            <CheckCircle className={`w-4 h-4 mr-2 ${
                              value === 'complete' ? 'text-green-600' : 'text-blue-600'
                            }`} />
                            <span className="capitalize">{key.replace(/_/g, ' ')}: {value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {status.onboardingStatus.status === 'pending' && (
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleContinueOnboarding}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Continue Onboarding
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No status information available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HomeCookOnboardingStatus; 