import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '~/contexts/CartContext';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const { cartItems, removeFromCart } = useCart();

  useEffect(() => {
    if (session_id) {
      // Clear the cart
      cartItems.forEach(item => removeFromCart(item.id));
      setStatus('success');
    }
  }, [session_id, cartItems, removeFromCart]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Processing your order...</h2>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <XCircle className="mx-auto text-red-500 h-16 w-16 mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">We couldn&apos;t process your order. Please try again or contact support.</p>
          <Link href="/cart">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Return to Cart</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <CheckCircle className="mx-auto text-green-500 h-16 w-16 mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Thank you for your order!</h1>
        <p className="text-gray-600 mb-2">Your order has been successfully processed.</p>
        <p className="text-sm text-gray-500 mb-6">Order ID: {session_id}</p>
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Continue Shopping</Button>
          </Link>
          <Link href="/orders">
            <Button variant="outline" className="w-full">View Order History</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
