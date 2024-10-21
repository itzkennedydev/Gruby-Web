import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStripe } from '@stripe/react-stripe-js'
import { Button } from '~/components/ui/button'
import Link from 'next/link'

export default function OrderConfirmation() {
  const stripe = useStripe()
  const router = useRouter()

  useEffect(() => {
    if (!stripe) {
      return
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (clientSecret) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            console.log('Payment succeeded!')
            break
          case 'processing':
            console.log('Your payment is processing.')
            break
          case 'requires_payment_method':
            console.log('Your payment was not successful, please try again.')
            break
          default:
            console.log('Something went wrong.')
            break
        }
      })
    }
  }, [stripe])

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Thank You for Your Order!</h1>
      <p className="mb-4">Your payment has been processed successfully.</p>
      <Link href="/">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  )
}
