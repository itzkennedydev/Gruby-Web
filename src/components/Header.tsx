'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ShoppingCart, Search, MapPin, ChevronDown, X, Utensils, ChefHat, Coffee, ScrollText } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

// Types and Interfaces
interface GeocodingResult {
  lat: string;
  lon: string;
}

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

// Custom styles
const styles = {
  headerShadow: 'shadow-[0_2px_4px_rgba(0,0,0,0.05)]',
  searchBarFocus: 'focus:ring-2 focus:ring-primary/20 focus:border-primary',
  buttonHover: 'hover:shadow-md transition-all duration-200',
  fadeAnimation: 'animate-[fadeIn_0.2s_ease-in-out]',
};

const Header: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { cartItems } = useCart();
  const [address, setAddress] = useState<string>('');
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [customAddress, setCustomAddress] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [liveLocation, setLiveLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  // Effect for geolocation on load
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      handleGeolocation();
    } else {
      setAddress('');
      setIsLocating(false);
    }
  }, [isSignedIn, isLoaded]);

  // Effect for search results
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchResults(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchResults = async (term: string) => {
    try {
      // Mock API call - replace with your actual API endpoint
      // This is just an example response
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

  const handleGeolocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
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
  }, []);

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

  const getCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLiveLocation({ lat: latitude, lon: longitude });
        fetchAddress(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setAddress('Location not available');
        setIsLocating(false);
      }
    );
  }, []);

  const fetchAddress = useCallback(async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json() as ReverseGeocodingResult;

      const street = data.address.road ?? data.address.street ?? '';
      const city = data.address.city ?? data.address.town ?? data.address.village ?? '';

      let formattedAddress = street;
      if (city) formattedAddress += formattedAddress ? `, ${city}` : city;

      setAddress(formattedAddress || 'Address not found');
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress('Address not found');
    } finally {
      setIsLocating(false);
    }
  }, []);

  const handleCustomAddressSubmit = useCallback(async () => {
    if (customAddress.trim()) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(customAddress)}`
        );
        const data = await response.json() as GeocodingResult[];
        if (data.length > 0) {
          const { lat, lon } = data[0];
          if (liveLocation) {
            const distance = calculateDistance(
              liveLocation.lat,
              liveLocation.lon,
              parseFloat(lat),
              parseFloat(lon)
            );
            if (distance > 50) {
              setShowWarning(true);
              return;
            }
          }
          setAddress(customAddress);
          setShowAddressModal(false);
          setShowWarning(false);
        } else {
          alert('Invalid address. Please try again.');
        }
      } catch (error) {
        console.error("Error geocoding address:", error);
        alert('Error processing address. Please try again.');
      }
    }
  }, [customAddress, liveLocation]);

  const calculateDistance = useMemo(() => (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowMegaMenu(false);
    }
  };

  const handleSearchResultClick = (result: SearchResult) => {
    const destination = result.type === 'chef' 
      ? `/chef/${result.id}` 
      : `/search?q=${encodeURIComponent(result.name)}`;
    router.push(destination);
    setShowMegaMenu(false);
  };

  if (!isLoaded) {
    return (
      <div className="h-16 bg-white shadow-sm flex items-center justify-center">
        <div className="animate-pulse w-full max-w-6xl mx-auto flex justify-between items-center px-6">
          <div className="h-8 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-96 bg-gray-200 rounded" />
          <div className="h-10 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <header className={`bg-white py-4 px-6 sticky top-0 z-50 ${styles.headerShadow}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
          <Image
            src="https://di8mcd92ly4ww.cloudfront.net/GrubyLogo.png"
            alt="Gruby Logo"
            width={120}
            height={23}
            className="cursor-pointer"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-grow space-x-6 px-6">
          {/* Location Button */}
          <div className="relative">
            <Button
              onClick={() => setShowAddressModal(true)}
              variant="ghost"
              className="pl-4 pr-4 h-11 hover:bg-gray-100 group relative"
            >
              <MapPin className="mr-2 text-primary group-hover:scale-110 transition-transform" size={18} />
              <span className="truncate max-w-[200px]">
                {isLocating ? 'Locating...' : (address || 'Set location')}
              </span>
              <ChevronDown className="ml-2 text-gray-400 group-hover:text-primary transition-colors" size={16} />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative w-2/3 max-w-3xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="text"
                placeholder="Search for dishes, cuisines, or chefs..."
                className={`pl-10 pr-4 h-11 w-full bg-gray-50 border-gray-200 hover:border-primary transition-colors ${styles.searchBarFocus}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowMegaMenu(true)}
                onBlur={() => setTimeout(() => setShowMegaMenu(false), 200)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Mega Menu */}
            {showMegaMenu && (
              <div className={`absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 p-6 z-50 ${styles.fadeAnimation}`}>
                <div className="grid grid-cols-3 gap-6">
                  {/* Popular Cuisines */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Utensils className="mr-2 text-primary" size={20} />
                      Popular Cuisines
                    </h3>
                    <ul className="space-y-2">
                      {['Italian', 'Japanese', 'Mexican', 'Indian', 'Thai'].map((cuisine) => (
                        <li key={cuisine}>
                          <Link href={`/search?q=${encodeURIComponent(cuisine)}`} className="text-gray-600 hover:text-primary">
                            {cuisine}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Chefs */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <ChefHat className="mr-2 text-primary" size={20} />
                      Featured Chefs
                    </h3>
                    <ul className="space-y-2">
                      {['Gordon Ramsay', 'Jamie Oliver', 'Nigella Lawson', 'Wolfgang Puck', 'Alain Ducasse'].map((chef) => (
                        <li key={chef}>
                          <Link href={`/chef/${encodeURIComponent(chef)}`} className="text-gray-600 hover:text-primary">
                            {chef}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trending Dishes */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Coffee className="mr-2 text-primary" size={20} />
                      Trending Dishes
                    </h3>
                    <ul className="space-y-2">
                      {['Sushi Platter', 'Margherita Pizza', 'Beef Tacos', 'Pad Thai', 'Butter Chicken'].map((dish) => (
                        <li key={dish}>
                          <Link href={`/search?q=${encodeURIComponent(dish)}`} className="text-gray-600 hover:text-primary">
                            {dish}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Search Results</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          className="p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors group"
                          onClick={() => handleSearchResultClick(result)}
                        >
                          <p className="font-semibold group-hover:text-primary transition-colors">{result.name}</p>
                          <p className="text-sm text-gray-500 capitalize group-hover:text-gray-700 transition-colors">{result.type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-6">
          {isSignedIn && (
            <Link 
              href="/orders" 
              className="text-gray-700 hover:text-primary transition-colors duration-300 relative p-2 rounded-full hover:bg-gray-100"
            >
              <ScrollText size={24} />
            </Link>
          )}
          <Link 
            href="/cart" 
            className="text-gray-700 hover:text-primary transition-colors duration-300 relative p-2 rounded-full hover:bg-gray-100"
          >
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className={`absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium ${styles.fadeAnimation}`}>
                {cartItems.length}
              </span>
            )}
          </Link>
          
          {isSignedIn ? (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 transition-transform hover:scale-105"
                }
              }}
            />
          ) : (
            <div className="flex items-center space-x-3">
              <SignInButton mode="modal">
                <Button variant="ghost" className="hover:bg-gray-100">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button 
                  variant="default" 
                  className={`shadow-sm ${styles.buttonHover}`}
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      <Dialog open={showAddressModal} onOpenChange={setShowAddressModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Enter delivery address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="pl-10 h-11"
                placeholder="Enter street address or zip code"
              />
            </div>
            {showWarning && (
              <div className="bg-red-50 border border-red-100 rounded-md p-3">
                <p className="text-red-600 text-sm font-medium">
                  This address is far from your current location. Are you sure it&apos;s correct?
                </p>
              </div>
            )}
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={handleCustomAddressSubmit}
                className={`w-full ${styles.buttonHover}`}
              >
                Confirm Address
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  getCurrentPosition();
                  setShowAddressModal(false);
                  setShowWarning(false);
                }}
                className="w-full hover:bg-gray-50"
              >
                Use current location
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Location Permission Prompt */}
      <Dialog open={showLocationPrompt} onOpenChange={setShowLocationPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Allow Location Access?</DialogTitle>
          </DialogHeader>
          <div className="mb-6">
            <p className="text-gray-600">
              Gruby would like to access your location to show nearby chefs and meals.
            </p>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => handleLocationPermission(false)}
              className="hover:bg-gray-50"
            >
              Not Now
            </Button>
            <Button 
              onClick={() => handleLocationPermission(true)}
              className={`shadow-sm ${styles.buttonHover}`}
            >
              Allow Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu - Only shown on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-primary">
            <Search size={24} />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <button
            onClick={() => setShowAddressModal(true)}
            className="flex flex-col items-center text-gray-600 hover:text-primary"
          >
            <MapPin size={24} />
            <span className="text-xs mt-1">Location</span>
          </button>
          {isSignedIn && (
            <Link 
              href="/orders" 
              className="flex flex-col items-center text-gray-600 hover:text-primary"
            >
              <ScrollText size={24} />
              <span className="text-xs mt-1">Orders</span>
            </Link>
          )}
          <Link 
            href="/cart" 
            className="flex flex-col items-center text-gray-600 hover:text-primary relative"
          >
            <ShoppingCart size={24} />
            <span className="text-xs mt-1">Cart</span>
            {cartItems.length > 0 && (
              <span className={`absolute -top-1 right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium ${styles.fadeAnimation}`}>
                {cartItems.length}
              </span>
            )}
          </Link>
          {isSignedIn ? (
            <div className="flex flex-col items-center">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-6 h-6"
                  }
                }}
              />
              <span className="text-xs mt-1">Profile</span>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="flex flex-col items-center text-gray-600 hover:text-primary">
                <div className="w-6 h-6 rounded-full bg-gray-200" />
                <span className="text-xs mt-1">Sign In</span>
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;