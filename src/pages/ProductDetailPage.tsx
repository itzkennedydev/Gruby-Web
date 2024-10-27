'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Box, Typography } from '@mui/material';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Map from '../components/Map';

// Define the Product type inline (we'll move this to a separate file later)
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  chef: {
    id: string;
    name: string;
    avatar: string;
  };
  otherMeals: {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
  }[];
}

interface ProductDetailPageProps {
  product?: Product;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const params = useParams();
  const productId = params?.id as string;

  if (!product) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <Typography variant="h4">Product not found</Typography>
        </Container>
        <Footer />
      </>
    );
  }

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
            src={typeof product.images?.[0] === 'string' ? product.images[0] : '/placeholder-image.jpg'}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>

        <Box sx={{ borderRadius: '20px', marginBottom: '2rem', padding: '2rem', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold">
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ borderRadius: '20px', marginBottom: '2rem' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Location
          </Typography>
          <Map lat={product.location.coordinates.lat} lng={product.location.coordinates.lng} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
