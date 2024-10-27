'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Box, Typography } from '@mui/material';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Map from '../components/Map';
import type { FavoritesList } from '../components/FavoritesList';
import type { Product } from '@/types/Product'; 

const mockProduct: Product = {
  id: '1',
  name: 'Deluxe Sushi Platter',
  description: 'A mouthwatering assortment of fresh sushi, including nigiri, maki, and sashimi. Perfect for sushi lovers and special occasions.',
  price: 49.99,
  images: [
    'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  ],
  location: {
    address: '123 Sushi St, San Francisco, CA 94105',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  chef: {
    id: 'chef1',
    name: 'Chef Hiroshi Tanaka',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
  },
  otherMeals: [
    {
      id: 'meal2',
      name: 'Ramen Bowl',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      price: 14.99,
      rating: 4.5,
    },
    {
      id: 'meal3',
      name: 'Tempura Set',
      image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      price: 18.99,
      rating: 4.2,
    },
    {
      id: 'meal4',
      name: 'Bento Box',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      price: 22.99,
      rating: 4.7,
    },
  ],
};

const ProductDetailPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: '250px', sm: '400px', md: '500px' },
            borderRadius: '20px',
            marginBottom: '2rem',
            overflow: 'hidden',
          }}
        >
          <Image
            src={mockProduct.images[0]}
            alt={mockProduct.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </Box>

        <Box sx={{ borderRadius: '20px', marginBottom: '2rem', padding: '2rem', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {mockProduct.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {mockProduct.description}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold">
            ${mockProduct.price.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ borderRadius: '20px', marginBottom: '2rem' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Location
          </Typography>
          <Map coordinates={mockProduct.location.coordinates} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
