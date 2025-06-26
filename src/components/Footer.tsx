'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';

interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: JSX.Element;
}

const socialLinks: SocialLink[] = [
  { href: '#', ariaLabel: 'Facebook', icon: <Facebook className="w-6 h-6" /> },
  { href: '#', ariaLabel: 'Twitter', icon: <Twitter className="w-6 h-6" /> },
  { href: '#', ariaLabel: 'Instagram', icon: <Instagram className="w-6 h-6" /> },
];

function SocialIcons() {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((link) => (
        <a key={link.ariaLabel} href={link.href} aria-label={link.ariaLabel} className="text-gray-800 hover:text-black">
          {link.icon}
        </a>
      ))}
    </div>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');

  function handleNewsletterSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Handle newsletter subscription logic here
    setEmail(''); // Clear the input after submission
  }

  return (
    <footer className="bg-gray-100 text-gray-800 pt-12 mt-auto border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <FooterColumn title="">
            <div className="mb-4">
              <Image
                src="https://di8mcd92ly4ww.cloudfront.net/GrubyLogo.png"
                alt="Gruby Logo"
                width={120}
                height={23}
              />
            </div>
            <p className="text-sm mb-4">Connecting food lovers with talented home cooks.</p>
            <SocialIcons />
          </FooterColumn>

          <FooterColumn title="Quick Links">
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-800 hover:underline">About Us</Link></li>
              <li><Link href="/faq" className="text-gray-800 hover:underline">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-800 hover:underline">Contact</Link></li>
              <li><Link href="/home-cooks" className="text-gray-800 hover:underline">Find a Home Cook</Link></li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Legal">
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-800 hover:underline">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-800 hover:underline">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-gray-800 hover:underline">Cookie Policy</Link></li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Newsletter">
            <p className="text-sm mb-4">Stay updated with our latest offers and home cook stories.</p>
            <form onSubmit={handleNewsletterSubmit} noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </FooterColumn>
        </div>
      </div>
      <div className="bg-gray-200 py-4 mt-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Gruby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
