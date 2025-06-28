'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import OrderList from '@/components/OrderList';
import { FavoritesList } from '@/components/FavoritesList';
import AddProductForm from '@/components/AddProductForm';
import ProductsList from '@/components/ProductsList';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import { Camera, MapPin, Star } from 'lucide-react';
import type { Product } from '@/types/Product';
import type { FavoriteItem } from '@/types/FavoriteItem';

type TabType = 'products' | 'orders' | 'favorites';

interface HomeCookProfile {
  id: string;
  name: string;
  bio: string;
  cuisine: string;
  experience: string;
  avatarUrl: string;
  coverImage: string;
  onboardingCompleted: string;
}

const Profile: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const [isHomeCook, setIsHomeCook] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [refreshProducts, setRefreshProducts] = useState<number>(0);
  const [profile, setProfile] = useState<HomeCookProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState<'banner' | 'avatar' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching profile for user:', user.id);
      const response = await fetch('/api/home-cooks/me');
      
      console.log('Profile response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Profile data:', data);
        setProfile(data);
      } else if (response.status === 404) {
        // User doesn't have a home cook profile yet
        setError('Home cook profile not found. Please complete your onboarding first.');
        setProfile(null);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to load profile' }));
        setError(errorData.error || 'Failed to load profile');
        setProfile(null);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await fetch('/api/favorites');
      const data = await response.json() as Product[];
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, []);

  useEffect(() => {
    if (user && isLoaded) {
      void fetchProfile();
      void fetchFavorites();
    }
  }, [user, isLoaded, fetchProfile, fetchFavorites]);

  const handleProductAdded = () => {
    setRefreshProducts(prev => prev + 1);
  };

  const handleImageUpload = async (type: 'banner' | 'avatar', file: File) => {
    if (!profile) return;
    
    setUploading(type);
    setError(null);
    
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        
        const response = await fetch('/api/home-cooks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profile.name,
            bio: profile.bio,
            cuisine: profile.cuisine,
            experience: profile.experience,
            avatarUrl: type === 'avatar' ? base64 : profile.avatarUrl,
            coverImageUrl: type === 'banner' ? base64 : profile.coverImage,
          }),
        });

        if (response.ok) {
          await fetchProfile();
        } else {
          setError('Failed to update image');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(null);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="space-y-8">
            {/* Subscription Banner */}
            <SubscriptionBanner />
            
            {/* Temporary Fix Button */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">⚠️ Temporary Fix</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    If you've paid for subscription but still see the upgrade banner, click the button to activate it manually.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/debug/subscription', { method: 'PUT' });
                      const data = await response.json();
                      if (data.success) {
                        alert('Subscription activated! Refreshing page...');
                        window.location.reload();
                      } else {
                        alert('Failed to activate subscription: ' + data.error);
                      }
                    } catch (error) {
                      alert('Error activating subscription: ' + error);
                    }
                  }}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                >
                  Activate Subscription
                </button>
              </div>
            </div>
            
            {/* Add Product Form */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h3>
              <AddProductForm onProductAdded={handleProductAdded} />
            </div>
            
            {/* Products List */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
              <ProductsList key={refreshProducts} onProductAdded={handleProductAdded} />
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Orders</h2>
            <OrderList />
          </div>
        );
      case 'favorites':
        return (
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Favorites</h2>
            <FavoritesList 
              favorites={favorites.map(({ id, ...rest }): FavoriteItem => ({ 
                ...rest, 
                id: typeof id === 'string' ? parseInt(id, 10) : id,
                homeCook: 'Home Cook'
              }))} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tab: TabType; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-3 rounded-lg transition-colors duration-300 font-medium ${
        activeTab === tab 
          ? 'bg-[#FF4D00] text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  if (!isLoaded) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4D00] mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading user...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-medium">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4D00] mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-medium">{error || 'Profile not found'}</p>
        </div>
        {error === 'Home cook profile not found. Please complete your onboarding first.' && (
          <div className="mt-4">
            <p className="text-gray-600 mb-4">You need to complete your home cook onboarding first.</p>
            <a
              href="/home-cook-onboarding"
              className="px-4 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#E64500] transition-colors"
            >
              Start Onboarding
            </a>
          </div>
        )}
        {error !== 'Home cook profile not found. Please complete your onboarding first.' && (
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#E64500] transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Top Level Banner */}
      <div className="relative h-80 md:h-96">
        {/* Banner Image */}
        <img
          src={profile.coverImage || 'https://images.pexels.com/photos/7601412/pexels-photo-7601412.jpeg'}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Edit Banner Button */}
        <div className="absolute top-6 right-6">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('banner', file);
              }}
              disabled={uploading === 'banner'}
            />
            <div className="bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-lg hover:bg-white/30 transition-colors shadow-lg">
              {uploading === 'banner' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </div>
          </label>
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={profile.avatarUrl || user?.imageUrl || '/default-avatar.jpg'}
                  alt={profile.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
                />
                
                {/* Edit Avatar Button */}
                <label className="absolute -bottom-1 -right-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload('avatar', file);
                    }}
                    disabled={uploading === 'avatar'}
                  />
                  <div className="bg-[#FF4D00] text-white p-1.5 rounded-full hover:bg-[#E64500] transition-colors shadow-lg">
                    {uploading === 'avatar' ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                </label>
              </div>

              {/* Profile Details */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.name}</h1>
                <div className="flex items-center gap-6 text-base md:text-lg mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>Location not specified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-yellow-400" />
                    <span>New Cook</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                    {profile.cuisine}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                    {profile.experience}
                  </span>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => setEditing(!editing)}
                className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bio Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          {editing ? (
            <div className="space-y-4">
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:border-transparent resize-none"
                rows={4}
                placeholder="Tell your customers about yourself, your cooking style, and what makes your food special..."
              />
              <div className="flex justify-end">
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/home-cooks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: profile.name,
                          bio: profile.bio,
                          cuisine: profile.cuisine,
                          experience: profile.experience,
                          avatarUrl: profile.avatarUrl,
                          coverImageUrl: profile.coverImage,
                        }),
                      });

                      if (response.ok) {
                        setEditing(false);
                        await fetchProfile();
                      } else {
                        setError('Failed to save changes');
                      }
                    } catch (err) {
                      setError('Failed to save changes');
                    }
                  }}
                  className="px-6 py-3 bg-[#FF4D00] text-white rounded-lg hover:bg-[#E64500] transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {profile.bio || "No bio added yet. Click 'Edit Profile' to add your story."}
            </p>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-white rounded-2xl border-2 border-gray-100">
            <div className="text-3xl font-bold text-[#FF4D00]">0</div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border-2 border-gray-100">
            <div className="text-3xl font-bold text-[#FF4D00]">0</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border-2 border-gray-100">
            <div className="text-3xl font-bold text-[#FF4D00]">New</div>
            <div className="text-sm text-gray-600">Status</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <TabButton tab="products" label="Products" />
          <TabButton tab="orders" label="Orders" />
          <TabButton tab="favorites" label="Favorites" />
        </div>

        {/* Tab Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile; 