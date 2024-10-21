import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Tabs, Tab, Card, CardMedia, Avatar } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/system';
import dynamic from 'next/dynamic';
import { mockChefs, MealItem } from '../data/mockChefs';
import { Chef } from '@/server/db/schema';

const ChefCard = dynamic(() => import('../components/ChefCard'), {
  ssr: false,
});

const StyledCard = styled(Card)({ 
  width: '288px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'none',
  borderRadius: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  width: '288px',
  height: '130px',
  borderRadius: '12px',
});

const RatingBadge = styled(Box)({
  position: 'absolute',
  bottom: 8,
  right: 8,
  backgroundColor: '#fff',
  padding: '4px 8px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
});

const FavoriteIconWrapper = styled(Box)({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 2,
});

const ChefAvatar = styled(Avatar)({
  position: 'absolute',
  bottom: -20,
  left: 8,
  width: 40,
  height: 40,
  border: '2px solid #fff',
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

const Banner = styled(Box)({
  width: '100%',
  height: '300px',
  backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '2rem',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

  useEffect(() => {
    async function fetchChefs() {
      try {
        const response = await fetch('/api/chefs');
        if (!response.ok) {
          throw new Error('Failed to fetch chefs');
        }
        const data = await response.json();
        setChefs(data);
      } catch (err) {
        setError('Error fetching chefs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchChefs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Banner>
        <Typography variant="h2" color="white" fontWeight="bold" sx={{ position: 'relative', zIndex: 1 }}>
          Discover Amazing Chefs
        </Typography>
      </Banner>

      <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <CategoryTabs categories={categories} />

        {categories.map((category, index) => {
          const categoryChefs = mockChefs.filter(item => item.category === category);
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
      </Container>
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

const ChefRow: React.FC<{ category: string, chefs: MealItem[] }> = ({ category, chefs }) => {
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
        {chefs.map((item) => (
          <Grid item key={item.id}>
            <ChefCard item={item} isFavorite={false} onToggleFavorite={() => {}} />
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
