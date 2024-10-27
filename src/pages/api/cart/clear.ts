import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/db';
import { eq, and } from 'drizzle-orm';
import { orders, orderItems } from '@/server/db/schema';
import { getAuth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Processing order for user:', userId);

    // Begin transaction
    await db.transaction(async (trx) => {
      // Find the cart order
      const cartOrder = await trx
        .select()
        .from(orders)
        .where(and(eq(orders.user_id, userId), eq(orders.status, 'cart')))
        .limit(1)
        .then(results => results[0]);

      if (!cartOrder) {
        console.log('No cart order found for user');
        return res.status(404).json({ error: 'No cart order found' });
      }

      console.log('Found cart order:', cartOrder.id);

      // Process the payment using Stripe
      const orderProcessingSuccess = await processPaymentWithStripe({
        id: cartOrder.id,
        user_id: cartOrder.user_id,
        total: parseFloat(cartOrder.total),
        status: cartOrder.status,
      });

      if (!orderProcessingSuccess) {
        console.log('Order processing failed');
        return res.status(500).json({ error: 'Order processing failed' });
      }

      console.log('Order processed successfully, clearing cart');

      // Delete cart items
      const deleteItemsResult = await trx
        .delete(orderItems)
        .where(eq(orderItems.orderId, cartOrder.id));
      console.log('Deleted cart items:', deleteItemsResult);

      // Update the cart order status to 'completed'
      const updateOrderResult = await trx
        .update(orders)
        .set({ status: 'completed', updatedAt: new Date() })
        .where(eq(orders.id, cartOrder.id));
      console.log('Updated cart order:', updateOrderResult);
    });

    console.log('Order completed and cart cleared successfully');
    res.status(200).json({ message: 'Order completed and cart cleared successfully' });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Error processing order', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}

// Function to process payment with Stripe
async function processPaymentWithStripe(cartOrder: Order): Promise<boolean> {
  try {
    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(cartOrder.total * 100), // Stripe accepts amounts in cents, so multiply by 100 and round
      currency: 'usd', // Set your desired currency
      payment_method_types: ['card'], // Adjust payment methods based on your needs
      metadata: {
        orderId: cartOrder.id,
        userId: cartOrder.user_id,
      },
    });

    // Confirm the payment using the PaymentIntent
    if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded');
      return true;
    } else {
      console.log(`Payment failed with status: ${paymentIntent.status}`);
      return false;
    }
  } catch (error) {
    console.error('Error processing payment with Stripe:', error);
    return false;
  }
}

// Define the Order interface
interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
}
