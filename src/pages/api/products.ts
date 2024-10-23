// pages/api/products.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db'; // Adjust the import based on your setup
import { products } from '../../db/schema';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, description, price, imageUrl, chefId } = req.body;

    try {
      await db.insert(products).values({
        name,
        description,
        price,
        imageUrl,
        chefId,
      });

      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  } else if (req.method === 'GET') {
    // We'll handle GET requests next
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
