'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="text-center max-w-lg w-full">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Link href="/" className="inline-block">
            <Image
              src="/GrubyLogo.svg"
              alt="Gruby Logo"
              width={140}
              height={32}
              className="w-auto h-auto"
              style={{ height: 'clamp(2rem, 3vw, 2.5rem)' }}
              priority
            />
          </Link>
        </div>

        {/* Heading */}
        <h1 className="font-bold text-[#222222] mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw + 1rem, 2.5rem)' }}>
          Something went wrong!
        </h1>
        
        {/* Description */}
        <p className="mb-10 text-[#717171] leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw + 0.75rem, 1.25rem)' }}>
          We&apos;re sorry, but something unexpected happened. Don&apos;t worry, we&apos;re here to help you get back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button
            onClick={reset}
            aria-label="Try again"
            className="font-semibold"
            size="lg"
          >
            Try again
          </Button>
          <Link href="/" passHref>
            <Button
              variant="outline"
              aria-label="Go back to homepage"
              className="font-semibold"
              size="lg"
            >
              Go to homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 