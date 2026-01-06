'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/Footer';

interface NavLink {
  href: string;
  label: string;
}

interface DocsLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  navLinks?: NavLink[];
  currentPath?: string;
}

const defaultNavLinks: NavLink[] = [
  { href: '/support', label: 'Support' },
  { href: '/faq', label: 'Help Center' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/eula', label: 'EULA' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/community-guidelines', label: 'Community Guidelines' },
  { href: '/acceptable-use', label: 'Acceptable Use' },
  { href: '/data-retention', label: 'Data Retention' },
  { href: '/third-party-services', label: 'Third-Party Services' },
  { href: '/messaging-policy', label: 'Messaging Policy' },
  { href: '/content-licensing', label: 'Content Licensing' },
  { href: '/gatherings-terms', label: 'Gatherings Terms' },
  { href: '/location-services', label: 'Location Services' },
  { href: '/dmca', label: 'DMCA' },
  { href: '/accessibility', label: 'Accessibility' },
];

export function DocsLayout({
  children,
  title,
  description,
  navLinks = defaultNavLinks,
  currentPath
}: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Docs Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/GrubyLogoDark.svg"
                alt="Gruby Logo"
                width={100}
                height={24}
                className="w-auto"
                style={{ height: 'clamp(1.25rem, 2vw, 1.5rem)' }}
                priority
              />
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              {description && (
                <p className="text-sm text-gray-500 hidden sm:block">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Legal & Policies
              </p>
              {navLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0 max-w-4xl">
            <div className="prose prose-lg max-w-none" style={{ lineHeight: '1.75' }}>
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <select
          value={currentPath || ''}
          onChange={(e) => {
            if (e.target.value) {
              window.location.href = e.target.value;
            }
          }}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm"
        >
          <option value="" disabled>Navigate to...</option>
          {navLinks.map((link) => (
            <option key={link.href} value={link.href}>
              {link.label}
            </option>
          ))}
        </select>
      </div>

      <div className="lg:pb-0 pb-20">
        <Footer variant="docs" />
      </div>
    </div>
  );
}
