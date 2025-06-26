'use client'

import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/system';
import Link from 'next/link';
import type { HomeCook } from '@/types'; // Changed to type import

interface HomeCookCardProps {
  homeCook: HomeCook;
  isFavorite: boolean;
  onToggleFavorite: () => void;
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

const FavoriteIconWrapper = styled(Box)({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 2,
});

const HomeCookAvatar = styled(Avatar)({
  position: 'absolute',
  bottom: -20,
  left: 8,
  width: 40,
  height: 40,
  border: '2px solid #fff',
});

const HomeCookCard: React.FC<HomeCookCardProps> = ({ homeCook, isFavorite, onToggleFavorite }) => {
  return (
    <Link href={`/home-cook/${homeCook.id}`} passHref>
      <StyledCard>
        <Box sx={{ position: 'relative' }}>
          <StyledCardMedia
            image={homeCook.coverImage ?? '/default-home-cook-cover.jpg'}
            title={homeCook.name}
          />
          <FavoriteIconWrapper>
            <IconButton 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite();
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: '#FF4D00' }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: '#fff' }} />
              )}
            </IconButton>
          </FavoriteIconWrapper>
          <HomeCookAvatar src={homeCook.avatarUrl ?? '/default-avatar.jpg'} alt={homeCook.name} />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '24px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            {homeCook.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {homeCook.rating !== undefined ? homeCook.rating.toFixed(1) : 'Not rated yet'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cuisine: {homeCook.cuisine}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Experience: {homeCook.experience}
          </Typography>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default HomeCookCard;
