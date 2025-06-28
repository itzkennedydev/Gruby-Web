'use client';

import React, { useState, useEffect } from 'react';
import { useUser, SignUpButton, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Define field types
type BaseField = {
  id: string;
  label: string;
  description?: string;
};

type InputField = BaseField & {
  type: string;
  placeholder?: string;
};

type SelectField = BaseField & {
  options: string[];
};

type ImageField = BaseField & {
  type: 'image';
  accept: string;
};

type Field = InputField | SelectField | ImageField;

// Define step type
type Step = {
  id: string;
  title: string;
  subtitle?: string;
  fields: Field[];
  hasTextArea?: boolean;
  textAreaLabel?: string;
  textAreaPlaceholder?: string;
};

// Define form data type
type FormDataType = Record<string, Record<string, string>>;

// Define the form steps
const FORM_STEPS: Step[] = [
  {
    id: 'basic-info',
    title: 'TELL US ABOUT YOURSELF',
    subtitle: 'Let customers know who you are',
    fields: [
      { id: 'name', label: 'What\'s your name?', type: 'text', placeholder: 'Enter your full name' } as InputField,
      { id: 'cuisine', label: 'What\'s your cuisine specialty?', options: ['Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian', 'French', 'Thai', 'Japanese', 'Greek', 'General'] } as SelectField,
      { id: 'experience', label: 'What\'s your experience level?', options: ['Beginner (1-2 years)', 'Intermediate (3-5 years)', 'Advanced (5+ years)', 'Professional Chef'] } as SelectField,
    ],
    hasTextArea: true,
    textAreaLabel: 'Tell us about your cooking style and background',
    textAreaPlaceholder: 'What makes your food special? What\'s your story?'
  },
  {
    id: 'images',
    title: 'UPLOAD YOUR PHOTOS',
    subtitle: 'Add profile and banner images to showcase your culinary style',
    fields: [
      { id: 'profileImage', label: 'Profile Image', type: 'image', accept: 'image/*' } as ImageField,
      { id: 'bannerImage', label: 'Banner Image', type: 'image', accept: 'image/*' } as ImageField,
    ]
  },
  {
    id: 'stripe-connect',
    title: 'SETUP STRIPE CONNECT',
    subtitle: 'Set up Stripe Connect to start accepting orders',
    fields: []
  }
];

const brandColor = "#FF4D00";

export default function HomeCookOnboarding() {
  const { user, isLoaded } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [existingHomeCook, setExistingHomeCook] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle redirect after authentication
  useEffect(() => {
    if (user && isClient) {
      const fromOnboarding = sessionStorage.getItem('fromOnboarding');
      if (fromOnboarding) {
        sessionStorage.removeItem('fromOnboarding');
      }
    }
  }, [user, isClient]);

  const handleSignUpClick = () => {
    if (isClient) {
      sessionStorage.setItem('fromOnboarding', 'true');
    }
  };

  // Check for existing home cook profile
  useEffect(() => {
    if (user && isLoaded) {
      checkExistingProfile();
    }
  }, [user, isLoaded]);

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
          avatarUrl: user?.imageUrl || '',
        }),
      });

      if (response.status === 200 || response.status === 409) {
        const data = await response.json();
        if (data.homeCook) {
          setExistingHomeCook(data.homeCook);
          setFormData({
            'basic-info': {
            name: data.homeCook.name,
            cuisine: data.homeCook.cuisine,
            experience: data.homeCook.experience,
              bio: data.homeCook.bio || '',
            }
          });
          
          // Check completion status and show appropriate step
          if (data.homeCook.onboardingCompleted === 'true' && data.homeCook.subscriptionStatus === 'active') {
            // Everything is complete - redirect to profile
            window.location.href = '/profile';
          } else if (data.homeCook.onboardingCompleted === 'true' && data.homeCook.subscriptionStatus !== 'active') {
            // Profile complete but no subscription - show subscription step
            setCurrentStep(2); // Payment setup step
            setIsComplete(true);
          } else {
            // Profile incomplete - start from basic info
            setCurrentStep(0);
          }
        } else {
          // No profile exists - start from beginning
          setCurrentStep(0);
        }
      }
    } catch (error) {
      console.error('Error checking existing profile:', error);
      setCurrentStep(0);
    }
  };
  
  // Calculate current progress
  useEffect(() => {
    const newProgress = Math.min(100, Math.round(((currentStep) / (FORM_STEPS.length - 1)) * 100));
    setProgress(newProgress);
  }, [currentStep]);
  
  const currentStepData = FORM_STEPS[currentStep];
  
  const handleNext = () => {
    if (!currentStepData) return;
    
    // Check if the current step requires data
    if (currentStepData.fields.length > 0 && currentStepData.id !== 'welcome') {
      const currentStepSelections = formData[currentStepData.id] ?? {};
      const hasInputFields = currentStepData.fields.some(field => 'type' in field);
      const hasSelection = Object.keys(currentStepSelections).length > 0;
      
      if (!hasSelection && !hasInputFields) {
        return;
    }
    }
    
    if (currentStep < FORM_STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      void handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (stepId: string, fieldId: string, value: string) => {
    setFormData({
      ...formData,
      [stepId]: {
        ...(formData[stepId] ?? {}),
        [fieldId]: value
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const activeElement = document.activeElement;
      if (activeElement && activeElement.tagName === 'TEXTAREA') {
      return;
    }
      
      e.preventDefault();
      handleNext();
    }
  };
  
  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      // Create or update home cook profile
        const homeCookResponse = await fetch('/api/home-cooks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          name: formData['basic-info']?.name || user?.fullName || '',
          bio: formData['basic-info']?.bio || '',
          cuisine: formData['basic-info']?.cuisine || 'General',
          experience: formData['basic-info']?.experience || 'Beginner',
            userId: user.id,
          avatarUrl: formData['images']?.profileImage || user?.imageUrl || '',
          coverImageUrl: formData['images']?.bannerImage || '',
          }),
        });

        if (!homeCookResponse.ok) {
        throw new Error('Failed to create home cook profile');
      }

      // Create Stripe Connect account
      const accountResponse = await fetch('/api/stripe/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!accountResponse.ok) {
        throw new Error('Failed to create Stripe account');
      }

      const { account: accountId } = await accountResponse.json();

      // Create onboarding link
      const onboardingResponse = await fetch('/api/stripe/create-onboarding-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account: accountId }),
      });

      if (!onboardingResponse.ok) {
        throw new Error('Failed to create Stripe onboarding link');
      }

      const { url } = await onboardingResponse.json();

      // Redirect to Stripe onboarding
      window.location.href = url;

    } catch (error) {
      console.error('Error:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Refetch home cook profile after payment or subscription change
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscription') === 'success') {
      checkExistingProfile();
    }
  }, []);

  // Show loading state while Clerk is loading
  if (!isLoaded || !isClient) {
    return (
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4D00] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto">
          <div className="space-y-4">
            <SignUpButton mode="modal">
              <Button 
                className="w-full bg-[#FF4D00] hover:bg-[#E64500] text-white"
                onClick={handleSignUpClick}
              >
                Get Started
              </Button>
            </SignUpButton>
            
            <SignInButton mode="modal">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  // Main form - typeform style with one question at a time
  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-[950px] flex flex-col md:flex-row gap-4">
        {/* Left side - Background image with rounded corners */}
        <div className="w-full md:w-1/2 h-1/3 md:h-full relative rounded-3xl overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/7601412/pexels-photo-7601412.jpeg"
            alt="Cooking preparation"
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-3xl"></div>
          
          {/* Progress bar on image */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-800 bg-opacity-40 rounded-t-3xl">
            <div 
              className="h-full transition-all duration-500 ease-out rounded-t-3xl"
              style={{ width: `${progress}%`, backgroundColor: brandColor }}
            ></div>
        </div>

          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-3xl font-bold">Gruby</h1>
            <p className="text-sm opacity-80">Step {currentStep > 0 ? currentStep : 0} of {FORM_STEPS.length - 1}</p>
          </div>
        </div>

        {/* Right side - Form content with rounded corners */}
        <div 
          className="w-full md:w-1/2 rounded-3xl p-6 md:p-8 flex flex-col bg-white overflow-hidden"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Mobile progress bar */}
          <div className="md:hidden h-2 bg-gray-200 rounded-full mb-4">
            <div 
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%`, backgroundColor: brandColor }}
            ></div>
          </div>
          
          <div className="flex-1 flex flex-col justify-between min-h-0">
            <div className="flex-1 overflow-y-auto px-2">
              {/* Title for the current step */}
              <div className="mb-6">
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-2 text-gray-900"
                >
                  {currentStepData?.title}
                </h2>
                {currentStepData?.subtitle && (
                  <p className="text-gray-600 text-lg">
                    {currentStepData.subtitle}
                  </p>
                )}
                </div>

              {/* Form fields */}
              <div className="space-y-6">
                {currentStepData?.id !== 'images' && currentStepData?.fields.map((field) => (
                  <div key={field.id}>
                    {renderField(
                      currentStepData.id,
                      field,
                      formData[currentStepData.id] ?? {}
                    )}
                  </div>
                ))}
                
                {/* Textarea if the step has one */}
                {currentStepData?.hasTextArea && (
                  <div className="w-full mt-6">
                    <Label className="block text-xl font-medium text-gray-800 mb-3">
                      {currentStepData.textAreaLabel ?? "Additional information"}
                    </Label>
                  <Textarea
                      className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:border-transparent text-base min-h-[120px]"
                      placeholder={currentStepData.textAreaPlaceholder ?? "Tell us more..."}
                      onChange={(e) => handleInputChange(currentStepData.id, 'bio', e.target.value)}
                      value={formData[currentStepData.id]?.bio ?? ''}
                  />
                </div>
                )}

                {/* Payment setup step */}
                {currentStepData?.id === 'stripe-connect' && (
                  <div className="text-center space-y-6">
                    <div className="p-6 border-2 border-gray-200 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment Setup</h3>
                      <p className="text-gray-600 mb-4">
                        You'll be redirected to Stripe's secure platform to complete your payment setup.
                      </p>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>• Government-issued ID required</p>
                        <p>• SSN or ITIN needed</p>
                        <p>• Bank account information</p>
                        <p>• Takes about 5 minutes</p>
                      </div>
                </div>
                    <button
                      onClick={handleStripeConnectOnboarding}
                      className="w-full bg-[#FF4D00] hover:bg-[#E64500] text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-4"
                      disabled={isSubmitting}
                  >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Continue</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
                </div>
              </div>

            {/* Images step - Side by side layout */}
            {currentStepData?.id === 'images' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentStepData.fields.map((field) => (
                    <div key={field.id}>
                      {renderField(currentStepData.id, field, formData[currentStepData.id] || {})}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Your Profile Preview</h3>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Hero Section Preview */}
                    <div className="relative h-32 w-full">
                      <img
                        src={formData['images']?.bannerImage || '/default-cover.jpg'}
                        alt="Banner preview"
                        className="w-full h-full object-cover brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <div className="flex items-end gap-3">
                          <div className="w-12 h-12 rounded-full border-3 border-white shadow-lg overflow-hidden flex-shrink-0">
                            <img
                              src={formData['images']?.profileImage || '/default-avatar.jpg'}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-bold mb-1">Your Name</h3>
                            <div className="flex items-center gap-1 mb-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-xs text-gray-200">Location not specified</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                                Your Cuisine
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                                Your Experience
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Preview */}
                    <div className="p-3">
                      <div className="border-b border-gray-200 mb-3">
                        <div className="flex space-x-4">
                          {['Products', 'About', 'Reviews'].map((tab) => (
                            <button key={tab} className="py-1 px-1 border-b-2 border-transparent text-xs font-medium text-gray-500">
                              {tab}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="text-center py-4 text-gray-500 text-xs">
                        Your products and content will appear here
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 px-2">
              <button
                onClick={handlePrevious}
                className="p-3 text-gray-500 hover:text-gray-800 transition-colors"
                disabled={currentStep === 0}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="text-center">
                <span className="text-sm text-gray-500 block">
                  Press Enter ↵ to continue
                </span>
                <span className="text-xs text-gray-400 block mt-1">
                  Protected by Gruby's Privacy Policy
                </span>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center justify-center p-3 text-white bg-[#FF4D00] rounded-full hover:bg-[#E64500] transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  )}
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Helper function to render different field types
  function renderField(
    stepId: string,
    field: Field,
    stepData: Record<string, string>
  ) {
    // Input field (text, email, tel)
    if ('type' in field && field.type !== 'image' && 'placeholder' in field) {
      return (
        <div>
          <Label className="block text-xl font-medium text-gray-800 mb-3">
            {field.label}
          </Label>
          <Input
            type={field.type}
            id={field.id}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:border-transparent text-base"
            placeholder={field.placeholder ?? ''}
            onChange={(e) => handleInputChange(stepId, field.id, e.target.value)}
            value={stepData[field.id] ?? ''}
          />
        </div>
      );
    }
    
    // Image field
    if ('type' in field && field.type === 'image' && 'accept' in field) {
      return (
        <div>
          <Label className="block text-xl font-medium text-gray-800 mb-3">
            {field.label}
          </Label>
          <div className="space-y-3">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF4D00] transition-colors min-h-[280px] flex items-center justify-center">
              <input
                type="file"
                id={field.id}
                accept={field.accept}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const base64 = event.target?.result as string;
                      handleInputChange(stepId, field.id, base64);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label htmlFor={field.id} className="cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    stepData[field.id] ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {stepData[field.id] ? (
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-700">
                      {stepData[field.id] ? 'Image uploaded' : 'Click to upload'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stepData[field.id] ? 'Click to replace' : 'PNG, JPG, GIF up to 10MB'}
                    </p>
                  </div>
                </div>
              </label>
            </div>
            
            {stepData[field.id] && (
              <div className="flex justify-center">
                <input
                  type="file"
                  id={`${field.id}-replace`}
                  accept={field.accept}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        handleInputChange(stepId, field.id, base64);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label htmlFor={`${field.id}-replace`} className="cursor-pointer">
                  <button className="px-3 py-1.5 bg-[#FF4D00] text-white rounded text-sm font-medium">
                    Replace Image
                  </button>
                </label>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // Select options
    if ('options' in field) {
      return (
        <div>
          <Label className="block text-xl font-medium text-gray-800 mb-4">
            {field.label}
          </Label>
          {isClient ? (
            <Select 
              value={stepData[field.id] ?? ''} 
              onValueChange={(value) => handleInputChange(stepId, field.id, value)}
            >
              <SelectTrigger className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:border-transparent text-base">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-500">
              Loading...
            </div>
          )}
        </div>
      );
    }
    
    return null;
  }

  async function handleStripeConnectOnboarding() {
    setIsSubmitting(true);
    try {
      const accountResponse = await fetch('/api/stripe/create-account', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (!accountResponse.ok) throw new Error('Failed to create Stripe account');
      const { account: accountId } = await accountResponse.json();
      const onboardingResponse = await fetch('/api/stripe/create-onboarding-link', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ account: accountId }) });
      if (!onboardingResponse.ok) throw new Error('Failed to create Stripe onboarding link');
      const { url } = await onboardingResponse.json();
      window.location.href = url;
    } catch (error) {
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
} 