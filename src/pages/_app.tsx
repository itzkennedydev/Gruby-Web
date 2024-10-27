import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from '../contexts/CartContext';
import '@/styles/globals.css';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout';
import { useState } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
        <ClerkProvider {...pageProps}>
          <CartProvider>
            <Layout>
              <Elements stripe={stripePromise}>
                <Component {...pageProps} />
                <Toaster position="bottom-right" />
              </Elements>
            </Layout>
          </CartProvider>
        </ClerkProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
