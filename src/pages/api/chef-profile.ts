import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/db';
import { chefs } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const { id } = req.query;

    try {
      const chef = await db
        .select()
        .from(chefs)
        .where(eq(chefs.id, String(id)));

      if (chef.length === 0) {
        return res.status(404).json({ message: 'Chef not found' });
      }

      res.status(200).json(chef[0]);
    } catch (error) {
      console.error('Error fetching chef profile:', error);
      res.status(500).json({ message: 'Failed to fetch chef profile' });
    }
  } else if (method === 'PUT') {
    const { id, bannerUrl } = req.body;

    try {
      await db
        .update(chefs)
        .set({ bannerUrl })
        .where(eq(chefs.id, id));

      res.status(200).json({ message: 'Banner updated successfully' });
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Failed to update banner' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
