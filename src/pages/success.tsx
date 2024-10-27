import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';

// Define OrderDetails type inline
interface OrderDetails {
  id: string;
  user?: {
    firstName: string;
  };
  amount: number;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const { session_id } = router.query;
    if (typeof session_id === 'string') {
      fetchOrderDetails(session_id);
    }
  }, [router.query]);

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/order-details?session_id=${sessionId}`);
      const data = await response.json();
      setOrderDetails(data as OrderDetails);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (!orderDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
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
            <p className="text-lg">Thank you for your order, {orderDetails.user?.firstName}!</p>
            <p>Order ID: <span className="font-semibold">{orderDetails.id}</span></p>
            <p>Total Amount: <span className="font-semibold">${(orderDetails.amount / 100).toFixed(2)}</span></p>
            <p>Status: <span className="font-semibold capitalize">{orderDetails.status}</span></p>
            <p>Date: <span className="font-semibold">{new Date(orderDetails.createdAt).toLocaleString()}</span></p>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Order Items:</h3>
              <ul className="list-disc list-inside">
                {orderDetails.items.map((item) => (
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
};

export default SuccessPage;
