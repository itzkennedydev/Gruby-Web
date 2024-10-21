import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { eq } from 'drizzle-orm';
import { cart, type Cart } from '~/server/db/schema';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const cartItems = await db.select().from(cart).where(eq(cart.userId, userId));
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Error fetching cart items' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedCart = req.body as Cart[];
      
      await db.transaction(async (trx) => {
        await trx.delete(cart).where(eq(cart.userId, userId));
        
        for (const item of updatedCart) {
          await trx.insert(cart).values({
            ...item,
            userId,
          });
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
