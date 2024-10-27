import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/db';
import { chefs } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Handle GET requests
  if (method === 'GET') {
    const { id } = req.query;

    // Validate ID
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Chef ID is required and must be a string' });
    }

    try {
      // Fetch the chef by ID
      const chef = await db
        .select()
        .from(chefs)
        .where(eq(chefs.id, id));

      if (chef.length === 0) {
        return res.status(404).json({ message: 'Chef not found' });
      }

      res.status(200).json(chef[0]);
    } catch (error) {
      console.error('Error fetching chef profile:', error);
      res.status(500).json({ message: 'Failed to fetch chef profile' });
    }

  // Handle PUT requests
  } else if (method === 'PUT') {
    const { id, bannerUrl } = req.body as { id: string; bannerUrl: string };

    // Validate input
    if (!id || !bannerUrl || typeof id !== 'string' || typeof bannerUrl !== 'string') {
      return res.status(400).json({ message: 'Chef ID and bannerUrl are required and must be strings' });
    }

    try {
      // Update the chef's banner URL
      const updatedChef = await db
        .update(chefs)
        .set({ bannerUrl })
        .where(eq(chefs.id, id))
        .returning();

      if (updatedChef.length === 0) {
        return res.status(404).json({ message: 'Chef not found' });
      }

      res.status(200).json({ message: 'Banner updated successfully', chef: updatedChef[0] });
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Failed to update banner' });
    }

  // Handle unsupported methods
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
