import React from 'react';
import { useEffect, useState } from 'react';
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

const OrderItemComponent: React.FC<OrderItem> = ({ name, quantity, price, imageUrl }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(imageUrl);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    console.log(`OrderItem: ${name}, ImageUrl: ${imageUrl}`);
    if (imageUrl) {
      setImgSrc(imageUrl);
    }
  }, [imageUrl, name]);

  return (
    <li className="py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          {imgSrc && !imgError ? (
            <Image 
              src={imgSrc}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              onError={() => {
                console.error(`Failed to load image: ${imgSrc}`);
                setImgError(true);
                setImgSrc('/placeholder-image.jpg');
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">Quantity: {quantity}</p>
          {imgError && <p className="text-xs text-red-500">Image failed to load</p>}
        </div>
      </div>
      <span className="font-medium text-gray-900">${parseFloat(price).toFixed(2)}</span>
    </li>
  );
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-black">
            Order #{order.id.slice(0, 8)}
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
            ? 'bg-[#E2F5EA] text-[#05944F]' 
            : 'bg-[#FFF8E6] text-[#B8860B]'}
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
          ${parseFloat(order.totalAmount).toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);

export default function OrdersPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      void router.push('/sign-in');
      return;
    }

    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json() as Order[];
        console.log('Fetched orders:', data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchOrders();
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Past Orders</h1>
            <p className="text-gray-500 mt-1">View and track your orders</p>
          </div>
          <div className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
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
