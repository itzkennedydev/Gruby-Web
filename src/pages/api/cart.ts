// api/cart.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/db';
import { eq, and } from 'drizzle-orm';
import { orders, orderItems, products } from '@/server/db/schema';
import type { OrderItem } from '@/server/db/schema';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // Fetch cart items
    try {
      const cartItems = await db
        .select({
          orderId: orders.id,
          productId: products.id,
          name: products.name, // Include the product name
          quantity: orderItems.quantity,
          price: orderItems.price,
        })
        .from(orders)
        .innerJoin(orderItems, eq(orders.id, orderItems.orderId))
        .innerJoin(products, eq(orderItems.productId, products.id))
        .where(
          and(
            eq(orders.user_id, userId),
            eq(orders.status, 'cart') // Only fetch cart orders
          )
        );
      
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Error fetching cart items' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedCart = req.body as OrderItem[];

      await db.transaction(async (trx) => {
        // Find or create the cart order for the user
        const [cartOrder] = await trx
          .select()
          .from(orders)
          .where(
            and(
              eq(orders.user_id, userId),
              eq(orders.status, 'cart')
            )
          )
          .limit(1);

        let orderId = cartOrder?.id;

        // If no cart order exists, create a new one
        if (!orderId) {
          const [newCartOrder] = await trx
            .insert(orders)
            .values({
              user_id: userId,
              status: 'cart',
              total: '0',
            })
            .returning();
          
          orderId = newCartOrder?.id;
        }

        if (orderId) {
          // Delete existing cart items
          await trx
            .delete(orderItems)
            .where(eq(orderItems.orderId, orderId));

          // Insert updated cart items
          for (const item of updatedCart) {
            await trx.insert(orderItems).values({
              orderId,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price.toString(), // Convert price to string
            });
          }

          // Calculate total price
          const total = updatedCart.reduce(
            (sum, item) => sum + (Number(item.price) * Number(item.quantity)),
            0
          );

          // Update order total
          await trx
            .update(orders)
            .set({ total: total.toString() })
            .where(eq(orders.id, orderId));
        }
      });

      res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ error: 'Error updating cart' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
