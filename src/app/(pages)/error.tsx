'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-xl mb-8">An unexpected error occurred.</p>
      <div className="flex gap-4">
        <Button onClick={reset} aria-label="Try again">
          Try again
        </Button>
        <Link href="/" passHref>
          <Button variant="outline" aria-label="Go back to homepage">
            Go back to homepage
          </Button>
        </Link>
      </div>
    </div>
  );
} 