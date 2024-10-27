import React, { useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { Chef } from '@/server/db/schema';

const ChefCard = dynamic(() => import('../components/ChefCard'), {
  ssr: false,
});

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
      px-4 py-2 text-sm md:text-base whitespace-nowrap
      ${isActive 
        ? 'text-[#FF4D00] border-b-2 border-[#FF4D00]' 
        : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
      }
    `}
  >
    {children}
  </button>
);

const MainPage = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChefs() {
      try {
        const response = await fetch('/api/chefs');
        if (!response.ok) throw new Error('Failed to fetch chefs');
        const data = await response.json() as Chef[];
        setChefs(data);
        const uniqueCategories = Array.from(new Set(data.map(chef => chef.specialty)));
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Error fetching chefs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    void fetchChefs();
  }, []);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen">
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
        <div className="relative h-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Discover Amazing<br />Local Chefs
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl">
            Connect with talented culinary artists in your area and experience 
            unforgettable dining experiences.
          </p>
          <button className="px-4 py-2 md:px-6 md:py-3 bg-[#FF4D00] hover:bg-[#FF4D00]/80 text-white rounded-lg transition-colors text-sm md:text-base">
            Find Your Chef
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Category Tabs */}
        <div className="mb-6 md:mb-8 overflow-x-auto">
          <div className="flex space-x-4 border-b border-gray-200 min-w-max">
            <TabButton 
              isActive={activeCategory === null}
              onClick={() => setActiveCategory(null)}
            >
              All
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

        {/* Category Sections */}
        {categories.map((category, index) => {
          const categoryChefs = chefs.filter(chef => 
            chef.specialty === category && 
            (!activeCategory || activeCategory === category)
          );
          
          if (categoryChefs.length === 0) return null;

          return (
            <div key={category} className={`relative ${index < categories.length - 1 ? 'mb-8 md:mb-12' : ''}`}>
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                {category}
              </h2>
              
              <div className="relative">
                <ScrollButton 
                  direction="left"
                  onClick={() => {
                    const row = document.getElementById(`row-${category}`);
                    if (row) row.scrollBy({ left: -300, behavior: 'smooth' });
                  }}
                  className="-left-5"
                  show={categoryChefs.length > 1}
                />

                <ScrollableGrid id={`row-${category}`}>
                  {categoryChefs.map((chef) => (
                    <div key={chef.id} className="w-[280px] flex-none">
                      <ChefCard 
                        chef={chef}
                        isFavorite={false}
                        onToggleFavorite={() => {/* Implement toggle favorite logic */}}
                      />
                    </div>
                  ))}
                </ScrollableGrid>

                <ScrollButton 
                  direction="right"
                  onClick={() => {
                    const row = document.getElementById(`row-${category}`);
                    if (row) row.scrollBy({ left: 300, behavior: 'smooth' });
                  }}
                  className="-right-5"
                  show={categoryChefs.length > 1}
                />
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="rounded-lg border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No Categories Found</h3>
            <p className="text-gray-600">
              Check back later for new chefs and categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;