'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setWaitlistModalOpen } from '@/store/slices/uiSlice';
import { setEmail, setSubmitting, setSubmitted, setError } from '@/store/slices/betaSlice';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Header = () => {
  const dispatch = useAppDispatch();
  const waitlistModalOpen = useAppSelector((state) => state.ui.waitlistModalOpen);
  const { email, isSubmitting, isSubmitted, error } = useAppSelector((state) => state.beta);
  const [localEmail, setLocalEmail] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header at the top
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } 
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleBetaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localEmail.trim()) return;

    dispatch(setSubmitting(true));
    dispatch(setError(null));

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: localEmail.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }
      
      dispatch(setEmail(localEmail));
      dispatch(setSubmitted(true));
      setLocalEmail('');
      
      // Reset submitted state after 3 seconds
      setTimeout(() => {
        dispatch(setSubmitted(false));
        dispatch(setWaitlistModalOpen(false));
      }, 3000);
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.'));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <header 
      className="sticky z-50 transition-transform duration-300 ease-in-out" 
      style={{ 
        paddingTop: 'clamp(1rem, 1.5vw, 2rem)', 
        paddingLeft: 'clamp(1rem, 2vw, 2rem)', 
        paddingRight: 'clamp(1rem, 2vw, 2rem)',
        top: isHeaderVisible ? '0' : '-100px',
        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)'
      }}
    >
      <div className="max-w-[1920px] mx-auto" style={{ containerType: 'inline-size' }}>
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg" style={{ paddingLeft: 'clamp(1rem, 2vw, 1.5rem)', paddingRight: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <div className="flex items-center justify-between" style={{ paddingTop: 'clamp(0.75rem, 1vw, 1rem)', paddingBottom: 'clamp(0.75rem, 1vw, 1rem)' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/GrubyLogo.svg"
                alt="Gruby Logo"
                width={120}
                height={28}
                className="w-auto"
                style={{ height: 'clamp(1.5rem, 2vw, 1.75rem)' }}
                priority
              />
            </Link>

            {/* CTA Button */}
            <Button 
              onClick={() => dispatch(setWaitlistModalOpen(true))}
              className="font-semibold text-white bg-[#FF1E00] hover:bg-[#E01A00] shadow-md hover:shadow-lg rounded-full"
              style={{ 
                paddingLeft: 'clamp(1rem, 2vw, 1.5rem)', 
                paddingRight: 'clamp(1rem, 2vw, 1.5rem)',
                paddingTop: 'clamp(0.5rem, 0.75vw, 0.625rem)',
                paddingBottom: 'clamp(0.5rem, 0.75vw, 0.625rem)',
                fontSize: 'clamp(0.875rem, 1vw, 0.9375rem)'
              }}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>


      {/* Join Waitlist Modal */}
      <Dialog open={waitlistModalOpen} onOpenChange={(open) => dispatch(setWaitlistModalOpen(open))}>
        <DialogContent className="sm:max-w-md border-0 outline-none shadow-none bg-white p-6">
          <DialogHeader className="text-center space-y-2 pb-4">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">
              Join the waitlist
            </DialogTitle>
            <DialogDescription className="text-base text-[#717171] px-0">
              Be among the first to experience Gruby. Get early access and exclusive updates.
            </DialogDescription>
          </DialogHeader>
          
          {isSubmitted ? (
            <div className="mt-8 bg-[#f5f5f7] rounded-2xl p-8 text-center border border-gray-200">
              <p className="font-bold text-[#222222] mb-4" style={{ fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.25rem)' }}>You're in! 🎉</p>
              <p className="text-[#717171]" style={{ fontSize: 'clamp(0.875rem, 1vw + 0.25rem, 0.875rem)' }}>
                We'll send updates to <span className="font-semibold text-[#222222]">{email}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleBetaSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="block font-medium text-[#222222]" style={{ fontSize: 'clamp(0.875rem, 1vw + 0.25rem, 0.875rem)' }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-4 rounded-full bg-white border-2 border-gray-200 text-[#222222] placeholder-[#717171] focus:outline-none focus:ring-2 focus:ring-[#FF1E00] focus:border-[#FF1E00] transition-colors duration-200 text-base hover:border-gray-300"
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">
                    {error}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF1E00] hover:bg-[#E01A00] text-white font-semibold rounded-full transition-colors duration-200 disabled:opacity-50"
                style={{ 
                  paddingLeft: 'clamp(1.5rem, 2vw, 1.5rem)',
                  paddingRight: 'clamp(1.5rem, 2vw, 1.5rem)',
                  paddingTop: 'clamp(1rem, 1.5vw, 1rem)',
                  paddingBottom: 'clamp(1rem, 1.5vw, 1rem)',
                  fontSize: 'clamp(1rem, 1.25vw + 0.5rem, 1rem)'
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Securing your spot...
                  </>
                ) : (
                  'Reserve My Spot'
                )}
              </Button>
              <p className="text-center text-[#717171] mt-2" style={{ fontSize: 'clamp(0.75rem, 0.875vw + 0.25rem, 0.75rem)' }}>
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
