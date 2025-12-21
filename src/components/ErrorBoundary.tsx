'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
          <div className="text-center max-w-lg w-full">
            {/* Logo */}
            <div className="mb-12 flex justify-center">
              <Link href="/" className="inline-block">
                <Image
                  src="/GrubyLogo.svg"
                  alt="Gruby Logo"
                  width={140}
                  height={32}
                  className="w-auto h-auto"
                  style={{ height: 'clamp(2rem, 3vw, 2.5rem)' }}
                  priority
                />
              </Link>
            </div>

            {/* Heading */}
            <h1 className="font-bold text-[#222222] mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw + 1rem, 2.5rem)' }}>
              Something went wrong!
            </h1>
            
            {/* Description */}
            <p className="mb-10 text-[#717171] leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw + 0.75rem, 1.25rem)' }}>
              We&apos;re sorry, but something unexpected happened. Don&apos;t worry, we&apos;re here to help you get back on track.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.reload();
                }}
                className="font-semibold bg-[var(--gruby-primary)] hover:opacity-90 text-white shadow-md hover:shadow-lg rounded-full transition-colors duration-200"
                style={{ 
                  fontSize: 'clamp(0.9375rem, 1.25vw + 0.75rem, 1rem)',
                  paddingLeft: 'clamp(1.5rem, 2vw, 2rem)',
                  paddingRight: 'clamp(1.5rem, 2vw, 2rem)',
                  paddingTop: 'clamp(0.75rem, 1vw, 0.875rem)',
                  paddingBottom: 'clamp(0.75rem, 1vw, 0.875rem)'
                }}
              >
                Reload Page
              </button>
              <Link href="/" passHref>
                <button
                  className="font-semibold bg-white hover:bg-gray-50 text-[#222222] border-2 border-gray-200 hover:border-gray-300 rounded-full transition-colors duration-200"
                  style={{ 
                    fontSize: 'clamp(0.9375rem, 1.25vw + 0.75rem, 1rem)',
                    paddingLeft: 'clamp(1.5rem, 2vw, 2rem)',
                    paddingRight: 'clamp(1.5rem, 2vw, 2rem)',
                    paddingTop: 'clamp(0.75rem, 1vw, 0.875rem)',
                    paddingBottom: 'clamp(0.75rem, 1vw, 0.875rem)'
                  }}
                >
                  Go to homepage
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 