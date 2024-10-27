import React, { useState } from 'react';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import { MapPin, Heart, Clock, Award, ChefHat, Users, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { db } from '@/server/db';
import { chefs, type Chef, type Product } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

interface SerializedProduct extends Omit<Product, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

interface ChefWithProducts extends Omit<Chef, 'createdAt' | 'updatedAt'> {
  products: SerializedProduct[];
  createdAt: string;
  updatedAt: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  
  // Validate that id is a valid UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return { notFound: true };
  }

  const chef = await db.query.chefs.findFirst({
    where: eq(chefs.id, id),
    with: { products: true },
  });

  if (!chef) {
    return { notFound: true };
  }

  const serializedChef: ChefWithProducts = {
    ...chef,
    createdAt: chef.createdAt.toISOString(),
    updatedAt: chef.updatedAt.toISOString(),
    products: chef.products.map(product => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    })),
  };

  return {
    props: { chef: serializedChef },
  };
};

const DetailPage: React.FC<{ chef: ChefWithProducts }> = ({ chef }) => {
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
        id: product.id.toString(), // Convert id to string
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
        quantity: 1,
        price: Number(product.price),
        imageUrl: product.imageUrl ?? '/default-product.jpg',
      };
      addToCart(productToAdd);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    } finally {
      setIsAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  if (!chef) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Chef not found</p>
      </div>
    );
  }

  const stats = [
    { icon: Users, label: 'Customers Served', value: '500+' },
    { icon: Award, label: 'Years Experience', value: '12+' },
    { icon: ChefHat, label: 'Signature Dishes', value: chef.products?.length.toString() || '0' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
        <Image
          src={chef.coverImageUrl ?? '/default-cover.jpg'}
          alt={chef.name}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
          <div className="container mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
              <Image
                src={chef.avatarUrl ?? '/default-avatar.jpg'}
                alt={chef.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{chef.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base text-gray-200">Location not specified</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                {chef.specialty}
              </span>
            </div>
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors mb-4">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Booking Section for Mobile */}
          <div className="lg:hidden mb-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Book {chef.name}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Response time: within 24 hours</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ChefHat className="w-5 h-5" />
                  <span>Specializes in {chef.specialty}</span>
                </div>
                <button className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors">
                  Check Availability
                </button>
                <button className="w-full py-3 px-4 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Message Chef
                </button>
              </div>
            </div>
          </div>

          {/* Left Column */}
          <div className="lg:col-span-2">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {chef.products && chef.products.length > 0 ? (
                  chef.products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="relative h-40 sm:h-48">
                        <Image
                          src={product.imageUrl ?? '/default-product.jpg'}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                        />
                        <button
                          onClick={() => toggleLike(product.id.toString())}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              likedProducts.has(product.id.toString())
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>
                          <span className="text-base sm:text-lg font-semibold">
                            ${Number(product.price).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isAddingToCart[product.id]}
                          className="w-full py-2 px-4 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          {isAddingToCart[product.id] ? 'Adding...' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 col-span-2 text-center py-8">
                    No products available yet.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">About {chef.name}</h2>
                <p className="text-gray-700 mb-6 sm:mb-8">{chef.bio ?? 'No bio available'}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {stats.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="text-center p-4 rounded-lg bg-gray-50">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-600" />
                      <div className="font-semibold text-lg sm:text-xl">{value}</div>
                      <div className="text-sm text-gray-600">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <p className="text-center text-gray-600 py-6 sm:py-8">
                  No reviews available yet.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Book {chef.name}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Response time: within 24 hours</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ChefHat className="w-5 h-5" />
                  <span>Specializes in {chef.specialty}</span>
                </div>
                <button className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors">
                  Check Availability
                </button>
                <button className="w-full py-3 px-4 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Message Chef
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;