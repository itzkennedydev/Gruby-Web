'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMobileMenuOpen } from '@/store/slices/uiSlice';
import { setEmail, setSubmitting, setSubmitted, setError } from '@/store/slices/betaSlice';
import { Button } from '@/components/ui/button';

const Header = () => {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const { email, isSubmitting, isSubmitted } = useAppSelector((state) => state.beta);
  const [localEmail, setLocalEmail] = useState('');

  const handleBetaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localEmail.trim()) return;

    dispatch(setSubmitting(true));
    dispatch(setError(null));

    try {
      // Simulate API call - replace with actual beta signup endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      dispatch(setEmail(localEmail));
      dispatch(setSubmitted(true));
      setLocalEmail('');
      
      // Reset submitted state after 3 seconds
      setTimeout(() => {
        dispatch(setSubmitted(false));
      }, 3000);
    } catch (err) {
      dispatch(setError('Something went wrong. Please try again.'));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(setMobileMenuOpen(true))}
            className="md:hidden -ml-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/GrubyLogo.svg"
              alt="Gruby Logo"
              width={120}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#features" 
              className="text-gray-700 hover:text-[#FF1E00] transition-colors font-medium"
            >
              Features
                          </Link>
                          <Link
              href="#how-it-works" 
              className="text-gray-700 hover:text-[#FF1E00] transition-colors font-medium"
                          >
              How It Works
                          </Link>
                          <Link
              href="#about" 
              className="text-gray-700 hover:text-[#FF1E00] transition-colors font-medium"
            >
              About
            </Link>
            <Button 
              onClick={() => {
                const element = document.getElementById('beta-signup');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#FF1E00] hover:bg-[#E01A00] shadow-md hover:shadow-lg"
            >
              Join Waitlist
            </Button>
          </nav>

          {/* Mobile CTA Button */}
          <Button 
            onClick={() => {
              const element = document.getElementById('beta-signup');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="md:hidden px-4 py-2 text-sm font-semibold text-white bg-[#FF1E00] hover:bg-[#E01A00]"
          >
            Join Waitlist
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => dispatch(setMobileMenuOpen(false))}
      >
        <div 
          className={`fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl transform transition-transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-700">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <Link 
              href="#features" 
              className="block py-2 text-gray-700 hover:text-[#FF1E00] transition-colors font-medium"
              onClick={() => dispatch(setMobileMenuOpen(false))}
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="block py-2 text-gray-700 hover:text-[#FF1E00] transition-colors font-medium"
              onClick={() => dispatch(setMobileMenuOpen(false))}
            >
              How It Works
            </Link>
            <Link 
              href="#about" 
              className="block py-2 text-gray-700 hover:text-[#FF1E00] transition-colors font-medium"
              onClick={() => dispatch(setMobileMenuOpen(false))}
            >
              About
            </Link>
            <Button 
              onClick={() => {
                dispatch(setMobileMenuOpen(false));
                const element = document.getElementById('beta-signup');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#FF1E00] hover:bg-[#E01A00] shadow-md"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
