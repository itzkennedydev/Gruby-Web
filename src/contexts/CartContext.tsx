'use client'

import * as React from 'react'
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

type CartProviderProps = {
  children: ReactNode
}

const defaultCartContext: CartContextType = {
  cart: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFromCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearCart: () => {}
}

const CartContext = createContext(defaultCartContext)

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
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
  }, [])

  const removeFromCart = useCallback((id: string) => {
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
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart
    }),
    [cart, addToCart, removeFromCart, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export type { CartItem, CartContextType }