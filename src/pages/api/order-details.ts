// pages/api/order-details.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-09-30.acacia' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { payment_intent } = req.query;
  if (!payment_intent || typeof payment_intent !== 'string') {
    return res.status(400).json({ message: 'Missing or invalid payment_intent parameter' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent, {
      expand: ['customer', 'invoice.lines.data'],
    });

    const orderDetails = {
      customer_details: {
        email: paymentIntent.receipt_email ?? (paymentIntent.customer as Stripe.Customer | null)?.email ?? undefined,
        name: (paymentIntent.customer as Stripe.Customer | null)?.name ?? undefined,
      },
      items: paymentIntent.invoice && typeof paymentIntent.invoice === 'object' && paymentIntent.invoice.lines.data
        ? paymentIntent.invoice.lines.data.map(item => ({
            name: item.description ?? 'Unknown item',
            quantity: item.quantity ?? 0,
            price: ((item.amount ?? 0) / 100).toFixed(2),
          }))
        : [],
      total_amount: (paymentIntent.amount / 100).toFixed(2),
    };

    res.status(200).json(orderDetails);
  } catch (error: unknown) { // Specify the type as unknown
    res.status(500).json({ message: 'Error retrieving order details', error: (error as Error).message });
  }
}
