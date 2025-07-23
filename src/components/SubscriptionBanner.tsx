'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Crown, CheckCircle, AlertTriangle } from 'lucide-react';

interface SubscriptionStatus {
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'past_due';
  subscriptionEndDate?: string;
  onboardingCompleted: string;
}

const SubscriptionBanner: React.FC = () => {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/subscription');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      } else {
        setError('Failed to load subscription status');
      }
    } catch (err) {
      setError('Failed to load subscription status');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      setIsSubscribing(true);
      const response = await fetch('/api/subscription', {
        method: 'POST',
      });

      if (response.ok) {
        const { url } = await response.json();
        if (url) {
          window.location.href = url;
        }
      } else {
        const error = await response.json();
        setError(error.error || 'Failed to create subscription');
      }
    } catch (err) {
      setError('Failed to create subscription');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!subscription) {
    return null;
  }

  // Active subscription - show success message
  if (subscription.subscriptionStatus === 'active') {
    return (
      <Card className="mb-6 border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Active Subscription</p>
                <p className="text-sm text-gray-600">You can now list products and start earning</p>
              </div>
            </div>
            {subscription.subscriptionEndDate && (
              <span className="text-sm text-gray-500">
                Renews {new Date(subscription.subscriptionEndDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Past due subscription
  if (subscription.subscriptionStatus === 'past_due') {
    return (
      <Card className="mb-6 border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Payment Required</p>
                <p className="text-sm text-gray-600">Update your payment method to continue</p>
              </div>
            </div>
            <Button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              size="sm"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {isSubscribing ? 'Processing...' : 'Update Payment'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No active subscription - show upgrade banner
  return (
    <Card className="mb-6 border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-900">Upgrade Your Account</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">Unlimited Products</p>
                <p className="text-xs">List as many products as you want</p>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">Featured Placement</p>
                <p className="text-xs">Get priority in search results</p>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">Analytics</p>
                <p className="text-xs">Track your performance</p>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-1">Priority Support</p>
                <p className="text-xs">Get help when you need it</p>
              </div>
            </div>
          </div>
          
          <div className="text-right ml-8 border-l border-gray-200 pl-8">
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-900">$10</p>
              <p className="text-sm text-gray-600">per month</p>
            </div>
            <Button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="bg-[#FF4D00] hover:bg-[#E64500] text-white w-full"
            >
              {isSubscribing ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionBanner; 