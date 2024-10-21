import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import Layout from '~/components/Layout';
import { CartProvider } from '~/contexts/CartContext';
import '~/styles/globals.css';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '~/lib/stripe';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
}

export default MyApp;
