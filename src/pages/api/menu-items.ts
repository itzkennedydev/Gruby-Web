import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { userSyncMiddleware } from '@/middleware/userSync';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const { chef_id } = req.query;

    if (!chef_id) {
      return res.status(400).json({ message: 'Chef ID is required' });
    }

    try {
      const items = await db
        .select()
        .from(products)
        .where(eq(products.chefId, String(chef_id)));

      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ message: 'Failed to fetch menu items' });
    }
  } else if (method === 'POST') {
    const { name, price, description, image_url, chef_id } = req.body;

    if (!name || price === undefined || !chef_id) {
      return res.status(400).json({ message: 'Name, price, and chef ID are required' });
    }

    try {
      await db.insert(products).values({
        id: `prod_${Date.now()}`,
        name,
        price,
        description,
        imageUrl: image_url,
        chefId: chef_id,
      });

      res.status(200).json({ message: 'Menu item added successfully' });
    } catch (error) {
      console.error('Error adding menu item:', error);
      res.status(500).json({ message: 'Failed to add menu item' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default userSyncMiddleware(handler);
