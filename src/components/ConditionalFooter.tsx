'use client';

import { useEffect, useState } from 'react';
import { Footer } from './Footer';

export default function ConditionalFooter() {
  const [shouldHide, setShouldHide] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    // Check if we're on the onboarding page
    if (typeof window !== 'undefined') {
      const isOnboardingPage = window.location.pathname.includes('/home-cook-onboarding');
      setShouldHide(isOnboardingPage);
    }
  }, []);
  
  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }
  
  // Hide footer on onboarding page
  if (shouldHide) {
    return null;
  }
  
  return <Footer />;
} 