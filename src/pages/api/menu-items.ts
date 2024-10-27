import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { userSyncMiddleware } from '@/middleware/userSync';
import { v4 as uuidv4 } from 'uuid'; 

interface PostRequestBody {
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  chef_id: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Handle GET requests
  if (method === 'GET') {
    const { chef_id } = req.query;

    // Validate that chef_id is provided
    if (!chef_id || typeof chef_id !== 'string') {
      return res.status(400).json({ message: 'Chef ID is required and must be a string' });
    }

    try {
      // Fetch all products for the given chef_id
      const items = await db
        .select()
        .from(products)
        .where(eq(products.chefId, chef_id));

      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ message: 'Failed to fetch menu items' });
    }

  // Handle POST requests
  } else if (method === 'POST') {
    const { name, price, description, image_url, chef_id } = req.body as PostRequestBody;

    // Validate required fields
    if (!name || typeof price !== 'number' || price < 0 || !chef_id) {
      return res.status(400).json({ message: 'Name, price, and chef ID are required, and price must be a non-negative number.' });
    }

    try {
      // Insert the new product into the database
      await db.insert(products).values({
        id: `prod_${uuidv4()}`, // Use UUID for a unique product ID
        name,
        price: price.toFixed(2), // Convert price to string with 2 decimal places
        description: description ?? null,
        imageUrl: image_url ?? null,
        chefId: chef_id,
      });

      res.status(201).json({ message: 'Menu item added successfully' });
    } catch (error) {
      console.error('Error adding menu item:', error);
      res.status(500).json({ message: 'Failed to add menu item' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default userSyncMiddleware(handler);
