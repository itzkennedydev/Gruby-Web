import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export const CartIndicator: React.FC = () => {
  const { cartItems } = useCart();

  // Calculate total quantity and group items by ID
  const itemGroups = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        name: item.name,
        quantity: 0
      };
    }
    acc[item.id].quantity += item.quantity;
    return acc;
  }, {} as Record<string, { name: string, quantity: number }>);

  const totalItems = Object.values(itemGroups).reduce((sum, group) => sum + group.quantity, 0);

  return (
    <Link href="/cart" passHref>
      <div className="relative cursor-pointer group">
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <div className="absolute -top-3 -right-3 flex flex-col items-center">
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs min-w-[20px] text-center">
              {totalItems}
            </span>
            <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 top-8 right-0 w-max">
              {Object.values(itemGroups).map(({ name, quantity }) => (
                <div key={name} className="whitespace-nowrap">
                  {name} × {quantity}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
