'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

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
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="font-bold mb-2 text-[#222222]" style={{ fontSize: 'clamp(1.5rem, 3vw + 1rem, 1.5rem)' }}>Something went wrong</h1>
            <p className="mb-4 text-[#717171]" style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1rem)' }}>
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="px-6 py-3 bg-[#FF1E00] hover:bg-[#E01A00] text-white font-medium rounded-full transition-colors duration-200"
              style={{ fontSize: 'clamp(1rem, 1.25vw + 0.75rem, 1rem)' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 