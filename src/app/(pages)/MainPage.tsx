'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

const HomeCookCard = dynamic(() => import('@/components/HomeCookCard'), {
  ssr: false,
});

interface HomeCook {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  coverImage: string | null;
  cuisine: string;
  experience: string;
  averageRating: number;
  totalReviews: number;
  subscriptionStatus?: string;
  city?: string;
  state?: string;
  productCount: number;
}

interface ScrollableGridProps {
  children: ReactNode;
  id: string;
}

// Scrollable grid with responsive adjustments
const ScrollableGrid = ({ children, id }: ScrollableGridProps) => (
  <div 
    id={id}
    className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 px-2 -mx-2 md:gap-6 md:pb-6"
  >
    {children}
  </div>
);

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  className: string;
  show: boolean;
}

// Responsive scroll button
const ScrollButton = ({ direction, onClick, className, show }: ScrollButtonProps) => {
  if (!show) return null;
  
  return (
    <button
      onClick={onClick}
      className={`
        hidden md:flex items-center justify-center w-10 h-10 rounded-full 
        bg-white/80 hover:bg-white shadow-md transition-colors
        absolute top-1/2 -translate-y-1/2 z-10
        ${className}
      `}
    >
      {direction === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`
      px-2 md:px-3 pb-1 text-base font-medium transition-colors duration-200
      border-b-2
      ${isActive 
        ? 'border-[#FF4D00] text-[#FF4D00] font-semibold' 
        : 'border-transparent text-gray-600 hover:text-[#FF4D00]'}
    `}
    style={{ minWidth: 70 }}
  >
    {children}
  </button>
);

const MainPage = () => {
  const [homeCooks, setHomeCooks] = useState<HomeCook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHomeCooks() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/home-cooks?featured=true');
        if (!response.ok) throw new Error('Failed to fetch home cooks');
        const data = await response.json() as HomeCook[];
        setHomeCooks(data);
        
        // Extract unique categories from home cooks
        const uniqueCategories = Array.from(
          new Set(data.map(cook => cook.cuisine).filter((category): category is string => Boolean(category)))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Error fetching home cooks. Please try again later.');
        console.error('Error fetching home cooks:', err);
      } finally {
        setIsLoading(false);
      }
    }
    void fetchHomeCooks();
  }, []);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4D00] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading amazing home cooks...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-red-600">
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#E64500] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/7613560/pexels-photo-7613560.jpeg)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Discover Amazing<br />Local Home Cooks
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl">
            Connect with talented home cooks in your area and experience 
            authentic homemade meals made with love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-4 py-2 md:px-6 md:py-3 bg-[#FF4D00] hover:bg-[#FF4D00]/80 text-white rounded-lg transition-colors text-sm md:text-base">
              Find Your Home Cook
            </button>
            <Link 
              href="/home-cook-onboarding" 
              className="px-4 py-2 md:px-6 md:py-3 bg-transparent hover:bg-white/10 text-white border-2 border-white hover:border-white/80 rounded-lg transition-colors text-sm md:text-base font-medium text-center"
            >
              Become a Home Cook
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-16 md:pb-20 flex-1">
        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="mb-6 md:mb-8 overflow-x-auto">
            <div className="flex gap-4 min-w-max px-1 py-1">
              <TabButton 
                isActive={activeCategory === null}
                onClick={() => setActiveCategory(null)}
              >
                All Cuisines
              </TabButton>
              {categories.map((category) => (
                <TabButton 
                  key={category}
                  isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </TabButton>
              ))}
            </div>
          </div>
        )}

        {/* Home Cooks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {homeCooks
            .filter(cook => !activeCategory || cook.cuisine === activeCategory)
            .map((homeCook) => (
              <HomeCookCard
                key={homeCook.id}
                homeCook={homeCook}
              />
            ))}
        </div>

        {/* Empty State */}
        {homeCooks.length === 0 && (
          <div className="rounded-lg border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No Home Cooks Found</h3>
            <p className="text-gray-600">
              Check back later for new home cooks in your area.
            </p>
          </div>
        )}

        {/* No Home Cooks in Category */}
        {homeCooks.length > 0 && activeCategory && 
         homeCooks.filter(cook => cook.cuisine === activeCategory).length === 0 && (
          <div className="rounded-lg border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No Home Cooks in {activeCategory}</h3>
            <p className="text-gray-600">
              Try selecting a different cuisine or check back later.
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage; 