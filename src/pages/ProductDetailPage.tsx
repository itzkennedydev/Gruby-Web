'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container, Box, Typography } from '@mui/material';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import Map from '@/components/Map';
import type { Product } from '@/types/Product';

interface ProductDetailPageProps {
  product?: Product;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const pathname = usePathname();
  // We'll keep productId for potential future use, but mark it as unused for now
  const _productId = pathname?.split('/').pop() ?? '';

  if (!product) {
    return (
      <>
        <Header />
        <Container className="my-8">
          <Typography variant="h4">Product not found</Typography>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="my-8">
        <Box className="relative h-64 sm:h-96 md:h-[500px] rounded-lg mb-8 overflow-hidden">
          <Image
            src={product.images[0] || '/placeholder-image.jpg'}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </Box>

        <Box className="rounded-lg mb-8 p-8 bg-gray-100">
          <Typography variant="h4" className="font-bold mb-4">
            {product.name}
          </Typography>
          <Typography variant="body1" className="mb-4">
            {product.description}
          </Typography>
          <Typography variant="h5" className="text-primary font-bold">
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        <Box className="rounded-lg mb-8">
          <Typography variant="h5" component="h2" className="mb-4">
            Location
          </Typography>
          <Map lat={product.location.coordinates.lat} lng={product.location.coordinates.lng} />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
