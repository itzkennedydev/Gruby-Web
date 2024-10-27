import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/system';
import dynamic from 'next/dynamic';
import type { Chef } from '@/server/db/schema';

const ChefCard = dynamic(() => import('../components/ChefCard'), {
  ssr: false,
});

const ScrollableGrid = styled(Grid)({
  display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
});

const ScrollButton = styled(Button)({
  minWidth: '40px',
  height: '40px',
  borderRadius: '50%',
  padding: 0,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#FF4D00',
  },
  '& .MuiTab-root.Mui-selected': {
    color: '#FF4D00',
  },
});

const EmptyStateWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  borderRadius: '12px',
  minHeight: '200px',
}));

const MainPage: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchChefs() {
      try {
        const response = await fetch('/api/chefs');
        if (!response.ok) {
          throw new Error('Failed to fetch chefs');
        }
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/7613560/pexels-photo-7613560.jpeg)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="relative h-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <h1 className="text-5xl font-bold text-white mb-6">
            Discover Amazing
            <br />
            Local Chefs
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-xl">
            Connect with talented culinary artists in your area and experience 
            unforgettable dining experiences.
          </p>
          <button className="px-6 py-3 bg-[#FF4D00] hover:bg-[#FF4D00]/80 text-white rounded-lg transition-colors">
            Find Your Chef
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        <CategoryTabs categories={categories} />

        {categories.map((category, index) => {
          const categoryChefs = chefs.filter(chef => chef.specialty === category);
          return (
            <Box key={category} sx={{ marginBottom: index < categories.length - 1 ? '18px' : 0, position: 'relative' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold" marginBottom="1rem">
                {category}
              </Typography>
              {categoryChefs.length === 0 ? (
                <EmptyState category={category} />
              ) : (
                <ChefRow category={category} chefs={categoryChefs} />
              )}
            </Box>
          );
        })}
      </div>
    </>
  );
};

const CategoryTabs: React.FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <StyledTabs
      value={null}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="category selector"
      sx={{ marginBottom: '2rem' }}
    >
      <Tab label="All" value={null} />
      {categories.map((category) => (
        <Tab key={category} label={category} value={category} />
      ))}
    </StyledTabs>
  );
};

const EmptyState: React.FC<{ category: string }> = ({ category }) => (
  <EmptyStateWrapper>
    <Typography variant="h6" gutterBottom>
      No items found in {category}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Check back later for new items in this category.
    </Typography>
  </EmptyStateWrapper>
);

const ChefRow: React.FC<{ category: string, chefs: Chef[] }> = ({ category, chefs }) => {
  const scrollRow = (direction: 'left' | 'right', rowId: string) => {
    const row = document.getElementById(rowId);
    if (row) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollButton
        onClick={() => scrollRow('left', `row-${category}`)}
        sx={{ left: -20 }}
      >
        <ArrowBackIosIcon />
      </ScrollButton>
      <ScrollableGrid container spacing={2} id={`row-${category}`}>
        {chefs.map((chef) => (
          <Grid item key={chef.id}>
            <ChefCard chef={chef} isFavorite={false} onToggleFavorite={() => {/* Implement toggle favorite logic */}} />
          </Grid>
        ))}
      </ScrollableGrid>
      <ScrollButton
        onClick={() => scrollRow('right', `row-${category}`)}
        sx={{ right: -20 }}
      >
        <ArrowForwardIosIcon />
      </ScrollButton>
    </>
  );
};

export default MainPage;
