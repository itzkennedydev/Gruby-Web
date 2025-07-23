'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Heart, Award, ChefHat, Users, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import type { HomeCook, Product } from '@/server/db/schema';

interface SerializedProduct extends Omit<Product, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  images: string[];
}

interface HomeCookWithProducts extends Omit<HomeCook, 'createdAt' | 'updatedAt'> {
  products: SerializedProduct[];
  createdAt: string;
  updatedAt: string;
}

interface HomeCookDetailClientProps {
  homeCook: HomeCookWithProducts;
}

export default function HomeCookDetailClient({ homeCook }: HomeCookDetailClientProps) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('products');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [isAddingToCart, setIsAddingToCart] = useState<Record<string, boolean>>({});

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleAddToCart = async (product: SerializedProduct) => {
    try {
      setIsAddingToCart(prev => ({ ...prev, [product.id]: true }));
      // Convert createdAt and updatedAt back to Date
      const productToAdd = {
        ...product,
        id: product.id.toString(),
        name: product.name,
        description: product.description ?? '',
        price: Number(product.price),
        quantity: 1,
        imageUrl: product.images && product.images.length > 0 ? product.images[0] : '/default-product.jpg',
        homeCookId: homeCook.id,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
      };
      addToCart(productToAdd);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    } finally {
      setIsAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  if (!homeCook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Home cook not found</p>
      </div>
    );
  }

  const stats = [
    { icon: Users, label: 'Customers Served', value: '500+' },
    { icon: Award, label: 'Years Experience', value: '12+' },
    { icon: ChefHat, label: 'Signature Dishes', value: homeCook.products?.length.toString() || '0' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Fixed height to match profile page */}
      <div className="relative h-80 md:h-96 w-full">
        <Image
          src={homeCook.coverImage ?? '/default-cover.jpg'}
          alt={homeCook.name}
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
          <div className="container mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
              <Image
                src={homeCook.avatarUrl ?? '/default-avatar.jpg'}
                alt={homeCook.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{homeCook.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base text-gray-200">Location not specified</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {homeCook.cuisine}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {homeCook.experience}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
              <div className="flex space-x-8 min-w-max">
                {['products', 'about', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base ${
                      activeTab === tab
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-black'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'products' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {homeCook.products && homeCook.products.length > 0 ? (
                  homeCook.products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={product.images && product.images.length > 0 ? product.images[0] : '/default-product.jpg'}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        <button
                          onClick={() => toggleLike(product.id.toString())}
                          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              likedProducts.has(product.id.toString())
                                ? 'text-red-500 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description || 'No description available'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">${Number(product.price).toFixed(2)}</span>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={isAddingToCart[product.id]}
                            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            {isAddingToCart[product.id] ? 'Adding...' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No products available yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">About {homeCook.name}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {homeCook.bio || 'No bio available for this home cook.'}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#FF4D00]" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <p className="text-gray-500">Reviews feature coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 