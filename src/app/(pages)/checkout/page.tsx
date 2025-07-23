'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { CartItem } from '@/types/CartItem';
import { ArrowLeft, ShoppingCart, CreditCard, LockIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Add debugging for Stripe key
console.log('Stripe publishable key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Present' : 'Missing');

function CheckoutForm({ totalPrice, orderSummary }: { totalPrice: number; orderSummary: ReturnType<typeof calculateTotalPrice> }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);
  const { clearCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setPaymentError('Payment system is not ready. Please try again.');
      return;
    }

    // Check if PaymentElement is mounted
    const paymentElement = elements.getElement('payment');
    if (!paymentElement) {
      setPaymentError('Payment form is not ready. Please wait a moment and try again.');
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
      });

      if (error) {
        setPaymentError(error.message ?? 'An unknown error occurred');
      } else {
        clearCart();
        router.push('/order-confirmation');
      }
    } catch (err) {
      setPaymentError('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="order-2 lg:order-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <PaymentElement 
                onReady={() => {
                  console.log('PaymentElement is ready');
                  setIsPaymentElementReady(true);
                }}
                onLoaderStart={() => {
                  console.log('PaymentElement loading started');
                  setIsPaymentElementReady(false);
                }}
                onChange={(event) => {
                  console.log('PaymentElement change:', event);
                }}
                onFocus={() => {
                  console.log('PaymentElement focused');
                }}
                onBlur={() => {
                  console.log('PaymentElement blurred');
                }}
              />
            </div>
            
            {paymentError && (
              <Alert variant="destructive">
                <AlertDescription>{paymentError}</AlertDescription>
              </Alert>
            )}

            <div className="border-t pt-4">
              <Button
                type="submit"
                disabled={!stripe || isLoading || !isPaymentElementReady}
                className="w-full h-12 text-lg"
              >
                {isLoading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
              </Button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
                <LockIcon className="h-4 w-4" />
                Secured by Stripe
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="order-1 lg:order-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderSummary.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start py-2">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  {item.selectedOptions && (
                    <p className="text-sm text-gray-500">
                      {Object.entries(item.selectedOptions)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}
                    </p>
                  )}
                </div>
                <p className="font-medium">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee</span>
                <span>${orderSummary.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Payment Processing</span>
                <span>${orderSummary.paymentHandlingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${orderSummary.taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">${orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const { cartItems } = useCart();
  const [orderSummary, setOrderSummary] = useState<ReturnType<typeof calculateTotalPrice> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setError('Your cart is empty. Please add items before checking out.');
      return;
    }

    const summary = calculateTotalPrice(cartItems);
    setOrderSummary(summary);
    console.log('Cart items:', cartItems);
    console.log('Order summary:', summary);

    if (summary.total > 0) {
      console.log('Creating payment intent for amount:', summary.total);
      void fetch('/api/createPaymentIntent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount: summary.total,
        }),
      })
        .then((res) => {
          console.log('Payment intent response status:', res.status);
          if (!res.ok) {
            return res.text().then(text => {
              console.error('Payment intent error response:', text);
              throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
            });
          }
          return res.json();
        })
        .then((data: { clientSecret?: string }) => {
          console.log('Payment intent response data:', data);
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
            console.log('Client secret set successfully');
          } else {
            console.error('No client secret in response');
            setError('Failed to initialize payment. Please try again.');
          }
        })
        .catch((err) => {
          console.error('Payment intent creation error:', err);
          setError(`An error occurred while setting up the payment: ${err.message}. Please try again.`);
        });
    } else {
      console.error('Invalid total price:', summary.total);
      setError('Invalid total price. Please try again.');
    }
  }, [cartItems]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0F172A',
      },
    },
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1920px]">
        <div className="mb-6">
          <Link href="/cart">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>
          </Link>
        </div>
        
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        
        <div className="mt-4">
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!clientSecret || !orderSummary) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1920px]">
        <div className="mb-6">
          <Link href="/cart">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>
          </Link>
        </div>
        
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Setting up your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1920px]">
      <div className="mb-6">
        <Link href="/cart">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your order securely</p>
      </div>

      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm totalPrice={orderSummary.total} orderSummary={orderSummary} />
      </Elements>
    </div>
  );
}

function calculateTotalPrice(cartItems: CartItem[]) {
  const subtotal = cartItems.reduce((total, item) => total + (Number(item.price) * Number(item.quantity)), 0);
  const serviceFee = subtotal * 0.15;
  const paymentHandlingFee = subtotal * 0.029 + 0.30;
  const taxes = subtotal * 0.08;
  const total = subtotal + serviceFee + paymentHandlingFee + taxes;

  return {
    items: cartItems,
    subtotal,
    serviceFee,
    paymentHandlingFee,
    taxes,
    total,
  };
} 