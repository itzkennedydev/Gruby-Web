import React, { useMemo } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductDetailsProps {
  product: Product | undefined;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  const formattedPrice = useMemo(() => formatPrice(product.price), [product.price]);
  const productName = product.name ?? 'Unknown Product';
  const productImageAlt = product.name ?? 'Product image';
  const productDescription = product.description ?? 'No description available';
  const productChef = product.chef ?? 'Unknown Chef';

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{productName}</h1>
      <div className="relative w-full h-96 mb-4">
        {product.image ? (
          <Image
            src={product.image}
            alt={productImageAlt}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <p className="text-xl font-semibold mb-2">${formattedPrice}</p>
      <p className="mb-4">{productDescription}</p>
      <p className="text-sm text-gray-600">Chef: {productChef}</p>
    </div>
  );
}

// Helper function to format price safely
const formatPrice = (price: number | null | undefined): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0.00';
  }
  return price.toFixed(2);
};

// Component for image placeholder
const ImagePlaceholder = () => (
  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
    <p className="text-gray-500">No image available</p>
  </div>
);
