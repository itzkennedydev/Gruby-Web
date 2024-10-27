import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { chefs, products } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

interface Chef {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface SearchResults {
  chefs: Chef[];
  dishes: Product[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({ error: 'Search query is required and must be a non-empty string' });
  }

  const searchTerm = `%${q.trim().toLowerCase()}%`;

  if (q.length < 2) {
    return res.status(400).json({ error: 'Search query must be at least 2 characters long' });
  }

  try {
    const chefResults = await db.execute(sql`
      SELECT c.id, c.name, c."avatarUrl", 
             COALESCE((SELECT AVG(rating) FROM reviews WHERE "chefId" = c.id), 0) as rating
      FROM ${chefs} c
      WHERE LOWER(c.name) LIKE ${searchTerm}
    `);

    const dishResults = await db.execute(sql`
      SELECT id, name, description, price, "imageUrl"
      FROM ${products}
      WHERE LOWER(name) LIKE ${searchTerm} OR LOWER(description) LIKE ${searchTerm}
    `);

    const results: SearchResults = {
      chefs: chefResults.rows.map(row => ({
        id: row.id,
        name: row.name,
        avatarUrl: row.avatarUrl,
        rating: Number(row.rating),
      })),
      dishes: dishResults.rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: Number(row.price),
        imageUrl: row.imageUrl,
      })),
    };

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
}
