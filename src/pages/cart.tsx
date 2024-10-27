import React from 'react';
import { useCart, CartItem } from '@/contexts/CartContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce((total: number, item: CartItem) => {
    return total + item.price * item.quantity;
  }, 0);

  const serviceFee = subtotal * 0.15;
  const paymentHandlingFee = subtotal * 0.029 + 0.30;
  const taxRate = 0.08;
  const taxes = subtotal * taxRate;
  const totalPrice = subtotal + serviceFee + paymentHandlingFee + taxes;

  const handleCheckout = async (): Promise<void> => {
    console.log('Proceeding to checkout');
    await router.push('/checkout');
  };

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
                  key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 border-b border-gray-100 last:border-0"
                >
                  <Link href={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
                      <Image
                        src={item.imageUrl || '/images/placeholder.jpg'}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                      />
                    </div>
                  </Link>

                  <div className="flex-grow">
                    <Link href={`/product/${item.id}`}>
                      <h2 className="text-lg font-semibold hover:text-blue-600 transition-colors">
                        {item.name}
                      </h2>
                    </Link>
                    <p className="text-2xl font-bold mt-1">${Number(item.price).toFixed(2)}</p>
                    {item.selectedOptions && (
                      <p className="text-sm text-gray-500 mt-1">
                        {Object.entries(item.selectedOptions)
                          .map(([key, value]) => (
                            <span key={key} className="inline-block mr-3">
                              <span className="font-medium">{key}:</span> {value}
                            </span>
                          ))}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
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
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
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
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Fee</span>
                  <span className="font-medium">${paymentHandlingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">${taxes.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
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
