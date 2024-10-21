import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { chefs } from '@/server/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allChefs = await db.select().from(chefs);
      res.status(200).json(allChefs);
    } catch (error) {
      console.error('Error fetching chefs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
