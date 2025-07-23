"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      price: product.price,
      quantity: 1,
      imageUrl: product.images[currentImageIndex] || product.images[0],
      homeCookId: product.homeCook && (product.homeCook as any).id ? (product.homeCook as any).id : '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const nextImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
          
          {/* Image Navigation */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </>
          )}
        </div>
        
        {/* Thumbnail Gallery */}
        {product.images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                  index === currentImageIndex ? 'border-[#FF4D00]' : 'border-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl font-semibold mb-4 text-[#FF4D00]">${product.price.toFixed(2)}</p>
        <p className="mb-6 text-gray-600">{product.description}</p>
        
        {product.homeCook && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Cooked by</p>
            <p className="font-semibold">{product.homeCook.name}</p>
          </div>
        )}
        
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-[#FF4D00] hover:bg-[#E64500] text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
