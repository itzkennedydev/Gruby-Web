import React from 'react';
import Image from 'next/image';
import { Product } from '~/types/product';

interface ProductDetailsProps {
  product: Product | undefined;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  if (!product) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="relative w-full h-96 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
      <p className="mb-4">{product.description}</p>
      <p className="text-sm text-gray-600">Chef: {product.chef}</p>
    </div>
  );
}
