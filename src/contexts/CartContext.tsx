'use client'

import React, { createContext, useContext, useState, type ReactNode, type Context } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

interface CartProviderProps {
  children: ReactNode
}

const initialContext: CartContextType = {
  cart: [],
  addToCart: () => {
    throw new Error('CartContext not initialized')
  },
  removeFromCart: () => {
    throw new Error('CartContext not initialized')
  },
  clearCart: () => {
    throw new Error('CartContext not initialized')
  }
}

const CartContext = createContext<CartContextType>(initialContext)

export function useCart(): CartContextType {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, 'quantity'>): void => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string): void => {
    setCart((prevCart) => {
      const itemToUpdate = prevCart.find((item) => item.id === id)

      if (!itemToUpdate) {
        return prevCart
      }

      if (itemToUpdate.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }

      return prevCart.filter((item) => item.id !== id)
    })
  }

  const clearCart = (): void => {
    setCart([])
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartContext }