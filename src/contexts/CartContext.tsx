import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  selectedOptions?: Record<string, string>;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const storedItems = localStorage.getItem('cartItems');
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          if (Array.isArray(parsedItems)) {
            setCartItems(parsedItems as CartItem[]);
          } else {
            console.error('Stored cart items are not in the expected format');
            setCartItems([]);
          }
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems'); // Clear localStorage if the cart is empty
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        const newQuantity = Number(existingItem.quantity) + Number(item.quantity);
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
      }

      const validPrice = Number(item.price) || 0;
      const validQuantity = Number(item.quantity) || 1;
      return [...prevItems, { ...item, price: validPrice, quantity: validQuantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const newQuantity = Number(quantity) > 0 ? Number(quantity) : 1;
        return item.id === id ? { ...item, quantity: newQuantity } : item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
