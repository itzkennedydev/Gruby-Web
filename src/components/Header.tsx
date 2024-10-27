'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { 
  ShoppingCart, 
  Search, 
  MapPin, 
  ChevronDown, 
  X, 
  Menu,
  Utensils, 
  ChefHat, 
  Coffee, 
  ScrollText,
  Navigation 
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import type { GeocodingResult } from '@/types';
import type { NextRouter } from 'next/router';

// Types and Interfaces
interface ReverseGeocodingResult {
  address: {
    road?: string;
    street?: string;
    city?: string;
    town?: string;
    village?: string;
  };
}

interface SearchResult {
  id: string;
  name: string;
  type: 'cuisine' | 'chef' | 'dish';
}

interface NavLinkProps {
  href: string;
  icon: React.ComponentType<{ size?: number | string }>;
  children: React.ReactNode;
  onClick?: () => void;
}

interface RecentAddress {
  address: string;
  type: 'Home' | 'Work' | 'Other';
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, children, onClick }) => (
  <Link 
    href={href}
    className="flex items-center gap-2.5 text-gray-700 hover:text-gray-900"
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{children}</span>
  </Link>
);

const Header = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { cartItems } = useCart();
  const router = useRouter() as unknown as NextRouter;

  // State management
  const [address, setAddress] = useState<string>('');
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState<boolean>(false);
  const [customAddress, setCustomAddress] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [liveLocation, setLiveLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [recentAddresses] = useState<RecentAddress[]>([
    { address: "123 Home Street, Apartment 4B", type: "Home" },
    { address: "456 Work Avenue, Floor 2", type: "Work" }
  ]);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const cartItemCount = useMemo(() => cartItems?.length ?? 0, [cartItems]);

  // Calculate distance between two points
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Location handling functions
  const fetchAddress = useCallback(async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json() as ReverseGeocodingResult;
      
      const street = data.address.road ?? data.address.street ?? '';
      
      setAddress(street || 'Address not found');
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress('Address not found');
    } finally {
      setIsLocating(false);
    }
  }, []);

  const getCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLiveLocation({ lat: latitude, lon: longitude });
        void fetchAddress(latitude, longitude);
      },
      () => {
        setAddress('Location not available');
        setIsLocating(false);
      }
    );
  }, [fetchAddress]);

  const handleGeolocation = useCallback(() => {
    if (navigator.geolocation) {
      void navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          getCurrentPosition();
        } else if (result.state === 'prompt') {
          setShowLocationPrompt(true);
          setIsLocating(false);
        } else {
          setAddress('Location not provided');
          setIsLocating(false);
        }
      });
    } else {
      setAddress('Geolocation not supported');
      setIsLocating(false);
    }
  }, [getCurrentPosition]);

  const handleLocationPermission = async (allow: boolean) => {
    setShowLocationPrompt(false);
    if (allow) {
      setIsLocating(true);
      getCurrentPosition();
    } else {
      setAddress('Location not provided');
      setIsLocating(false);
    }
  };

  const handleCustomAddressSubmit = useCallback(async () => {
    if (customAddress.trim()) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(customAddress)}`
        );
        const data = await response.json() as GeocodingResult[];
        
        if (data.length > 0) {
          const result = data[0];
          if (result && typeof result.lat === 'string' && typeof result.lon === 'string') {
            const lat = parseFloat(result.lat);
            const lon = parseFloat(result.lon);
            
            if (liveLocation) {
              const distance = calculateDistance(
                liveLocation.lat,
                liveLocation.lon,
                lat,
                lon
              );
              if (distance > 50) {
                setShowWarning(true);
                return;
              }
            }
            
            setAddress(customAddress);
            setShowAddressModal(false);
            setShowWarning(false);
          }
        } else {
          alert('Invalid address. Please try again.');
        }
      } catch (error) {
        console.error("Error geocoding address:", error);
        alert('Error processing address. Please try again.');
      }
    }
  }, [customAddress, liveLocation, calculateDistance]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowMegaMenu(false);
      setIsMenuOpen(false);
    }
  };

  const fetchSearchResults = async (term: string) => {
    try {
      // Mock API call - replace with actual API endpoint
      const mockResults: SearchResult[] = [
        { id: '1', name: term + ' Cuisine', type: 'cuisine' },
        { id: '2', name: 'Chef ' + term, type: 'chef' },
        { id: '3', name: term + ' Dish', type: 'dish' },
      ];
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      handleGeolocation();
    } else {
      setAddress('');
      setIsLocating(false);
    }
  }, [isSignedIn, isLoaded, handleGeolocation]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      void fetchSearchResults(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  const renderLocationModal = () => {
    if (!showAddressModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 md:pt-20">
        <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
            <button 
              onClick={() => setShowAddressModal(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Search Section */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomAddress(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black text-gray-900 placeholder:text-gray-400"
                  placeholder="Search for area, street name..."
                />
              </div>

              {/* Warning Message */}
              {showWarning && (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-amber-700 text-sm flex items-start">
                    <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-amber-500" />
                    This address seems to be outside our delivery range. Please verify the location or try a different address.
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    getCurrentPosition();
                    setShowAddressModal(false);
                    setShowWarning(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-medium transition-colors"
                >
                  <Navigation className="h-5 w-5" />
                  Use current location
                </button>
              </div>
            </div>

            {/* Recent Addresses Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">RECENT ADDRESSES</h3>
              <div className="space-y-2">
                {recentAddresses.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCustomAddress(item.address);
                      void handleCustomAddressSubmit();
                    }}
                    className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                  >
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-700 font-medium">{item.address}</p>
                      <p className="text-sm text-gray-500">{item.type}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <button 
              onClick={() => void handleCustomAddressSubmit()}
              className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-colors"
            >
              Confirm Address
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isLoaded) {
    return (
      <div className="h-16 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="h-8 w-24 bg-[#f5f5f5] rounded animate-pulse" />
          <div className="h-10 w-96 bg-[#f5f5f5] rounded animate-pulse" />
          <div className="h-10 w-32 bg-[#f5f5f5] rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 md:py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 -ml-2 text-gray-700 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="https://di8mcd92ly4ww.cloudfront.net/GrubyLogo.png"
              alt="Gruby Logo"
              width={120}
              height={23}
              className="w-auto h-6 md:h-8"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 gap-6">
            {/* Location Button */}
            <button
              onClick={() => setShowAddressModal(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg hover:bg-[#f5f5f5] text-gray-700"
            >
              <MapPin className="text-gray-700" size={18} />
              <span className="truncate max-w-[200px]">
                {isLocating ? 'Locating...' : (address || 'Set location')}
              </span>
              <ChevronDown className="text-gray-400 ml-1" size={16} />
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for dishes, cuisines, or chefs..."
                className="w-full px-12 py-2.5 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowMegaMenu(true)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}

              {/* Mega Menu */}
              {showMegaMenu && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-lg shadow-lg border border-gray-100">
                  <div className="p-8 grid grid-cols-3 gap-8">
                    {/* Popular Cuisines */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
                        <Utensils className="mr-3 text-gray-700" size={20} />
                        Popular Cuisines
                      </h3>
                      <div className="space-y-3">
                        {['Italian', 'Japanese', 'Mexican', 'Indian', 'Thai'].map((cuisine) => (
                          <Link
                            key={cuisine}
                            href={`/search?q=${encodeURIComponent(cuisine)}`}
                            className="block text-gray-700 hover:text-gray-900"
                            onClick={() => setShowMegaMenu(false)}
                          >
                            {cuisine}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Popular Chefs */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
                        <ChefHat className="mr-3 text-gray-700" size={20} />
                        Popular Chefs
                      </h3>
                      <div className="space-y-3">
                        {['Gordon Ramsay', 'Jamie Oliver', 'Wolfgang Puck'].map((chef) => (
                          <Link
                            key={chef}
                            href={`/chef/${encodeURIComponent(chef)}`}
                            className="block text-gray-700 hover:text-gray-900"
                            onClick={() => setShowMegaMenu(false)}
                          >
                            {chef}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Trending */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
                        <Coffee className="mr-3 text-gray-700" size={20} />
                        Trending
                      </h3>
                      <div className="space-y-3">
                        {['New Arrivals', 'Best Rated', 'Most Popular'].map((item) => (
                          <Link
                            key={item}
                            href={`/trending/${encodeURIComponent(item)}`}
                            className="block text-gray-700 hover:text-gray-900"
                            onClick={() => setShowMegaMenu(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {isSignedIn && (
              <Link 
                href="/orders" 
                className="hidden md:flex items-center text-gray-700 hover:text-gray-900"
              >
                <ScrollText size={24} />
              </Link>
            )}
            
            <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-6 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search dishes, cuisines, or chefs..."
              className="w-full px-10 py-2 bg-[#f5f5f5] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400/20 focus:border-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl transform transition-transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-700">Menu</h2>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-6">
            <button
              onClick={() => {
                setShowAddressModal(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 w-full"
            >
              <MapPin size={20} className="text-gray-700" />
              <span className="truncate">
                {isLocating ? 'Locating...' : (address || 'Set location')}
              </span>
            </button>

            <nav className="space-y-4 border-t border-gray-200 pt-4">
              <NavLink 
                href="/browse" 
                icon={Utensils}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Cuisines
              </NavLink>
              <NavLink 
                href="/chefs" 
                icon={ChefHat}
                onClick={() => setIsMenuOpen(false)}
              >
                Find Chefs
              </NavLink>
              {isSignedIn && (
                <NavLink 
                  href="/orders" 
                  icon={ScrollText}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </NavLink>
              )}
            </nav>

            {!isSignedIn && (
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <SignInButton mode="modal">
                  <button 
                    className="w-full py-2.5 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button 
                    className="w-full py-2.5 px-4 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {renderLocationModal()}

      {/* Location Permission Modal */}
      {showLocationPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="fixed inset-x-0 bottom-0 md:relative md:inset-auto md:max-w-md md:mx-auto md:mt-20 bg-white rounded-t-2xl md:rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Allow Location Access?</h2>
              <p className="text-gray-600 mb-6">
                Gruby would like to access your location to show nearby chefs and meals.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => void handleLocationPermission(false)}
                  className="flex-1 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Not Now
                </button>
                <button 
                  onClick={() => void handleLocationPermission(true)}
                  className="flex-1 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Allow Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;