import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { orders, orderItems, products } from '@/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

interface ProcessedOrder {
  id: string;
  createdAt: string;
  totalAmount: string;
  status: string;
  items: {
    name: string;
    quantity: number;
    price: string;
  }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const userOrders = await db
        .select({
          orderId: orders.id,
          createdAt: orders.createdAt,
          total: orders.total,
          status: orders.status,
          productName: products.name,
          quantity: orderItems.quantity,
          price: orderItems.price,
        })
        .from(orders)
        .where(eq(orders.userId, userId))
        .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
        .leftJoin(products, eq(orderItems.productId, products.id))
        .orderBy(desc(orders.createdAt));

      const processedOrders = userOrders.reduce((acc: ProcessedOrder[], order) => {
        const existingOrder = acc.find(o => o.id === order.orderId);
        if (existingOrder) {
          existingOrder.items.push({
            name: order.productName ?? 'Unknown Product',
            quantity: order.quantity ?? 0,
            price: order.price?.toString() ?? '0',
          });
        } else {
          acc.push({
            id: order.orderId,
            createdAt: order.createdAt.toISOString(),
            totalAmount: order.total.toString(),
            status: order.status,
            items: [{
              name: order.productName ?? 'Unknown Product',
              quantity: order.quantity ?? 0,
              price: order.price?.toString() ?? '0',
            }],
          });
        }
        return acc;
      }, []);

      if (processedOrders.length === 0) {
        console.log('No orders found for user:', userId);
      }

      res.status(200).json(processedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { sessionId } = req.body;

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const [order] = await db.insert(orders).values({
        userId: userId,
        status: 'completed',
        total: session.amount_total! / 100, // Convert from cents to dollars
      }).returning();

      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
      for (const item of lineItems.data) {
        await db.insert(orderItems).values({
          orderId: order.id,
          productId: item.price!.product as string,
          quantity: item.quantity!,
          price: item.price!.unit_amount! / 100, // Convert from cents to dollars
        });
      }

      res.status(200).json({ message: 'Order created successfully', orderId: order.id });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end('Method Not Allowed');
  }
}
