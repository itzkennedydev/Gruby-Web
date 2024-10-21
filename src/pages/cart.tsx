import React from 'react';
import { useCart } from '~/contexts/CartContext';
import Image from 'next/image';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Proceeding to checkout');
    void router.push('/checkout');
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
      {cartItems.map((item) => (
        <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex items-center border-b border-gray-200 py-4">
          <Link href={`/product/${item.id}`} className="flex-shrink-0">
            <Image 
              src={item.image} 
              alt={item.name} 
              width={100} 
              height={100} 
              className="object-cover rounded cursor-pointer"
            />
          </Link>
          <div className="ml-4 flex-grow">
            <Link href={`/product/${item.id}`} className="hover:underline">
              <h2 className="text-xl font-semibold cursor-pointer">{item.name}</h2>
            </Link>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              {Object.entries(item.selectedOptions).map(([key, value]) => (
                `${key}: ${value}`
              )).join(', ')}
            </p>
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
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
        <div className="mt-4 flex space-x-4">
          <Button onClick={handleCheckout}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
