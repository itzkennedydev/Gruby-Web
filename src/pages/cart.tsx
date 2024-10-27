import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CartItem {
  orderId: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data: CartItem[] = await response.json();
        // Ensure price is a number
        const parsedData = data.map(item => ({
          ...item,
          price: Number(item.price)
        }));
        setCartItems(parsedData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const serviceFee = subtotal * 0.15;
  const paymentFee = subtotal * 0.029 + 0.30;
  const taxes = subtotal * 0.08;
  const totalPrice = subtotal + serviceFee + paymentFee + taxes;

  const handleCheckout = async (): Promise<void> => {
    console.log('Proceeding to checkout');
    await router.push('/checkout');
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    await updateCart(updatedCartItems);
  };

  const handleRemoveItem = async (productId: string) => {
    const updatedCartItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCartItems);
    await updateCart(updatedCartItems);
  };

  const updateCart = async (updatedCartItems: CartItem[]) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCartItems),
      });
      if (!response.ok) {
        throw new Error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="space-y-4">
          <div className="animate-pulse bg-gray-200 h-24 w-full rounded" />
          <div className="animate-pulse bg-gray-200 h-24 w-full rounded" />
          <div className="animate-pulse bg-gray-200 h-24 w-full rounded" />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart ({cartItems.length})</h1>
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 border-b border-gray-100 last:border-0"
                >
                  <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
                      <Image
                        src="https://via.placeholder.com/150"
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                      />
                    </div>
                  </Link>

                  <div className="flex-grow">
                    <Link href={`/product/${item.productId}`}>
                      <h2 className="text-lg font-semibold hover:text-blue-600 transition-colors">
                        {item.name}
                      </h2>
                    </Link>
                    <p className="text-2xl font-bold mt-1">${Number(item.price).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (item.quantity > 1) {
                            handleUpdateQuantity(item.productId, item.quantity - 1);
                          }
                        }}
                        className="px-2"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        className="px-2"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${Number(subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">${Number(serviceFee).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Fee</span>
                  <span className="font-medium">${Number(paymentFee).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">${Number(taxes).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold">${Number(totalPrice).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6 h-12 text-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <Alert className="mt-4">
                <AlertDescription className="text-sm text-gray-600">
                  Secure checkout powered by Stripe. Your payment information is encrypted.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
