'use client'

import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/system';
import Link from 'next/link';

interface Chef {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  type: 'chef' | 'product';
  chefImage?: string;
}

interface ChefCardProps {
  item: Chef;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

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

const ChefCard: React.FC<ChefCardProps> = ({ item, isFavorite, onToggleFavorite }) => {
  return (
    <Link href={item.type === 'chef' ? `/chef/${item.id}` : `/product/${item.id}`} passHref>
      <StyledCard>
        <Box sx={{ position: 'relative' }}>
          <StyledCardMedia
            image={item.image}
            title={item.name}
          />
          <FavoriteIconWrapper>
            <IconButton 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(item.id);
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: '#FF4D00' }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: '#fff' }} />
              )}
            </IconButton>
          </FavoriteIconWrapper>
          <RatingBadge>{item.rating}</RatingBadge>
          {item.type === 'chef' && item.chefImage && (
            <ChefAvatar src={item.chefImage} alt="Chef" />
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '24px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.category}
          </Typography>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default ChefCard;
