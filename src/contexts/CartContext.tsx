"use client"

import * as React from "react"
import { type ReactNode, createContext, useCallback, useContext, useMemo, useState, useEffect } from "react"
import type { CartItem } from "@/types/CartItem"

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

type CartProviderProps = {
  children: ReactNode
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart(): CartContextType {
  const context = useContext(CartContext)

  if (context === undefined) {
    // Return a safe default during SSR or when context is not available
    return {
      cartItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
    }
  }

  return context
}

export function CartProvider({
  children,
}: CartProviderProps): JSX.Element {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return
    
    console.log('Saving cart to localStorage:', cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems, isClient]);

  const addToCart = useCallback((item: CartItem) => {
    console.log('Adding item to cart:', item);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        const updatedItems = prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
        console.log('Updated cart after adding:', updatedItems);
        return updatedItems;
      }

      const newItems = [...prevItems, { ...item, quantity: 1 }];
      console.log('New cart after adding:', newItems);
      return newItems;
    })
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    console.log('Removing item from cart:', itemId);
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      console.log('Updated cart after removing:', updatedItems);
      return updatedItems;
    })
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    console.log('Updating quantity:', itemId, quantity);
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
      console.log('Updated cart after quantity change:', updatedItems);
      return updatedItems;
    })
  }, [])

  const clearCart = useCallback(() => {
    console.log('Clearing cart');
    setCartItems([])
  }, [])

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
