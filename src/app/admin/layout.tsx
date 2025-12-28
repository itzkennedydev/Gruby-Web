'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, SignInButton, useClerk } from '@clerk/nextjs';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Settings,
  Database,
  LogOut,
  Shield,
  Loader2,
  Terminal,
  FileText,
  Flag,
  CalendarDays,
} from 'lucide-react';

// Approved admin emails
const APPROVED_ADMIN_EMAILS = [
  'itskennedy.dev@gmail.com',
  'kennedy@gruby.app',
  'Kennedy@gruby.app',
];

interface AdminLayoutProps {
  children: ReactNode;
}

const navLinks = [
  // Main
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, section: 'main' },
  { href: '/admin/users', label: 'Users', icon: Users, section: 'main' },
  { href: '/admin/creator-applications', label: 'Applications', icon: ClipboardList, section: 'main' },
  // Content
  { href: '/admin/content', label: 'Content', icon: FileText, section: 'content' },
  { href: '/admin/gatherings', label: 'Gatherings', icon: CalendarDays, section: 'content' },
  { href: '/admin/reports', label: 'Reports', icon: Flag, section: 'content' },
  // System
  { href: '/admin/database', label: 'Database', icon: Database, section: 'system' },
  { href: '/admin/tools', label: 'Dev Tools', icon: Terminal, section: 'system' },
  { href: '/admin/settings', label: 'Settings', icon: Settings, section: 'system' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        setIsAuthorized(false);
        return;
      }

      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (userEmail && APPROVED_ADMIN_EMAILS.includes(userEmail)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-gray-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Admin Access Required</h1>
            <p className="text-gray-500">
              Please sign in with an authorized admin account to access this area.
            </p>
          </div>
          <SignInButton mode="modal">
            <button className="w-full px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Sign In
            </button>
          </SignInButton>
          <Link
            href="/"
            className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-4"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  // Signed in but not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-500 mb-2">
              Your account ({user?.primaryEmailAddress?.emailAddress}) is not authorized to access the admin area.
            </p>
            <p className="text-sm text-gray-400">
              Contact an administrator if you believe this is an error.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => signOut(() => router.push('/'))}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Sign Out
            </button>
            <Link
              href="/"
              className="block text-center text-sm text-gray-500 hover:text-gray-700"
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
              </div>
            </div>
            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.fullName || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <button
                onClick={() => signOut(() => router.push('/'))}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <nav className="sticky top-24 space-y-6">
              {/* Main Section */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                  Main
                </p>
                {navLinks.filter(l => l.section === 'main').map((link) => {
                  const isActive = pathname === link.href ||
                    (link.href !== '/admin' && pathname?.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Content Section */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                  Content
                </p>
                {navLinks.filter(l => l.section === 'content').map((link) => {
                  const isActive = pathname === link.href ||
                    (link.href !== '/admin' && pathname?.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* System Section */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                  System
                </p>
                {navLinks.filter(l => l.section === 'system').map((link) => {
                  const isActive = pathname === link.href ||
                    (link.href !== '/admin' && pathname?.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <select
          value={pathname || '/admin'}
          onChange={(e) => {
            if (e.target.value) {
              router.push(e.target.value);
            }
          }}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
        >
          <optgroup label="Main">
            {navLinks.filter(l => l.section === 'main').map((link) => (
              <option key={link.href} value={link.href}>{link.label}</option>
            ))}
          </optgroup>
          <optgroup label="Content">
            {navLinks.filter(l => l.section === 'content').map((link) => (
              <option key={link.href} value={link.href}>{link.label}</option>
            ))}
          </optgroup>
          <optgroup label="System">
            {navLinks.filter(l => l.section === 'system').map((link) => (
              <option key={link.href} value={link.href}>{link.label}</option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  );
}
