'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string | null;
    price: string;
    images: string[];
    homeCookName?: string;
    homeCookCuisine?: string;
    subscriptionStatus?: string;
  };
  onAddToCart?: (product: any) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isFavorite = false, 
  onToggleFavorite 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      setIsAddingToCart(true);
      try {
        await onAddToCart({
          id: String(product.id),
          name: product.name,
          price: Number(product.price),
          quantity: 1,
          imageUrl: product.images[0] || '/placeholder-image.jpg',
        });
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <Link href={`/product/${product.id}`} className="block" style={{ containerType: 'inline-size' }}>
      <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 group">
        {/* Product Image - Reduced height */}
        <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
          {product.images.length > 0 ? (
            <>
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                    disabled={isAddingToCart}
                    style={{ pointerEvents: 'auto' }}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    onTouchStart={(e) => e.preventDefault()}
                    onTouchEnd={(e) => e.preventDefault()}
                    onTouchMove={(e) => e.preventDefault()}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                    disabled={isAddingToCart}
                    style={{ pointerEvents: 'auto' }}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    onTouchStart={(e) => e.preventDefault()}
                    onTouchEnd={(e) => e.preventDefault()}
                    onTouchMove={(e) => e.preventDefault()}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                    {product.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Favorite Button */}
          {onToggleFavorite && (
            <button
              onClick={handleToggleFavorite}
              className="absolute top-2 right-2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                className={`w-4 h-4 ${isFavorite ? 'fill-[#FF4D00] text-[#FF4D00]' : 'text-gray-600'}`} 
              />
            </button>
          )}
        </div>
        
        {/* Product Info - Reduced padding and spacing */}
        <div style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
          {/* Subscription Notice - More compact */}
          {product.subscriptionStatus && product.subscriptionStatus !== 'active' && (
            <div className="mb-2 bg-yellow-50 border border-yellow-200 rounded-md" style={{ 
              padding: 'clamp(0.375rem, 0.75vw, 0.5rem)',
              marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)'
            }}>
              <p className="text-yellow-800" style={{ fontSize: 'clamp(0.75rem, 0.875vw + 0.25rem, 0.75rem)' }}>
                ⚠️ Subscription needed
              </p>
            </div>
          )}
          
          {/* Product name and cook info in one line */}
          <div className="mb-1">
            <h3 className="font-semibold line-clamp-1" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1rem)' }}>{product.name}</h3>
            {product.homeCookName && (
              <p className="text-gray-600" style={{ fontSize: 'clamp(0.75rem, 0.875vw + 0.25rem, 0.75rem)' }}>by {product.homeCookName}</p>
            )}
          </div>
          
          {/* Cuisine type */}
          {product.homeCookCuisine && (
            <p className="text-gray-500 mb-1" style={{ fontSize: 'clamp(0.75rem, 0.875vw + 0.25rem, 0.75rem)' }}>{product.homeCookCuisine}</p>
          )}
          
          {/* Description - Reduced to single line */}
          <p className="text-gray-600 mb-2 line-clamp-1" style={{ fontSize: 'clamp(0.75rem, 0.875vw + 0.25rem, 0.75rem)' }}>
            {product.description || 'No description available'}
          </p>
          
          {/* Price and Add to Cart - More compact */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#FF4D00]" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1rem)' }}>
              ${Number(product.price).toFixed(2)}
            </span>
            
            {onAddToCart && (
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex items-center gap-1 bg-[#FF4D00] text-white rounded-md hover:bg-[#E64500] transition-colors disabled:opacity-50"
                style={{
                  paddingLeft: 'clamp(0.5rem, 1vw, 0.75rem)',
                  paddingRight: 'clamp(0.5rem, 1vw, 0.75rem)',
                  paddingTop: 'clamp(0.375rem, 0.75vw, 0.5rem)',
                  paddingBottom: 'clamp(0.375rem, 0.75vw, 0.5rem)',
                  fontSize: 'clamp(0.75rem, 0.875vw + 0.25rem, 0.75rem)'
                }}
              >
                <ShoppingBag className="w-3 h-3" />
                {isAddingToCart ? 'Adding...' : 'Add'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 