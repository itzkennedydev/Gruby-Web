import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface OrderDetails {
  id: string;
  amount: number;
  status: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  createdAt: string;
}

export default function SuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { sessionId } = router.query;
  const { user } = useUser();

  useEffect(() => {
    if (sessionId && user) {
      setIsLoading(true);
      fetch(`/api/checkout-sessions/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data);
          return fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: sessionId,
            }),
          });
        })
        .then(res => res.json())
        .then(orderData => {
          console.log('Order created:', orderData);
          toast({
            title: "Order Confirmed",
            description: `Your order #${orderData.id} has been successfully placed.`,
            duration: 5000,
          });
        })
        .catch(err => {
          console.error('Error:', err);
          toast({
            title: "Error",
            description: "There was a problem processing your order. Please contact support.",
            variant: "destructive",
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [sessionId, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
        <p className="text-xl">Processing your order...</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Order Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We couldn't find your order details. Please check your email for confirmation or contact support.</p>
            <Button onClick={() => router.push('/')} className="mt-4">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
            Order Confirmed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg">Thank you for your order, {user?.firstName}!</p>
            <p>Order ID: <span className="font-semibold">{orderDetails.id}</span></p>
            <p>Total Amount: <span className="font-semibold">${(orderDetails.amount / 100).toFixed(2)}</span></p>
            <p>Status: <span className="font-semibold capitalize">{orderDetails.status}</span></p>
            <p>Date: <span className="font-semibold">{new Date(orderDetails.createdAt).toLocaleString()}</span></p>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Order Items:</h3>
              <ul className="list-disc list-inside">
                {orderDetails.items.map(item => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity} - ${(item.price / 100).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            
            <Button onClick={() => router.push('/')} className="mt-6">
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
