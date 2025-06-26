import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { 
  ChefHat, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  ExternalLink,
  Building,
  User,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface HomeCookFormData {
  name: string;
  bio: string;
  cuisine: string;
  experience: string;
}

interface ExistingHomeCook {
  id: string;
  name: string;
  bio: string;
  cuisine: string;
  experience: string;
  stripeAccountId?: string;
  onboardingCompleted?: string;
}

const HomeCookOnboarding: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState<'profile' | 'stripe'>('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingHomeCook, setExistingHomeCook] = useState<ExistingHomeCook | null>(null);
  const [formData, setFormData] = useState<HomeCookFormData>({
    name: user?.fullName || user?.firstName || '',
    bio: '',
    cuisine: '',
    experience: '',
  });

  // Check for existing home cook profile on component mount
  useEffect(() => {
    if (user) {
      checkExistingProfile();
    }
  }, [user]);

  const checkExistingProfile = async () => {
    try {
      const response = await fetch('/api/home-cooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user?.fullName || user?.firstName || '',
          bio: '',
          cuisine: 'General',
          experience: 'Beginner',
          userId: user?.id,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.homeCook) {
          setExistingHomeCook(data.homeCook);
          setFormData({
            name: data.homeCook.name,
            bio: data.homeCook.bio || '',
            cuisine: data.homeCook.cuisine,
            experience: data.homeCook.experience,
          });
          
          // If they need Stripe onboarding, go directly to that step
          if (data.needsStripeOnboarding) {
            setStep('stripe');
          }
        }
      } else if (response.status === 409) {
        const data = await response.json();
        // They have a complete profile, redirect to dashboard or show message
        setError('You already have a complete home cook profile. Please contact support if you need to make changes.');
      }
    } catch (error) {
      console.error('Error checking existing profile:', error);
    }
  };

  const updateFormData = (field: keyof HomeCookFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateProfileForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.cuisine) {
      setError('Please select your cuisine specialty');
      return false;
    }
    if (!formData.experience) {
      setError('Please select your experience level');
      return false;
    }
    setError(null);
    return true;
  };

  const handleProfileSubmit = () => {
    if (validateProfileForm()) {
      setStep('stripe');
    }
  };

  const handleStartStripeOnboarding = async () => {
    if (!user) {
      setError('You must be logged in to complete onboarding');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let homeCookId: string;

      if (existingHomeCook) {
        // Use existing home cook ID
        homeCookId = existingHomeCook.id;
      } else {
        // Create a new home cook record using the collected data
        const homeCookResponse = await fetch('/api/home-cooks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            bio: formData.bio,
            cuisine: formData.cuisine,
            experience: formData.experience,
            userId: user.id,
          }),
        });

        if (!homeCookResponse.ok) {
          const errorData = await homeCookResponse.json();
          throw new Error(errorData.error || 'Failed to create home cook profile');
        }

        const homeCook = await homeCookResponse.json();
        homeCookId = homeCook.id;
      }

      // Create Stripe Connect account with the collected data
      const onboardingResponse = await fetch('/api/home-cook-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeCookId: homeCookId,
          email: user.emailAddresses[0]?.emailAddress || '',
          userId: user.id,
        }),
      });

      if (!onboardingResponse.ok) {
        const errorData = await onboardingResponse.json();
        throw new Error(errorData.error || 'Failed to create Stripe account');
      }

      const { onboardingUrl } = await onboardingResponse.json();

      // Redirect to Stripe's hosted onboarding
      window.location.href = onboardingUrl;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to continue with the onboarding process.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8 text-gray-700 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Become a Home Cook</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {existingHomeCook ? 'Complete your payment setup to start accepting orders.' : 'Set up your profile and start accepting payments to grow your business.'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step === 'profile' ? 'bg-gray-700 border-gray-700 text-white' : 'bg-gray-500 border-gray-500 text-white'
            }`}>
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="w-16 h-0.5 mx-2 bg-gray-300" />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step === 'stripe' ? 'bg-gray-700 border-gray-700 text-white' : 'border-gray-300 text-gray-500'
            }`}>
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {step === 'profile' ? (
          /* Profile Setup Step */
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {existingHomeCook ? 'Your Home Cook Profile' : 'Your Home Cook Profile'}
              </CardTitle>
              <CardDescription>
                {existingHomeCook ? 'Your profile is set up. Continue to complete payment processing.' : 'Tell us about yourself and your cooking style'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2"
                    disabled={!!existingHomeCook}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    placeholder="Tell customers about your cooking style, experience, and what makes your food special..."
                    className="mt-2"
                    rows={4}
                    disabled={!!existingHomeCook}
                  />
                </div>

                <div>
                  <Label htmlFor="cuisine">Cuisine Specialty *</Label>
                  <Select
                    value={formData.cuisine}
                    onValueChange={(value) => updateFormData('cuisine', value)}
                    disabled={!!existingHomeCook}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your cuisine specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="American">American</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Asian">Asian</SelectItem>
                      <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Thai">Thai</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Greek">Greek</SelectItem>
                      <SelectItem value="General">General / Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experience">Experience Level *</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => updateFormData('experience', value)}
                    disabled={!!existingHomeCook}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner (1-2 years)</SelectItem>
                      <SelectItem value="Intermediate">Intermediate (3-5 years)</SelectItem>
                      <SelectItem value="Advanced">Advanced (5+ years)</SelectItem>
                      <SelectItem value="Professional">Professional Chef</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleProfileSubmit}
                  className="bg-gray-700 hover:bg-gray-800"
                >
                  {existingHomeCook ? 'Continue to Payment Setup' : 'Continue to Payment Setup'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Stripe Onboarding Step */
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-gray-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Payment Setup</CardTitle>
              <CardDescription className="text-lg">
                {existingHomeCook ? 'Complete your payment processing setup' : `Complete your profile: ${formData.name} - ${formData.cuisine} Cuisine`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Profile Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuisine:</span>
                    <span className="font-medium">{formData.cuisine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{formData.experience}</span>
                  </div>
                  {formData.bio && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bio:</span>
                      <span className="font-medium max-w-xs truncate">{formData.bio}</span>
                    </div>
                  )}
                  {existingHomeCook && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profile Status:</span>
                      <span className="font-medium text-gray-500">Existing Profile</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Secure & Compliant</h3>
                  <p className="text-sm text-gray-600">Bank-level security with PCI compliance</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Building className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Easy Setup</h3>
                  <p className="text-sm text-gray-600">Simple form takes just 5 minutes</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <User className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Trusted Platform</h3>
                  <p className="text-sm text-gray-600">Powered by Stripe's global infrastructure</p>
                </div>
              </div>

              {/* What you'll need */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  What you'll need to complete onboarding:
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-gray-500 mr-2" />
                    Government-issued ID (driver's license or passport)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-gray-500 mr-2" />
                    Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-gray-500 mr-2" />
                    Business address and contact information
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-gray-500 mr-2" />
                    Bank account information for payouts
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setStep('profile')}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Button>
                
                <Button 
                  onClick={handleStartStripeOnboarding}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-700 hover:bg-gray-800"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5 mr-2" />
                      {existingHomeCook ? 'Continue Stripe Onboarding' : 'Start Stripe Onboarding'}
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                You'll be redirected to Stripe's secure onboarding platform
              </p>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <Shield className="w-4 h-4 mr-2" />
            Your information is protected by bank-level security
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCookOnboarding; 