import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import {Footer} from '@/components/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Add any global meta tags or links here if necessary */}
      </head>
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};
