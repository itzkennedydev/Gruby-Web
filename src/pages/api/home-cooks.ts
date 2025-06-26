import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { homeCooks } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all home cooks from the database
      const allHomeCooks = await db.select().from(homeCooks);

      // Respond with the list of home cooks
      res.status(200).json(allHomeCooks);
    } catch (error) {
      console.error('Error fetching home cooks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, bio, cuisine, experience, avatarUrl, coverImageUrl } = req.body;
      
      // Validate required fields
      if (!name || !cuisine || !experience) {
        return res.status(400).json({ error: 'Name, cuisine, and experience are required' });
      }

      // Insert new home cook
      const newHomeCook = await db.insert(homeCooks).values({
        name,
        bio,
        cuisine,
        experience,
        avatarUrl,
        coverImage: coverImageUrl,
      }).returning();

      res.status(201).json(newHomeCook[0]);
    } catch (error) {
      console.error('Error creating home cook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Return a 405 error for unsupported methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
