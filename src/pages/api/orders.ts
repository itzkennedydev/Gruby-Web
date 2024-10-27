import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/db/db';
import { orders, orderItems, products } from '@/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    console.log('Fetching completed orders for user:', userId);

    const userOrders = await db
      .select({
        id: orders.id,
        createdAt: orders.createdAt,
        totalAmount: orders.total,
        status: orders.status,
      })
      .from(orders)
      .where(
        and(
          eq(orders.user_id, userId),
          eq(orders.status, 'completed')
        )
      )
      .orderBy(desc(orders.createdAt));

    console.log('User completed orders:', userOrders);

    const ordersWithItems = await Promise.all(
      userOrders.map(async (order) => {
        const items = await db
          .select({
            name: products.name,
            quantity: orderItems.quantity,
            price: orderItems.price,
            imageUrl: products.imageUrl,
          })
          .from(orderItems)
          .innerJoin(products, eq(orderItems.productId, products.id))
          .where(eq(orderItems.orderId, order.id));

        console.log(`Items for order ${order.id}:`, items);

        return {
          ...order,
          id: order.id.toString(), // Ensure id is a string
          items: items.map(item => ({
            ...item,
            price: parseFloat(item.price).toFixed(2),
            quantity: Number(item.quantity)
          })),
          totalAmount: parseFloat(order.totalAmount).toFixed(2)
        };
      })
    );

    console.log('Completed orders with items:', ordersWithItems);

    res.status(200).json(ordersWithItems);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
}
