'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEmail, setSubmitting, setSubmitted, setError } from '@/store/slices/betaSlice';
import { setWaitlistModalOpen } from '@/store/slices/uiSlice';
import { 
  Loader2,
  X,
  Check
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { calculateMealPrice } from '@/lib/kroger-api';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Features data
const features = [
  {
    title: 'From Recipe to Cart in Seconds',
    description: 'Tap any recipe to build your grocery list. We\'ll even show you the cheapest options nearby.',
  },
  {
    title: 'Discover Local Home Cooks',
    description: 'Connect with talented home cooks in your neighborhood and enjoy authentic, home-cooked meals.',
  },
  {
    title: 'Watch Your Savings Grow',
    description: 'Every home-cooked meal adds up. Track your wins and see exactly how much you\'re saving.',
  },
  {
    title: 'Find the Best Deals',
    description: 'We show you the cheapest grocery options nearby, so you always get the best prices.',
  },
  {
    title: 'Save Time & Money',
    description: 'The average American spends $300/month on takeout. Keep that money where it belongs — in your pocket.',
  },
  {
    title: 'Budget-Friendly Cooking',
    description: 'Gruby is a budgeting-focused cooking companion designed to show you the real financial impact of cooking at home.',
  },
];

// App slides data
const appSlides = [
  {
    title: 'Your kitchen companion',
    description: 'Browse recipes, build shopping lists, and track your savings — all from one beautifully designed app.',
    features: ['Instant grocery lists', 'Real-time price tracking', 'Savings dashboard'],
  },
  {
    title: 'Smart meal planning',
    description: 'Plan your week with intelligent suggestions based on your budget, preferences, and what\'s on sale.',
    features: ['Weekly meal plans', 'Budget optimization', 'Dietary preferences'],
  },
  {
    title: 'Track every dollar',
    description: 'See exactly how much you save with every home-cooked meal. Watch your monthly savings grow.',
    features: ['Detailed analytics', 'Monthly reports', 'Savings goals'],
  },
];

// Benefits data
const benefits = [
  {
    title: 'Cook More, Spend Less',
    description: 'The average American spends $300/month on takeout. Keep that money where it belongs — in your pocket.',
    stats: '$300',
    statLabel: 'Average monthly savings',
  },
  {
    title: 'Join a Community of Cooks',
    description: 'Join a community of other cooks. Share your recipes, connect with fellow home chefs, and grow together.',
    stats: 'Growing',
    statLabel: 'Community of cooks',
  },
  {
    title: 'Track Your Progress',
    description: 'See exactly how much you\'re saving with every home-cooked meal. Watch your savings grow over time.',
    stats: 'Real-time',
    statLabel: 'Savings tracking',
  },
];

// About values
const values = [
  {
    title: 'Community First',
    description: 'We believe in building a community of home cooks who share recipes, support each other, and grow together.',
  },
  {
    title: 'Financial Wellness',
    description: 'Our mission is to help people understand the real financial impact of their food choices and save money.',
  },
  {
    title: 'Accessibility',
    description: 'Everyone deserves access to great food. Gruby makes home cooking accessible and affordable for everyone.',
  },
];

// Comparison data with images
interface MealComparison {
  meal: string;
  image: string;
  delivery: {
    price: number;
    fees: number;
    tip: number;
    total: number;
  };
  homeCooked: {
    ingredients: string[];
    price: number;
    servings: number;
    perServing: number;
    loading?: boolean;
  };
  savings: number;
  savingsPercent: number;
}

const initialMealComparisons: MealComparison[] = [
  {
    meal: 'Chicken Stir Fry',
    image: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800',
    delivery: {
      price: 16.99,
      fees: 3.50,
      tip: 3.00,
      total: 23.49,
    },
    homeCooked: {
      ingredients: ['Chicken breast', 'Bell pepper', 'Broccoli', 'Rice', 'Soy sauce'],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
  {
    meal: 'Pasta Carbonara',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    delivery: {
      price: 15.99,
      fees: 3.25,
      tip: 2.75,
      total: 21.99,
    },
    homeCooked: {
      ingredients: ['Pasta', 'Bacon', 'Eggs', 'Parmesan cheese', 'Heavy cream'],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
  {
    meal: 'Burger & Fries',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    delivery: {
      price: 14.99,
      fees: 3.00,
      tip: 2.50,
      total: 20.49,
    },
    homeCooked: {
      ingredients: ['Ground beef', 'Hamburger buns', 'Cheese', 'Potatoes', 'Lettuce'],
      price: 0,
      servings: 4,
      perServing: 0,
      loading: true,
    },
    savings: 0,
    savingsPercent: 0,
  },
];

// Footer data - removed social links for cleaner design

// Phone Mockup Component
function PhoneMockup({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto w-[200px] h-[420px] sm:w-[240px] sm:h-[500px] md:w-[260px] md:h-[540px] bg-[#1a1a1a] rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] p-2 sm:p-2.5 shadow-2xl ring-1 ring-black/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 sm:w-24 sm:h-5 md:w-28 md:h-6 bg-[#1a1a1a] rounded-b-xl sm:rounded-b-2xl z-10" />
        <div className="w-full h-full bg-white rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem] overflow-hidden flex items-center justify-center">
          {children || (
            <div className="text-center text-[#717171] p-4 sm:p-6">
              <p className="text-xs sm:text-sm font-medium">Phone</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tablet Mockup Component (Landscape iPad)
function TabletMockup({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative mx-auto w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[720px] aspect-[4/3] bg-[#1a1a1a] rounded-xl sm:rounded-2xl md:rounded-[1.5rem] lg:rounded-[1.75rem] p-2 sm:p-2.5 shadow-2xl ring-1 ring-black/10">
        <div className="w-full h-full bg-white rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[1.25rem] overflow-hidden flex items-center justify-center">
          {children || (
            <div className="text-center text-[#717171] p-4 sm:p-6">
              <p className="text-xs sm:text-sm font-medium">Tablet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Animated App Preview Section Component
function AppPreviewSectionAnimated({ currentSlide, setCurrentSlide }: { currentSlide: number; setCurrentSlide: (index: number) => void }) {
  return (
    <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-2xl sm:rounded-3xl pt-12 sm:pt-16 md:pt-36 lg:pt-40 px-6 sm:px-8 md:px-12 lg:px-16 pb-20 sm:pb-24 md:pb-12 lg:pb-16 relative min-h-[500px] sm:min-h-[560px] md:min-h-[550px] lg:min-h-[600px] flex flex-col lg:flex-row lg:items-center" style={{ containerType: 'inline-size' }}>
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 sm:gap-12 lg:gap-16 w-full h-full">
            {/* Content and Progress Bar - Right side / Top on mobile */}
            <div className="flex flex-col justify-center items-center lg:items-start max-w-md w-full px-4 sm:px-0 lg:ml-[45%] order-1 lg:-mt-28 flex-shrink-0 z-10 pb-[482px] sm:pb-[560px] md:pb-[620px] lg:pb-0">
              {/* Heading and Description */}
              <div className="text-left mb-6 sm:mb-8 w-full">
                <h2 className="font-semibold text-white mb-4 sm:mb-6 whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 3rem)' }}>
                  Cooking made simple
                </h2>
                <p className="text-gray-300 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1.25rem)' }}>
                  Everything you need to save money on meals, right in your pocket
                </p>
              </div>

              {/* Rotating Bullet Points */}
              <div className="relative overflow-hidden min-h-[200px] sm:min-h-[220px] mb-0 w-full">
                {appSlides.map((slide, index) => (
                  <ul 
                    key={index}
                    className={`space-y-4 sm:space-y-5 list-disc list-inside ${
                      currentSlide === index 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 absolute top-0 left-0 right-0 translate-x-8'
                    }`}
                  >
                    {slide.features.map((feature, i) => (
                      <li key={i} className="text-base sm:text-lg text-white leading-relaxed">
                        {feature}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              
              {/* Progress Bar */}
              <div className="flex justify-between items-center w-full gap-2 -mt-8 sm:-mt-10">
                {appSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 sm:h-1.5 rounded-full transition-colors duration-200 flex-1 ${
                      currentSlide === index 
                        ? 'bg-white' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* App Store Links */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mt-6 sm:mt-8">
                <a
                  href="https://apps.apple.com/app/gruby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 sm:h-14 bg-white text-black rounded-xl sm:rounded-2xl px-4 sm:px-6 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Download on the App Store"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] sm:text-xs leading-tight">Download on the</span>
                    <span className="text-sm sm:text-base font-semibold leading-tight">App Store</span>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.gruby.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 sm:h-14 bg-white text-black rounded-xl sm:rounded-2xl px-4 sm:px-6 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Get it on Google Play"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,14.5L15.12,12.42L17.19,10.33L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] sm:text-xs leading-tight">Get it on</span>
                    <span className="text-sm sm:text-base font-semibold leading-tight">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Image - Left side on desktop, bottom on mobile */}
            <div className="flex-shrink-0 absolute bottom-0 left-1/2 -translate-x-1/2 lg:absolute lg:bottom-0 lg:left-16 lg:translate-x-0 z-0 order-2 w-full lg:w-auto flex justify-center lg:justify-start">
              <Image
                src="/Mobile phone.png"
                alt="Gruby mobile app"
                width={500}
                height={1000}
                className="w-auto h-auto object-contain"
                style={{
                  maxWidth: 'clamp(420px, 40vw, 720px)',
                }}
                priority
                quality={100}
                sizes="(max-width: 640px) 500px, (max-width: 768px) 450px, (max-width: 1024px) 400px, (max-width: 1280px) 480px, (max-width: 1536px) 640px, 720px"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Features Section Component
function FeaturesSectionAnimated() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const cardWidth = containerWidth; // First card is full width
      const otherCardWidth = containerWidth * 0.85; // Other cards are 85vw
      
      // Calculate which card is currently in view
      let currentIndex = 0;
      let accumulatedWidth = cardWidth;
      
      if (scrollLeft < cardWidth * 0.5) {
        currentIndex = 0;
      } else {
        currentIndex = Math.round((scrollLeft - cardWidth + otherCardWidth * 0.5) / (otherCardWidth + 16)) + 1;
        currentIndex = Math.min(currentIndex, features.length - 1);
      }
      
      setActiveIndex(currentIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="features" 
      className="py-12 sm:py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8" style={{ containerType: 'inline-size' }}>
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-semibold text-[#222222] mb-2 sm:mb-3" style={{ fontSize: 'clamp(1.25rem, 2vw + 0.75rem, 1.875rem)' }}>
            Everything you need to cook smarter
          </h2>
          <p className="text-sm sm:text-base text-[#717171] max-w-xl mx-auto px-4">
            Simple tools that help you save money and eat better
          </p>
        </div>

        {/* Mobile: Horizontal scrollable carousel */}
        <div className="sm:hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" 
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#E5E5E5] flex-shrink-0 w-[85vw] max-w-[320px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <h3 className="text-lg font-semibold text-[#222222] mb-2 leading-tight" style={{ fontSize: 'clamp(1rem, 4vw, 1.125rem)' }}>
                  {feature.title}
                </h3>
                <p className="text-[#717171] text-sm leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 3.5vw, 0.9375rem)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (!container) return;
                  const cardWidth = container.clientWidth;
                  const otherCardWidth = container.clientWidth * 0.85;
                  const scrollPosition = index === 0 ? 0 : cardWidth + (index - 1) * (otherCardWidth + 16);
                  container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex 
                    ? 'w-8 h-2 bg-[#FF1E00]' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to feature ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        {/* Tablet and Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E5] hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-[#717171] text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Animated Tablet Preview Section
function TabletPreviewSectionAnimated() {
  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#222222] mb-2 sm:mb-3">
            Phone and tablet
          </h2>
          <p className="text-sm sm:text-base text-[#717171] max-w-xl mx-auto px-4">
            Access Gruby wherever you are
          </p>
        </div>

        <div className="bg-[#f5f5f7] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
          <div className="flex justify-center">
            <TabletMockup>
              {/* Add your tablet app screenshot here */}
            </TabletMockup>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Benefits Section
function BenefitsSectionAnimated() {
  return (
    <section 
      id="how-it-works" 
      className="py-12 sm:py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#222222] mb-2 sm:mb-3">
            Why choose Gruby?
          </h2>
          <p className="text-sm sm:text-base text-[#717171] max-w-xl mx-auto px-4">
            Join thousands cooking smarter every day
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="text-center px-4"
            >
              <p className="text-3xl sm:text-4xl font-bold text-[#FF1E00] mb-2">{benefit.stats}</p>
              <p className="text-xs text-[#717171] uppercase tracking-wide mb-3 sm:mb-4">{benefit.statLabel}</p>
              <h3 className="text-base sm:text-lg font-semibold text-[#222222] mb-2">
                {benefit.title}
              </h3>
              <p className="text-[#717171] text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Animated About Section
function AboutSectionAnimated() {
  return (
    <section 
      id="about" 
      className="py-12 sm:py-16 md:py-20 lg:py-28"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#222222] mb-4 sm:mb-6">
            About Gruby
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#717171] leading-relaxed">
            A budgeting-focused cooking companion showing the real financial impact of cooking at home. 
            We connect food lovers with talented home cooks in their neighborhood.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="text-center"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] mb-3 sm:mb-4 leading-tight">
                {value.title}
              </h3>
              <p className="text-[#717171] text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Animated CTA Section
function CTASectionAnimated({ 
  localEmail, 
  setLocalEmail, 
  handleBetaSignup, 
  isSubmitting, 
  error, 
  isSubmitted, 
  email 
}: { 
  localEmail: string; 
  setLocalEmail: (email: string) => void; 
  handleBetaSignup: (e: React.FormEvent) => void; 
  isSubmitting: boolean; 
  error: string | null; 
  isSubmitted: boolean; 
  email: string;
}) {
  return (
    <section 
      id="beta-signup" 
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#1a1a1a]"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 sm:gap-12 lg:gap-16">
            {/* Content - Top on mobile, left on desktop */}
            <div className="flex-1 text-center lg:text-left order-1 w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3 sm:mb-4">
                Join the waitlist
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
                Get early access and be the first to know when we launch
              </p>
              
              {isSubmitted ? (
                <div className="bg-white/5 ring-1 ring-white/10 rounded-2xl p-6">
                  <p className="text-white font-medium mb-2">You're on the list!</p>
                  <p className="text-gray-400 text-sm">
                    We'll notify {email} when Gruby launches.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBetaSignup} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <input
                    type="email"
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2.5 sm:py-3 h-[42px] sm:h-[44px] rounded-full bg-white text-[#222222] placeholder-[#717171] focus:outline-none focus:ring-2 focus:ring-[#FF1E00] transition-colors duration-200 text-sm sm:text-base leading-normal"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 sm:py-3 h-[42px] sm:h-[44px] bg-[#FF1E00] hover:bg-[#E01A00] text-white text-sm sm:text-base font-medium rounded-full transition-colors duration-200 disabled:opacity-50 leading-normal whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Join'
                    )}
                  </Button>
                </form>
              )}
              {error && (
                <p className="mt-3 text-red-400 text-sm">{error}</p>
              )}
            </div>
            
            {/* Image area - Bottom on mobile, right on desktop */}
            <div className="flex-shrink-0 order-2 w-full lg:w-auto flex justify-center lg:justify-end">
              {/* Image placeholder - will be positioned here if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Comparison Section
function ComparisonSectionAnimated({ comparisons, isLoading }: { comparisons: MealComparison[]; isLoading: boolean }) {
  return (
    <section
      id="comparison"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#f5f5f7]"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <h2 className="font-bold text-[#222222] mb-3 sm:mb-4 max-w-3xl mx-auto px-4 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw + 1rem, 3rem)' }}>
                Spoiler: You're paying <span className="text-[#FF1E00]">3x more</span> for the same meal.
              </h2>
              <p className="text-[#717171] max-w-2xl mx-auto px-4 mb-2 sm:mb-3 font-medium" style={{ fontSize: 'clamp(1.125rem, 1.5vw + 0.875rem, 1.5rem)' }}>
            That $24 delivery order? The ingredients cost $8. The rest is fees, tips, and markup.
          </p>
          <p className="text-sm text-[#999999] max-w-xl mx-auto px-4">
            Live prices from major retailers
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {comparisons.map((comparison, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image */}
                    <div className="lg:col-span-3 relative h-40 sm:h-48 lg:h-auto">
                      <Image
                        src={comparison.image}
                        alt={comparison.meal}
                        fill
                        className="object-cover"
                        loading={index < 2 ? "eager" : "lazy"}
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        quality={100}
                        fetchPriority={index < 2 ? "high" : "auto"}
                      />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent lg:bg-gradient-to-t" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {comparison.meal}
                    </h3>
                  </div>
                </div>

                {/* Comparison Content */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2">
                  {/* Delivery - The "bad" option */}
                  <div className="p-4 sm:p-6 md:p-8 bg-white border-b md:border-b-0 md:border-r border-gray-200">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-xs sm:text-sm font-medium text-[#222222] mb-0.5">Delivery</p>
                        <p className="text-[10px] sm:text-xs text-[#717171] leading-tight">1 serving • 45 min wait • cold on arrival</p>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm mb-3 sm:mb-4">
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Food</span>
                        <span className="text-[#222222]">${comparison.delivery.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Fees & service charges</span>
                        <span className="text-[#222222]">${comparison.delivery.fees.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Tip</span>
                        <span className="text-[#222222]">${comparison.delivery.tip.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-end min-h-[3rem] sm:min-h-[3.5rem]">
                        <span className="text-xs sm:text-sm font-medium text-[#222222]">Your total</span>
                        <span className="text-xl sm:text-2xl font-bold text-[#222222]">${comparison.delivery.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Home Cooking - The "good" option */}
                  <div className="p-4 sm:p-6 md:p-8 bg-white">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-xs sm:text-sm font-medium text-[#222222] mb-0.5">Home cooked</p>
                        <p className="text-[10px] sm:text-xs text-[#717171] leading-tight">{comparison.homeCooked.servings} servings • fresh • actually hot</p>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16A34A]" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <p className="text-[10px] sm:text-xs text-[#717171] mb-1.5 sm:mb-2">What you'll need:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {comparison.homeCooked.ingredients.map((ing, i) => (
                          <span 
                            key={i}
                            className="px-1.5 sm:px-2 py-0.5 bg-white rounded text-[10px] sm:text-xs text-[#222222] ring-1 ring-black/5"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm mb-3 sm:mb-4">
                      <div className="flex justify-between">
                        <span className="text-[#717171]">Groceries (for {comparison.homeCooked.servings})</span>
                        <span className="text-[#222222]">
                          {comparison.homeCooked.loading ? (
                            <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                          ) : (
                            `$${comparison.homeCooked.price.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t border-gray-200 space-y-1.5 sm:space-y-2 min-h-[3rem] sm:min-h-[3.5rem] flex flex-col justify-end">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs sm:text-sm text-[#717171]">Hidden fees</span>
                        <span className="text-xs sm:text-sm text-[#222222]">$0.00</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs sm:text-sm font-medium text-[#222222]">Per serving</span>
                        <span className="text-xl sm:text-2xl font-bold text-[#222222]">
                          {comparison.homeCooked.loading ? (
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          ) : (
                            `$${comparison.homeCooked.perServing.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Strip */}
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-[#222222] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start">
                  <p className="text-white/70 text-xs sm:text-sm">You keep</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {comparison.homeCooked.loading ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white" />
                    ) : (
                      `$${comparison.savings.toFixed(2)}`
                    )}
                  </p>
                  {!comparison.homeCooked.loading && (
                    <span className="px-1.5 sm:px-2 py-0.5 bg-[#16A34A] text-white text-[10px] sm:text-xs font-semibold rounded">
                      Save {comparison.savingsPercent}%
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-xs sm:text-sm text-center sm:text-left">
                  + {comparison.homeCooked.servings - 1} extra meals for tomorrow
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 sm:mt-10 md:mt-12 bg-[#FF1E00] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-white text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
            Stop subsidizing their business model
          </h3>
          <p className="text-sm sm:text-base text-white/90 mb-6 sm:mb-8 max-w-lg mx-auto px-4">
            Delivery apps take 30% from restaurants and charge you fees on top. Cook at home and keep your money.
          </p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto">
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">$300+</p>
              <p className="text-[10px] sm:text-xs text-white/80">Back in your pocket</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">4x</p>
              <p className="text-[10px] sm:text-xs text-white/80">More food</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">0</p>
              <p className="text-[10px] sm:text-xs text-white/80">Hidden fees</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MarketingPage() {
  const dispatch = useAppDispatch();
  const { email, isSubmitting, isSubmitted, error } = useAppSelector((state) => state.beta);
  const waitlistModalOpen = useAppSelector((state) => state.ui.waitlistModalOpen);
  const [localEmail, setLocalEmail] = useState('');
  const [comparisons, setComparisons] = useState<MealComparison[]>(initialMealComparisons);
  const [isLoading, setIsLoading] = useState(true);
  const [footerEmail, setFooterEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % appSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchPrices() {
      setIsLoading(true);
      const updatedComparisons = await Promise.all(
        initialMealComparisons.map(async (comparison) => {
          try {
            const mealData = await calculateMealPrice(comparison.homeCooked.ingredients);
            const perServing = mealData.perServing;
            const total = mealData.total;
            
            const finalTotal = total > 0 ? total : comparison.homeCooked.ingredients.length * 3.5;
            const finalPerServing = finalTotal / 4;
            const savings = comparison.delivery.total - finalPerServing;
            const savingsPercent = Math.round((savings / comparison.delivery.total) * 100);

            return {
              ...comparison,
              homeCooked: {
                ...comparison.homeCooked,
                price: finalTotal,
                perServing: finalPerServing,
                loading: false,
              },
              savings,
              savingsPercent,
            };
          } catch (error) {
            console.error(`Error fetching prices for ${comparison.meal}:`, error);
            const estimatedPrice = comparison.homeCooked.ingredients.length * 3.5;
            const perServing = estimatedPrice / 4;
            const savings = comparison.delivery.total - perServing;
            const savingsPercent = Math.round((savings / comparison.delivery.total) * 100);

            return {
              ...comparison,
              homeCooked: {
                ...comparison.homeCooked,
                price: estimatedPrice,
                perServing,
                loading: false,
              },
              savings,
              savingsPercent,
            };
          }
        })
      );

      setComparisons(updatedComparisons);
      setIsLoading(false);
    }

    fetchPrices();
  }, []);

  const handleBetaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localEmail.trim()) return;

    dispatch(setSubmitting(true));
    dispatch(setError(null));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(setEmail(localEmail));
      dispatch(setSubmitted(true));
      setLocalEmail('');
      setTimeout(() => {
        dispatch(setSubmitted(false));
        dispatch(setWaitlistModalOpen(false));
      }, 3000);
    } catch (err) {
      dispatch(setError('Something went wrong. Please try again.'));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  function handleNewsletterSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFooterEmail('');
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        :root {
          --color-primary: #FF1E00;
          --color-primary-hover: #E01A00;
          --color-text: #222222;
          --color-text-secondary: #717171;
          --color-border: #E5E5E5;
          --color-surface: #f5f5f7;
          --color-success: #16A34A;
        }
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Aeonik Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
      `}</style>

      <div className="min-h-screen flex flex-col bg-white">
        {/* Hero Section */}
        <div className="relative -mt-32 pt-32 h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/HeroImage.jpg"
              alt="Hero background"
              fill
              priority
              quality={100}
              className="object-cover"
              style={{ filter: 'brightness(0.7)' }}
              sizes="100vw"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
            <h1 className="font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw + 1rem, 3rem)' }}>
              Cook Smarter, Save More
            </h1>
            <p className="text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-xl leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1.25rem)' }}>
              Gruby is a budgeting-focused cooking companion designed to show people the real financial impact of cooking at home.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button 
                onClick={() => dispatch(setWaitlistModalOpen(true))}
                className="px-4 py-2 md:px-6 md:py-3 bg-[#FF1E00] hover:bg-[#E01A00] text-white text-sm md:text-base font-medium rounded-full transition-colors duration-200"
              >
                Join Waitlist
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 md:px-6 md:py-3 bg-transparent hover:bg-white/20 text-white border-2 border-white hover:border-white text-sm md:text-base font-medium rounded-full transition-colors duration-200"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* App Preview Section */}
        <AppPreviewSectionAnimated currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />

        {/* Features Section */}
        <FeaturesSectionAnimated />

        {/* Tablet Preview Section */}
        <TabletPreviewSectionAnimated />

        {/* Benefits Section */}
        <BenefitsSectionAnimated />

        {/* Comparison Section - Redesigned */}
        <ComparisonSectionAnimated comparisons={comparisons} isLoading={isLoading} />

        {/* About Section */}
        <AboutSectionAnimated />

        {/* CTA Section */}
        <CTASectionAnimated localEmail={localEmail} setLocalEmail={setLocalEmail} handleBetaSignup={handleBetaSignup} isSubmitting={isSubmitting} error={error} isSubmitted={isSubmitted} email={email} />

        {/* Footer */}
        <footer className="bg-white border-t border-[#E5E5E5]">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <Image
                  src="/GrubyLogo.svg"
                  alt="Gruby Logo"
                  width={100}
                  height={36}
                  className="mb-3 sm:mb-4"
                />
                <p className="text-xs sm:text-sm text-[#717171]">
                  Join a community of home cooks sharing recipes and growing together.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#222222] mb-3 sm:mb-4 text-xs sm:text-sm">Support</h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li><Link href="/about" className="text-[#717171] hover:text-[#222222] transition-colors">About Us</Link></li>
                  <li><Link href="/faq" className="text-[#717171] hover:text-[#222222] transition-colors">FAQ</Link></li>
                  <li><Link href="/contact" className="text-[#717171] hover:text-[#222222] transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#222222] mb-3 sm:mb-4 text-xs sm:text-sm">Legal</h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li><Link href="/terms" className="text-[#717171] hover:text-[#222222] transition-colors">Terms</Link></li>
                  <li><Link href="/privacy" className="text-[#717171] hover:text-[#222222] transition-colors">Privacy</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#222222] mb-3 sm:mb-4 text-xs sm:text-sm">Newsletter</h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base bg-[#f5f5f7] border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF1E00] transition-shadow"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 sm:py-2.5 md:py-3 bg-[#FF1E00] hover:bg-[#E01A00] text-white text-xs sm:text-sm md:text-base font-medium rounded-full transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#E5E5E5]">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <p className="text-center text-xs sm:text-sm text-[#717171]">
                © {new Date().getFullYear()} Gruby. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Join Waitlist Modal */}
        <Dialog open={waitlistModalOpen} onOpenChange={(open) => dispatch(setWaitlistModalOpen(open))}>
          <DialogContent className="sm:max-w-md border-0 outline-none shadow-none bg-white p-6">
            <DialogHeader className="text-center space-y-2 pb-4">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">
                Join the waitlist
              </DialogTitle>
              <DialogDescription className="text-base text-[#717171] px-0">
                Be among the first to experience Gruby. Get early access and exclusive updates.
              </DialogDescription>
            </DialogHeader>
            
            {isSubmitted ? (
              <div className="mt-8 bg-[#f5f5f7] rounded-2xl p-8 text-center border border-gray-200">
                <p className="text-xl font-bold text-[#222222] mb-4">You're in! 🎉</p>
                <p className="text-sm text-[#717171]">
                  We'll send updates to <span className="font-semibold text-[#222222]">{email}</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleBetaSignup} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#222222]">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={localEmail}
                    onChange={(e) => setLocalEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-4 rounded-full bg-white border-2 border-gray-200 text-[#222222] placeholder-[#717171] focus:outline-none focus:ring-2 focus:ring-[#FF1E00] focus:border-[#FF1E00] transition-all text-base hover:border-gray-300"
                    disabled={isSubmitting}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">
                      {error}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#FF1E00] hover:bg-[#E01A00] text-white text-base font-semibold rounded-full transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Securing your spot...
                    </>
                  ) : (
                    'Reserve My Spot'
                  )}
                </Button>
                <p className="text-xs text-center text-[#717171] mt-2">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}