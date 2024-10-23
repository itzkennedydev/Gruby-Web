import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }

  const { payment_intent } = req.query

  if (!payment_intent || typeof payment_intent !== 'string') {
    return res.status(400).json({ statusCode: 400, message: 'Payment Intent ID is required' })
  }

  try {
    console.log('Retrieving payment intent:', payment_intent)
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent)

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ statusCode: 400, message: 'Payment has not been completed successfully' })
    }

    console.log('Payment intent retrieved:', paymentIntent)

    const sessions = await stripe.checkout.sessions.list({
      payment_intent: paymentIntent.id,
      limit: 1,
    })

    if (sessions.data.length === 0) {
      console.warn('No Checkout Session found for PaymentIntent:', paymentIntent.id)
      // Fallback to sending paymentIntent details if no session exists
      return res.status(200).json({
        id: paymentIntent.id,
        amount_total: paymentIntent.amount,
        customer_details: paymentIntent.customer ? await stripe.customers.retrieve(paymentIntent.customer as string) : null,
        payment_status: paymentIntent.status,
        created: paymentIntent.created,
      })
    }

    const session = sessions.data[0]

    console.log('Checkout session retrieved successfully:', session)

    res.status(200).json({
      id: session.id,
      amount_total: session.amount_total,
      customer_details: session.customer_details,
      payment_status: session.payment_status,
      created: session.created,
    })
  } catch (err) {
    console.error('Error retrieving order details:', err)

    const errorResponse: {
      statusCode: number;
      message: string;
      details?: string;
    } = {
      statusCode: 500,
      message: 'Internal Server Error',
    }

    if (err instanceof Stripe.errors.StripeError) {
      errorResponse.statusCode = err.statusCode ?? 500
      errorResponse.message = err.message
      errorResponse.details = err.raw?.message
    } else if (err instanceof Error) {
      errorResponse.message = err.message
    }

    res.status(errorResponse.statusCode).json(errorResponse)
  }
}
