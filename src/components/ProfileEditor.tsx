'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { Camera, MapPin, Star } from 'lucide-react';

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

const ProfileEditor: React.FC = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState<HomeCookProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState<'banner' | 'avatar' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/home-cooks/me');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setError('Failed to load profile');
      }
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = useCallback(async (type: 'banner' | 'avatar', file: File) => {
    if (!profile) return;
    
    setUploading(type);
    setError(null);
    
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        
        // Update the profile with new image
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
          // Refresh profile data
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
  }, [profile]);

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
        <button
          onClick={fetchProfile}
          className="px-4 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#E64500] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section - Similar to customer view */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
        {/* Banner Image */}
        <img
          src={profile.coverImage || 'https://images.pexels.com/photos/7601412/pexels-photo-7601412.jpeg'}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Edit Banner Button */}
        <div className="absolute top-4 right-4">
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
            <div className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
              {uploading === 'banner' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Camera size={20} />
              )}
            </div>
          </label>
        </div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-4">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={profile.avatarUrl || user?.imageUrl || '/default-avatar.jpg'}
                alt={profile.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white object-cover"
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
                <div className="bg-[#FF4D00] text-white p-1.5 rounded-full hover:bg-[#E64500] transition-colors">
                  {uploading === 'avatar' ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  ) : (
                    <Camera size={12} />
                  )}
                </div>
              </label>
            </div>

            {/* Profile Details */}
            <div className="flex-1 text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{profile.name}</h1>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>Location not specified</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" />
                  <span>New Cook</span>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  {profile.cuisine}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  {profile.experience}
                </span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
        {/* Bio Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          {editing ? (
            <textarea
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:border-transparent resize-none"
              rows={4}
              placeholder="Tell your customers about yourself, your cooking style, and what makes your food special..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {profile.bio || "No bio added yet. Click 'Edit Profile' to add your story."}
            </p>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-[#FF4D00]">0</div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-[#FF4D00]">0</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-[#FF4D00]">New</div>
            <div className="text-sm text-gray-600">Status</div>
          </div>
        </div>

        {/* Save Button (when editing) */}
        {editing && (
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
        )}
      </div>
    </div>
  );
};

export default ProfileEditor; 