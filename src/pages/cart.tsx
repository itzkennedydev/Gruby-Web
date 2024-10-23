import React from 'react';
import { useCart, CartItem } from '@/contexts/CartContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  const serviceFee = subtotal * 0.15;
  const paymentHandlingFee = subtotal * 0.029 + 0.30;
  const taxRate = 0.08; // Assuming 8% tax rate, adjust as needed
  const taxes = subtotal * taxRate;

  const totalPrice = subtotal + serviceFee + paymentHandlingFee + taxes;

  const handleCheckout = async (): Promise<void> => {
    console.log('Proceeding to checkout');
    await router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-xl">Your cart is empty.</p>
        <Link href="/">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.map((item: CartItem) => (
        <div
          key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
          className="flex items-center border-b border-gray-200 py-4"
        >
          <Link href={`/product/${item.id}`} className="flex-shrink-0">
            <div className="w-24 h-24 relative">
              <Image
                src={item.imageUrl}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded cursor-pointer"
              />
            </div>
          </Link>
          <div className="ml-4 flex-grow">
            <Link href={`/product/${item.id}`} className="hover:underline">
              <h2 className="text-xl font-semibold cursor-pointer">{item.name}</h2>
            </Link>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            {item.selectedOptions && (
              <p className="text-sm text-gray-500">
                {Object.entries(item.selectedOptions)
                  .map(([key, value]: [string, string]) => `${key}: ${value}`)
                  .join(', ')}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="mr-2"
            >
              +
            </Button>
            <span className="mx-2">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.id, item.quantity - 1);
                } else {
                  removeFromCart(item.id);
                }
              }}
              className="ml-2"
            >
              -
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ml-4 text-[#000000]"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="mt-8 space-y-2">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Subtotal:</h3>
          <p className="font-semibold">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Service Fee:</h3>
          <p className="font-semibold">${serviceFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Payment Handling Fee:</h3>
          <p className="font-semibold">${paymentHandlingFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Taxes:</h3>
          <p className="font-semibold">${taxes.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <h3 className="text-xl font-semibold">Total:</h3>
          <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <Button onClick={handleCheckout}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
