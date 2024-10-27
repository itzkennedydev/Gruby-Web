import React, { memo } from 'react';
import Header from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MemoizedHeader />
      <main className="flex-grow" role="main">
        {children}
      </main>
      <MemoizedFooter />
    </div>
  );
};

// Memoizing Header and Footer to prevent unnecessary re-renders
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

export default Layout;
