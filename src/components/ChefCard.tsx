'use client'

import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/system';
import Link from 'next/link';
import { Chef } from '@/server/db/schema';

interface ChefCardProps {
  chef: Chef;
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

const ChefCard: React.FC<ChefCardProps> = ({ chef, isFavorite, onToggleFavorite }) => {
  return (
    <Link href={`/chef/${chef.id}`} passHref>
      <StyledCard>
        <Box sx={{ position: 'relative' }}>
          <StyledCardMedia
            image={chef.coverImageUrl ?? '/default-chef-cover.jpg'}
            title={chef.name}
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
          <ChefAvatar src={chef.avatarUrl ?? '/default-avatar.jpg'} alt={chef.name} />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '24px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            {chef.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {chef.rating !== undefined ? chef.rating.toFixed(1) : 'Not rated yet'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Specialty: {chef.specialty}
          </Typography>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default ChefCard;
