import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { chefs } from '@/server/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all chefs from the database
      const allChefs = await db.select().from(chefs);

      // Respond with the list of chefs
      res.status(200).json(allChefs);
    } catch (error) {
      console.error('Error fetching chefs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Return a 405 error for unsupported methods
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
