"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ShoppingCart, Search, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';
import { useDebounce } from 'use-debounce';

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

const Header: React.FC = () => {
  const { isSignedIn, isLoaded, user } = useUser();
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

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (navigator.geolocation) {
        void navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
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
    } else {
      setAddress('');
      setIsLocating(false);
    }
  }, [isSignedIn, isLoaded]);

  const handleLocationPermission = async (allow: boolean) => {
    if (allow) {
      setIsLocating(true);
      getCurrentPosition();
    } else {
      setAddress('Location not provided');
      setIsLocating(false);
    }
    setShowLocationPrompt(false);
  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLiveLocation({ lat: latitude, lon: longitude });
        fetchAddress(latitude, longitude).catch((error) => {
          console.error("Error fetching address:", error);
          setAddress('Address not found');
          setIsLocating(false);
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setAddress('Location not available');
        setIsLocating(false);
      }
    );
  };

  async function fetchAddress(latitude: number, longitude: number) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
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
  };

  const handleAddressClick = () => {
    setShowAddressModal(true);
  };

  async function handleCustomAddressSubmit() {
    if (customAddress.trim()) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(customAddress)}`);
        const data = await response.json() as GeocodingResult[];
        if (data.length > 0) {
          const { lat, lon } = data[0];
          if (liveLocation) {
            const distance = calculateDistance(liveLocation.lat, liveLocation.lon, parseFloat(lat), parseFloat(lon));
            if (distance > 50) { // 50 km threshold
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
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowMegaMenu(true);
  };

  const performSearch = useCallback(async (term: string) => {
    if (!term) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const results = await response.json() as SearchResult[];
      setSearchResults(results);
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults([]);
    }
  }, []);

  React.useEffect(() => {
    void performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, performSearch]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) {
      void router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowMegaMenu(false);
    }
  };

  const handleSearchResultClick = (result: SearchResult) => {
    if (result.type === 'chef') {
      void router.push(`/chef/${result.id}`);
    } else {
      void router.push(`/search?q=${encodeURIComponent(result.name)}`);
    }
    setShowMegaMenu(false);
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="https://di8mcd92ly4ww.cloudfront.net/GrubyLogo.png"
            alt="Gruby Logo"
            width={120}
            height={23}
            className="cursor-pointer"
          />
        </Link>
        <nav className="hidden md:flex items-center justify-center flex-grow space-x-4">
          <div className="relative">
            <Button
              onClick={handleAddressClick}
              variant="outline"
              className="pl-10 pr-10"
            >
              <MapPin className="mr-2" size={18} />
              {isLocating ? 'Locating...' : (address || 'Set location')}
            </Button>
          </div>
          <div className="relative w-2/3 max-w-3xl">
            <form onSubmit={handleSearchSubmit}>
              <Input
                type="text"
                placeholder="Search Gruby"
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchInput}
                onFocus={() => setShowMegaMenu(true)}
                onBlur={() => setTimeout(() => setShowMegaMenu(false), 200)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
            </form>
            {showMegaMenu && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-10">
                <div className="grid grid-cols-1 gap-2">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => handleSearchResultClick(result)}
                    >
                      <p className="font-semibold">{result.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{result.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="text-gray-700 hover:text-black transition-colors duration-300 relative">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="default">Sign Up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>

      {/* Address Modal */}
      <Dialog open={showAddressModal} onOpenChange={setShowAddressModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter delivery address</DialogTitle>
          </DialogHeader>
          <div className="relative mb-6">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="pl-10"
              placeholder="Enter street address or zip code"
            />
          </div>
          {showWarning && (
            <p className="text-red-500 mb-4 text-sm font-semibold">
              This address is far from your current location. Are you sure it&apos;s correct?
            </p>
          )}
          <DialogFooter>
            <Button onClick={handleCustomAddressSubmit}>Confirm Address</Button>
            <Button variant="outline" onClick={() => {
              getCurrentPosition();
              setShowAddressModal(false);
              setShowWarning(false);
            }}>
              Use current location
            </Button>
            <Button variant="outline" onClick={() => {
              setShowAddressModal(false);
              setShowWarning(false);
            }}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Location Permission Prompt */}
      <Dialog open={showLocationPrompt} onOpenChange={setShowLocationPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allow Location Access?</DialogTitle>
          </DialogHeader>
          <p className="mb-4">Gruby would like to access your location to show nearby chefs and meals.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleLocationPermission(false)}>
              Deny
            </Button>
            <Button onClick={() => handleLocationPermission(true)}>
              Allow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
