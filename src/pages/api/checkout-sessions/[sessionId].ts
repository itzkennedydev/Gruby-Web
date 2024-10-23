import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { sessionId } = req.query

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId as string, {
        expand: ['line_items', 'customer_details'],
      })
      res.status(200).json(session)
    } catch (err) {
      console.error('Error retrieving session:', err)
      res.status(500).json({ statusCode: 500, message: 'Error retrieving session' })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
