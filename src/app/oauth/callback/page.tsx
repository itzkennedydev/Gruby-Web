'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

/**
 * OAuth Callback Page
 * 
 * This page handles OAuth redirects from Kroger and redirects to the mobile app
 * using the custom URL scheme (gruby://oauth/callback)
 * 
 * When Kroger redirects to https://gruby.app/oauth/callback?code=...,
 * this page extracts the code and redirects to gruby://oauth/callback?code=...
 * which opens the mobile app.
 */
function OAuthCallbackContent() {
  const searchParams = useSearchParams();

  // Get the app URL for redirect
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  const state = searchParams.get('state');
  const params = new URLSearchParams();
  if (code) params.set('code', code);
  if (error) params.set('error', error);
  if (errorDescription) params.set('error_description', errorDescription);
  if (state) params.set('state', state);
  const appUrl = `gruby://oauth/callback?${params.toString()}`;

  useEffect(() => {
    // Redirect to the app using custom URL scheme
    // Try multiple methods to ensure the redirect works
    window.location.href = appUrl;
    
    // Fallback with timeout (if first attempt doesn't work)
    setTimeout(() => {
      window.location.replace(appUrl);
    }, 100);
  }, [appUrl]);

  return (
    <>
      {/* Script to handle redirect immediately - runs before React hydration */}
      <Script id="oauth-redirect" strategy="beforeInteractive" dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const error = params.get('error');
            const errorDescription = params.get('error_description');
            const state = params.get('state');
            
            const redirectParams = new URLSearchParams();
            if (code) redirectParams.set('code', code);
            if (error) redirectParams.set('error', error);
            if (errorDescription) redirectParams.set('error_description', errorDescription);
            if (state) redirectParams.set('state', state);
            
            const appUrl = 'gruby://oauth/callback?' + redirectParams.toString();
            window.location.href = appUrl;
          })();
        `
      }} />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Redirecting to Gruby...</h1>
          <p style={{ color: '#666', marginBottom: '24px' }}>Please wait while we redirect you to the app.</p>
          <a 
            href={appUrl}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#fa2625',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px'
            }}
          >
            Open Gruby App
          </a>
        </div>
      </div>
    </>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <p>Loading...</p>
      </div>
    }>
      <OAuthCallbackContent />
    </Suspense>
  );
}
