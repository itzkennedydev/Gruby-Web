import React from 'react';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ReduxProvider } from '@/components/ReduxProvider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Gruby - Budgeting-Focused Cooking Companion',
  description: 'Gruby is a financial-minded cooking companion that guides you through recipes while showing exactly how much money you save by cooking at home.',
  icons: {
    icon: '/GrubyIcon.svg',
    apple: '/GrubyIcon.svg',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-white flex flex-col">
          <ErrorBoundary>
            <ReduxProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </ReduxProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
