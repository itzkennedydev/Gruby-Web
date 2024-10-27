import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  imageUrl?: string;
}

interface Order {
  id: string;
  createdAt: string;
  totalAmount: string;
  status: string;
  items: OrderItem[];
}

const OrderItemComponent: React.FC<OrderItem> = ({ name, quantity, price, imageUrl }) => (
  <li className="py-4 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image 
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      </div>
    </div>
    <span className="font-medium text-gray-900">${price}</span>
  </li>
);

const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
  <Card className="overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-black">
            Order #{order.id}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className={`
          px-4 py-1.5 rounded-full text-sm font-medium
          ${order.status === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'}
        `}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </div>
      </div>
    </div>
    
    <ul className="divide-y divide-gray-100 px-6">
      {order.items.map((item, index) => (
        <OrderItemComponent key={index} {...item} />
      ))}
    </ul>
    
    <div className="px-6 py-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <span className="text-base font-medium text-gray-700">Total Amount</span>
        <span className="text-xl font-semibold text-black">
          ${order.totalAmount}
        </span>
      </div>
    </div>
  </Card>
);

export default function OrdersPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      void router.push('/sign-in');
      return;
    }

    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as Order[];
        console.log('Fetched orders:', data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchOrders();
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
            <p className="text-gray-500 mt-1">View all your past orders</p>
          </div>
          <div className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                Looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button 
                onClick={() => void router.push('/')}
                className="min-w-[200px]"
              >
                Browse Products
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
