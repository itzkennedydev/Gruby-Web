import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { orders, orderItems, products } from '@/server/db/schema';
import { eq, desc, SQL } from 'drizzle-orm';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

interface ProcessedOrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface ProcessedOrder {
  id: string;
  createdAt: string;
  totalAmount: string;
  status: string;
  items: ProcessedOrderItem[];
}

interface UserOrderRow {
  orderId: string;
  createdAt: Date;
  total: string;
  status: string;
  productName: string | null;
  quantity: string | null;
  price: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const userOrders: UserOrderRow[] = await db
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
        .where(eq(orders.user_id, userId))
        .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
        .leftJoin(products, eq(orderItems.productId, products.id))
        .orderBy(desc(orders.createdAt));

      const processedOrders: ProcessedOrder[] = userOrders.reduce((acc, order) => {
        const existingOrder = acc.find(o => o.id === order.orderId);
        const orderItem: ProcessedOrderItem = {
          name: order.productName ?? 'Unknown Product',
          quantity: parseInt(order.quantity ?? '0', 10),
          price: order.price ?? '0',
        };

        if (existingOrder) {
          existingOrder.items.push(orderItem);
        } else {
          acc.push({
            id: order.orderId,
            createdAt: order.createdAt.toISOString(),
            totalAmount: order.total,
            status: order.status,
            items: [orderItem],
          });
        }
        return acc;
      }, [] as ProcessedOrder[]);

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
      const { sessionId } = req.body as { sessionId: string };

      if (!sessionId || typeof sessionId !== 'string') {
        return res.status(400).json({ message: 'Session ID is required and must be a string' });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (!session.amount_total) {
        throw new Error('Stripe session missing amount_total');
      }

      const [order] = await db.insert(orders).values({
        user_id: userId,
        status: 'completed',
        total: (session.amount_total / 100).toFixed(2),
      }).returning();

      if (!order) {
        throw new Error('Failed to create order');
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

      for (const item of lineItems.data) {
        const productId = item.price?.product as string | undefined;
        const quantity = item.quantity ?? 1;
        const price = item.price?.unit_amount;

        if (!productId || typeof price === 'undefined') {
          console.warn('Missing productId or price for line item:', item);
          continue;
        }

        await db.insert(orderItems).values({
          orderId: order.id,
          productId: productId,
          quantity: quantity.toString(),
          price: price !== null ? (price / 100).toFixed(2) : '0.00',
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
