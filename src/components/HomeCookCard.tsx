'use client'

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface HomeCook {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  coverImage: string | null;
  cuisine: string;
  experience: string;
  averageRating: number;
  totalReviews: number;
  subscriptionStatus?: string;
  city?: string;
  state?: string;
  productCount?: number;
  // Optionally, you could add images: string[];
}

interface HomeCookCardProps {
  homeCook: HomeCook;
  className?: string;
}

const HomeCookCard: React.FC<HomeCookCardProps> = ({ homeCook, className = '' }) => {
  // For demo, stub distance and time
  const distance = '7.7 mi';
  const time = '37 min';
  const promo = '$0 delivery fee, first order';

  // For carousel, just one image for now
  const images = [homeCook.coverImage || '/default-cover.jpg'];
  const currentImageIndex = 0;

  return (
    <Link href={`/home-cook/${homeCook.id}`} className={`block ${className}`}>
      {/* Card: only the image is inside the rounded container */}
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-100">
        <div className="relative w-full aspect-[21/9] bg-gray-100">
          <img
            src={images[currentImageIndex]}
            alt={homeCook.name}
            className="w-full h-full object-cover"
          />
          {/* Carousel dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Text below the card, no background */}
      <div className="mt-2 px-1" style={{ containerType: 'inline-size' }}>
        <div className="font-bold mb-1 text-gray-900 line-clamp-1" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1rem)' }}>{homeCook.name}</div>
        <div className="flex items-center gap-1 mb-1" style={{ fontSize: 'clamp(0.75rem, 0.875vw + 0.25rem, 0.75rem)' }}>
          <span className="font-bold text-yellow-600 flex items-center">
            {homeCook.averageRating?.toFixed(1)}
            <Star className="w-4 h-4 ml-0.5 fill-yellow-500 text-yellow-500" />
          </span>
          <span className="text-gray-500">({homeCook.totalReviews > 0 ? `${homeCook.totalReviews}+` : 'New'})</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-gray-500">{distance}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-gray-500">{time}</span>
        </div>
      </div>
    </Link>
  );
};

export default HomeCookCard;
