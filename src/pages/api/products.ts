import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db'; 
import { products } from '@/server/db/schema'; 

interface ProductRequestBody {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  homeCookId: string;
}

// Define the handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, price, imageUrl, homeCookId } = req.body as ProductRequestBody;

    // Validate required fields
    if (!name || typeof price !== 'number' || !homeCookId) {
      return res.status(400).json({ error: 'Name, price, and homeCookId are required' });
    }

    try {
      // Insert the product into the database
      await db.insert(products).values({
        name,
        description: description ?? null,
        price: price.toFixed(2),
        imageUrl: imageUrl ?? null,
        homeCookId,
      });

      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }

  } else if (req.method === 'GET') {
    try {
      // Fetch all products from the database
      const allProducts = await db.select().from(products);

      res.status(200).json(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
