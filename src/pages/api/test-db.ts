// pages/api/test-db.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { users, type User } from '~/server/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const testUser: Omit<User, 'createdAt' | 'updatedAt'> = {
            id: `test-user-${Date.now()}`,
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
        };

        const result = await db.insert(users).values(testUser);
        console.log('Test user insert result:', result);

        res.status(200).json({ message: 'Test user inserted successfully', userId: testUser.id });
    } catch (error) {
        console.error('Error inserting test user:', error);
        res.status(500).json({ message: 'Error inserting test user' });
    }
}