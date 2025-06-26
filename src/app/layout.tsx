import React from 'react';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import ClientOnly from '@/components/ClientOnly';
import ErrorBoundary from '@/components/ErrorBoundary';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Gruby - Home Cooking Marketplace',
  description: 'Connect with talented home cooks in your area and experience authentic homemade meals made with love.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-50 flex flex-col">
          <ErrorBoundary>
            <CartProvider>
              <ClientOnly>
                <Header />
              </ClientOnly>
              <main className="flex-1">
                {children}
              </main>
              <ClientOnly>
                <Footer />
              </ClientOnly>
            </CartProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
