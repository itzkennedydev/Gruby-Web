import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    void fetchCart();
  }, []);

  const updateCart = async (newCart: CartItem[]) => {
    try {
      await axios.put('/api/cart', newCart);
      setCartItems(newCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    const newCart = [...cartItems];
    const existingItem = newCart.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    await updateCart(newCart);
  };

  const removeFromCart = async (id: string) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    await updateCart(newCart);
  };

  const updateQuantity = async (id: string, quantity: number) => {
    const newCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter((item) => item.quantity > 0);
    await updateCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
