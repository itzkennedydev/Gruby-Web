import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
        <Header />
            <body className="min-h-screen bg-gray-50">
                {children}
            </body>
        <Footer />
    </html>
  );
}
