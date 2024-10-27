import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/db';
import { eq, and } from 'drizzle-orm';
import { orders, orderItems, type OrderItem } from '@/server/db/schema';
import { getAuth } from '@clerk/nextjs/server';

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
    const { cartItems } = req.body as { cartItems: OrderItem[] };

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ error: 'Invalid cart items format' });
    }

    console.log('Received cart items:', cartItems);

    // Validate cart items
    const validCartItems = cartItems.filter(item => item.productId && Number(item.quantity) > 0);
    if (validCartItems.length !== cartItems.length) {
      console.warn('Some cart items were invalid and have been removed');
    }

    await db.transaction(async (trx) => {
      console.log('Starting transaction');

      // Find existing cart order or create a new one
      let cartOrder = await trx
        .select()
        .from(orders)
        .where(and(eq(orders.user_id, userId), eq(orders.status, 'cart')))
        .limit(1)
        .then(results => results[0]);

      if (!cartOrder) {
        [cartOrder] = await trx
          .insert(orders)
          .values({
            user_id: userId,
            status: 'cart',
            total: '0',
          })
          .returning();
      }

      console.log('Cart order:', cartOrder);

      if (!cartOrder) {
        throw new Error('Failed to create or find cart order');
      }

      // Delete existing cart items
      const deleteResult = await trx
        .delete(orderItems)
        .where(eq(orderItems.orderId, cartOrder.id));
      console.log('Delete result:', deleteResult);

      // Insert new cart items
      for (const item of validCartItems) {
        const insertResult = await trx.insert(orderItems).values({
          orderId: cartOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price.toString(),
        });
        console.log('Insert result:', insertResult);
      }

      // Update the total price of the order
      const total = validCartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
      const updateResult = await trx
        .update(orders)
        .set({ total: total.toString(), updatedAt: new Date() })
        .where(eq(orders.id, cartOrder.id));
      console.log('Update result:', updateResult);
    });

    res.status(200).json({ message: 'Cart synced successfully' });
  } catch (error) {
    console.error('Error syncing cart:', error);
    res.status(500).json({ error: 'Error syncing cart', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
