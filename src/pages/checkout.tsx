'use client'

import React, { useState, useEffect } from 'react'
import { useCart } from '~/contexts/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '~/components/ui/button'
import Image from 'next/image'

// Load Stripe outside of component render to avoid recreating Stripe object on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const { cartItems, clearCart } = useCart()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    })

    if (error) {
      console.error(error)
      // Show error to your customer
    } else {
      // Payment succeeded, clear the cart
      clearCart()
    }

    setIsLoading(false)
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center mb-4 border-b pb-4">
            <Image src={item.image} alt={item.name} width={50} height={50} className="object-cover rounded mr-4" />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <h3 className="text-xl font-semibold">Total:</h3>
          <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Button
            type="submit"
            disabled={!stripe || isLoading}
            className="w-full mt-4"
          >
            {isLoading ? 'Processing...' : 'Pay now'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('')
  const { cartItems } = useCart()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [cartItems])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
