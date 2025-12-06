'use client';

import React, { useState } from 'react';
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
        dispatch(setWaitlistModalOpen(false));
      }, 3000);
    } catch (err) {
      dispatch(setError('Something went wrong. Please try again.'));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <header className="sticky top-0 z-50 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1920px] mx-auto">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg px-4 sm:px-6">
          <div className="flex items-center justify-between py-3">
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

            {/* CTA Button */}
            <Button 
              onClick={() => dispatch(setWaitlistModalOpen(true))}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold text-white bg-[#FF1E00] hover:bg-[#E01A00] shadow-md hover:shadow-lg rounded-full"
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
              <p className="text-xl font-bold text-[#222222] mb-4">You're in! 🎉</p>
              <p className="text-sm text-[#717171]">
                We'll send updates to <span className="font-semibold text-[#222222]">{email}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleBetaSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#222222]">
                  Email address
                </label>
                <input
                  type="email"
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-4 rounded-full bg-white border-2 border-gray-200 text-[#222222] placeholder-[#717171] focus:outline-none focus:ring-2 focus:ring-[#FF1E00] focus:border-[#FF1E00] transition-all text-base hover:border-gray-300"
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
                className="w-full px-6 py-4 bg-[#FF1E00] hover:bg-[#E01A00] text-white text-base font-semibold rounded-full transition-all disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
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
              <p className="text-xs text-center text-[#717171] mt-2">
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
