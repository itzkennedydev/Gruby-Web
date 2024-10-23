import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { ClipLoader } from 'react-spinners';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface OrderDetails {
  customer_details?: {
    email?: string;
    name?: string;
  };
  items?: {
    name: string;
    quantity: number;
    price: string;
  }[];
  total_amount?: string;
}

export default function OrderConfirmation() {
  const router = useRouter();
  const { payment_intent, payment_intent_client_secret } = router.query;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (payment_intent && payment_intent_client_secret) {
      void verifyPayment();
    }
  }, [payment_intent, payment_intent_client_secret]);

  const verifyPayment = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Failed to load Stripe');

      const paymentIntentClientSecret = payment_intent_client_secret as string;
      const paymentIntentId = payment_intent as string;

      const { paymentIntent } = await stripe.retrievePaymentIntent(paymentIntentClientSecret);

      if (paymentIntent?.status === 'succeeded') {
        const response = await fetch(`/api/order-details?payment_intent=${paymentIntentId}`);
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error data:', errorData);
          throw new Error(`Failed to fetch order details: ${errorData.error ?? response.statusText}`);
        }

        const orderData = await response.json() as OrderDetails;
        setOrderDetails(orderData);
        setStatus('success');
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setStatus('error');
    }
  };

  if (status === 'loading') {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-background rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Order Confirmation</h1>
        <ClipLoader size={50} color="#6c757d" className="mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">Verifying your payment, please wait...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-background rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-destructive">Order Confirmation Failed</h1>
        <p className="text-lg mb-4 text-destructive">
          There was an error processing your order. Please contact support if this issue persists.
        </p>
        <Link href="/">
          <Button variant="destructive" className="mt-4">Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-background rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-foreground">Order Confirmation</h1>
      <p className="text-lg mb-4 text-center text-foreground">Thank you for your order!</p>
      <p className="text-center mb-4 text-muted-foreground">
        Your payment was successful, and your order is being processed.
      </p>

      {orderDetails && (
        <>
          <div className="border-b border-border mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="font-bold text-foreground">Customer Name</p>
              <p className="text-foreground">{orderDetails.customer_details?.name ?? 'N/A'}</p>
            </div>
            <div>
              <p className="font-bold text-foreground">Customer Email</p>
              <p className="text-foreground">{orderDetails.customer_details?.email ?? 'N/A'}</p>
            </div>
          </div>

          <div className="bg-secondary p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
            {orderDetails.items && orderDetails.items.length > 0 ? (
              <ul>
                {orderDetails.items.map((item, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span className="text-foreground">{item.name} x{item.quantity}</span>
                    <span className="text-foreground">{item.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-foreground">No items found</p>
            )}
            <div className="flex justify-between mt-4 font-bold text-foreground">
              <span>Total Amount:</span>
              <span>{orderDetails.total_amount ?? 'N/A'}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Link href="/">
              <Button variant="default">Return to Home</Button>
            </Link>
            <Link href="/orders">
              <Button variant="outline">View Orders</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
