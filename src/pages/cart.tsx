import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart, CartItem } from '@/contexts/CartContext';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  console.log('Current cart state:', cartItems);

  const subtotal = cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.15;
  const paymentFee = subtotal * 0.029 + 0.30;
  const taxes = subtotal * 0.08;
  const totalPrice = subtotal + serviceFee + paymentFee + taxes;

  const handleCheckout = async (): Promise<void> => {
    console.log('Proceeding to checkout');
    await router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md w-full">
          <ShoppingBag className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 px-4">Looks like you haven&apos;t added anything to your cart yet.</p>
          <div className="flex justify-center">
            <Link href="/">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl min-h-[60vh]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
      <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart ({cartItems.length})</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        <div className="lg:col-span-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 sm:py-6 border-b border-gray-100 last:border-0"
                >
                  <Link href={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
                      <Image
                        src={item.imageUrl || "https://via.placeholder.com/150"}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                      />
                    </div>
                  </Link>

                  <div className="flex-grow space-y-1">
                    <Link href={`/product/${item.id}`}>
                      <h2 className="text-base sm:text-lg font-semibold hover:text-blue-600 transition-colors">
                        {item.name}
                      </h2>
                    </Link>
                    <p className="text-xl sm:text-2xl font-bold">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto justify-between">
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

        <div className="lg:col-span-4 sticky top-4">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Payment Fee</span>
                  <span className="font-medium">${paymentFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">${taxes.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold">Total</span>
                    <span className="text-xl sm:text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6 h-10 sm:h-12 text-base sm:text-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <Alert className="mt-4">
                <AlertDescription className="text-xs sm:text-sm text-gray-600">
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