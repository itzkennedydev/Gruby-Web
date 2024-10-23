'use client' // Added 'use client' directive at the top

import React, { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

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

  // Calculate the subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate fees and taxes
  const serviceFee = subtotal * 0.15;
  const paymentHandlingFee = subtotal * 0.029 + 0.30;
  const taxRate = 0.08; // Assuming 8% tax rate, adjust as needed
  const taxes = subtotal * taxRate;

  // Calculate the total price
  const totalPrice = subtotal + serviceFee + paymentHandlingFee + taxes;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center mb-4 border-b pb-4">
            <div className="w-16 h-16 relative mr-4">
              <Image
                src={item.imageUrl || '/placeholder-image.jpg'} // Provide a fallback image
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="mt-4 space-y-2">
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
            {isLoading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const { user } = useUser();
  const [clientSecret, setClientSecret] = useState('')
  const { cartItems } = useCart()

  useEffect(() => {
    // Calculate all fees and total price
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const serviceFee = subtotal * 0.15;
    const paymentHandlingFee = subtotal * 0.029 + 0.30;
    const taxRate = 0.08;
    const taxes = subtotal * taxRate;
    const totalPrice = subtotal + serviceFee + paymentHandlingFee + taxes;

    // Create PaymentIntent with the total price including all fees
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        items: cartItems,
        totalAmount: Math.round(totalPrice * 100), // Convert to cents for Stripe
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          console.error("Failed to create PaymentIntent")
        }
      })
      .catch((err) => console.error("Error in PaymentIntent:", err))
  }, [cartItems])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  const handleCheckout = async () => {
    if (!user) {
      // Handle the case where the user is not logged in
      return;
    }

    const response = await fetch('/api/checkout-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        userId: user.id, // Pass the user ID to the checkout session
      }),
    });

    // ... rest of the checkout logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  )
}
