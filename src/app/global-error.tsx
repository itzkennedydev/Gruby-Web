'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
          <div className="text-center max-w-md">
            <h1 className="font-bold mb-4" style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 2.5rem)' }}>Something went wrong!</h1>
            <p className="mb-8 text-[#717171]" style={{ fontSize: 'clamp(1.125rem, 1.5vw + 0.875rem, 1.25rem)' }}>
              We're sorry, but something unexpected happened.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                onClick={reset} 
                aria-label="Try again"
                className="px-6 py-3 bg-[#FF1E00] hover:bg-[#E01A00] text-white font-medium rounded-full transition-colors duration-200"
                style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1rem)' }}
              >
                Try again
              </Button>
              <Link href="/" passHref>
                <Button 
                  variant="outline" 
                  aria-label="Go back to homepage"
                  className="px-6 py-3 bg-transparent hover:bg-gray-50 text-[#222222] border-2 border-gray-200 hover:border-gray-300 font-medium rounded-full transition-colors duration-200"
                  style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1rem)' }}
                >
                  Go back to homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 