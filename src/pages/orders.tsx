import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  createdAt: string;
  totalAmount: string;
  status: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order #{order.id.slice(0, 8)}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Status: {order.status}</p>
                <p className="text-sm font-medium text-gray-500">Total: ${order.totalAmount}</p>
              </div>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
