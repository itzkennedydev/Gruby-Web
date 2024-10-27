import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">The page you are looking for does not exist.</p>
        <Link href="/" passHref>
          <Button aria-label="Go back to homepage">Go back to homepage</Button>
        </Link>
      </div>
    </>
  );
}
