import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0],
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
        <p className="mb-6">{product.description}</p>
        <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
}
