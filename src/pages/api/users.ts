import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const allUsers = await db.select().from(users);
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}