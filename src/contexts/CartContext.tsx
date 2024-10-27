'use client';

import React, { 
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Context
} from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext: Context<CartContextType | null> = createContext<CartContextType | null>(null);

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        const newCart = [...prevCart];
        const existingItem = newCart[existingItemIndex];
        
        if (existingItem) {
          newCart[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1
          };
        }
        
        return newCart;
      }
      
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      return prevCart.reduce<CartItem[]>((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}