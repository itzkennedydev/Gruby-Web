'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const [footerEmail, setFooterEmail] = useState('');

  function handleNewsletterSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Handle newsletter subscription logic here
    setFooterEmail(''); // Clear the input after submission
  }

  return (
    <footer className="bg-white border-t border-[#E5E5E5]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Image
              src="/GrubyLogo.svg"
              alt="Gruby Logo"
              width={100}
              height={36}
              className="mb-3 sm:mb-4"
            />
            <p className="text-xs sm:text-sm text-[#717171]">
              Join a community of home cooks sharing recipes and growing together.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#222222] mb-3 sm:mb-4 text-xs sm:text-sm">Support</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><Link href="/about" className="text-[#717171] hover:text-[#222222] transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="text-[#717171] hover:text-[#222222] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-[#717171] hover:text-[#222222] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#222222] mb-3 sm:mb-4 text-xs sm:text-sm">Legal</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><Link href="/terms" className="text-[#717171] hover:text-[#222222] transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="text-[#717171] hover:text-[#222222] transition-colors">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#222222] mb-3 sm:mb-4 text-xs sm:text-sm">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base bg-[#f5f5f7] border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF1E00] transition-shadow"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 sm:py-2.5 md:py-3 bg-[#FF1E00] hover:bg-[#E01A00] text-white text-xs sm:text-sm md:text-base font-medium rounded-full transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#E5E5E5]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-[#717171]">
            © {new Date().getFullYear()} Gruby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
