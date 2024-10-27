// pages/order-confirmation.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle2, HomeIcon, ListIcon, Mail, Package, User, XCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';

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

interface ApiError {
  message: string;
}

export default function OrderConfirmation() {
  const router = useRouter();
  const { user } = useUser();
  const { payment_intent, payment_intent_client_secret } = router.query;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [guestEmail, setGuestEmail] = useState('');

  const sendEmailConfirmation = async (orderData: OrderDetails, email: string) => {
    console.log('Attempting to send email confirmation to:', email);
    console.log('Order Data:', orderData);

    try {
      const response = await fetch('/api/send-order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderDetails: orderData }),
      });

      const data = (await response.json()) as ApiError;
      console.log('Response from send-order-confirmation:', data);

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to send email confirmation');
      }

      toast({
        title: "Order Confirmation Email Sent",
        description: "Check your inbox for order details.",
      });
    } catch (error) {
      console.error('Error sending email confirmation:', error instanceof Error ? error.message : 'Unknown error');
      toast({
        title: "Email Confirmation Failed",
        description: `We couldn't send the confirmation email. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const verifyPayment = useCallback(async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Failed to load Stripe');

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        payment_intent_client_secret as string
      );

      if (paymentIntent?.status === 'succeeded') {
        const response = await fetch(`/api/order-details?payment_intent=${payment_intent?.toString() ?? ''}`);
        if (!response.ok) {
          const errorData = await response.json() as ApiError;
          throw new Error(errorData?.message || 'Failed to fetch order details');
        }

        const orderData = await response.json() as OrderDetails;
        setOrderDetails(orderData);

        if (user?.primaryEmailAddress?.emailAddress) {
          console.log('User is signed in, sending email to:', user.primaryEmailAddress.emailAddress);
          console.log('Order Data for Email:', orderData);
          
          await sendEmailConfirmation(orderData, user.primaryEmailAddress.emailAddress);
        } else {
          console.log('No signed-in user, status set to success');
          setStatus('success');
        }
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (error) {
      setStatus('error');
      toast({
        title: "Order Confirmation Failed",
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        variant: "destructive",
      });
    }
  }, [payment_intent_client_secret, user, setOrderDetails, setStatus]);

  useEffect(() => {
    if (payment_intent && payment_intent_client_secret) {
      void verifyPayment();
    }
  }, [payment_intent, payment_intent_client_secret, verifyPayment]);

  const handleGuestEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderDetails) {
      void sendEmailConfirmation(orderDetails, guestEmail);
    }
  };

  if (status === 'loading') {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <h1 className="text-2xl font-bold">Processing Your Order</h1>
              <p className="text-muted-foreground">Please wait while we verify your payment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <Card className="border-destructive">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center space-y-6">
              <XCircle className="h-16 w-16 text-destructive" />
              <div className="text-center">
                <h1 className="text-2xl font-bold text-destructive mb-2">Order Confirmation Failed</h1>
                <p className="text-muted-foreground mb-6">
                  There was an error processing your order. Please contact support if this issue persists.
                </p>
              </div>
              <Link href="/">
                <Button variant="default" className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success' && orderDetails) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-12">
            <div className="flex flex-col items-center mb-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-3xl font-bold text-center">Order Confirmed!</h1>
              <p className="text-muted-foreground text-center mt-2">
                Thank you for your purchase. Your order has been successfully processed.
              </p>
            </div>

            {!user && (
              <form onSubmit={handleGuestEmailSubmit} className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Receive Order Confirmation</h2>
                <div className="flex items-center gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                  />
                  <Button type="submit">Send Confirmation</Button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5" />
                    Customer Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{orderDetails.customer_details?.name ?? 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{orderDetails.customer_details?.email ?? 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orderDetails.items && orderDetails.items.length > 0 ? (
                    <div className="space-y-2">
                      {orderDetails.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {item.quantity}x
                            </span>
                            <span>{item.name}</span>
                          </span>
                          <span className="font-medium">{item.price}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-border">
                        <div className="flex justify-between items-center font-bold">
                          <span>Total</span>
                          <span>{orderDetails.total_amount}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No items found</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Alert className="mb-8">
              <AlertDescription>
                A confirmation email has been sent to {orderDetails.customer_details?.email}
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/">
                <Button variant="default" className="w-full sm:w-auto flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                  <ListIcon className="h-4 w-4" />
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
