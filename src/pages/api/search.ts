import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { chefs, products } from '@/db/schema';
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

interface ChefRow {
  id: string;
  name: string;
  avatarUrl: string;
  rating: string;
}

interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

function isChefRow(row: unknown): row is ChefRow {
  return (
    typeof row === 'object' &&
    row !== null &&
    'id' in row &&
    'name' in row &&
    'avatarUrl' in row &&
    'rating' in row
  );
}

function isProductRow(row: unknown): row is ProductRow {
  return (
    typeof row === 'object' &&
    row !== null &&
    'id' in row &&
    'name' in row &&
    'description' in row &&
    'price' in row &&
    'imageUrl' in row
  );
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
      chefs: chefResults.rows.filter(isChefRow).map(row => ({
        id: row.id as string, // Cast to string
        name: row.name as string, // Cast to string
        avatarUrl: row.avatarUrl as string, // Cast to string
        rating: Number(row.rating),
      })),
      dishes: dishResults.rows.filter(isProductRow).map(row => ({
        id: row.id as string, // Cast to string
        name: row.name as string, // Cast to string
        description: row.description as string, // Cast to string
        price: Number(row.price),
        imageUrl: row.imageUrl as string, // Cast to string
      })),
    };

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
}
