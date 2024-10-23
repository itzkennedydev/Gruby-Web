import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { getAuth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export const userSyncMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user exists in the database
    const existingUser = await db.select().from(users).where(eq(users.id, userId));

    if (existingUser.length === 0) {
      // Fetch user data from Clerk
      const clerkResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });

      if (!clerkResponse.ok) {
        console.error('Failed to fetch user data from Clerk');
        return res.status(500).json({ message: 'Failed to synchronize user data' });
      }

      const clerkUser = await clerkResponse.json();

      // Insert user into the database
      await db.insert(users).values({
        id: clerkUser.id,
        email: clerkUser.email_addresses[0]?.email_address || '',
        name: `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim(),
        avatarUrl: clerkUser.profile_image_url,
      });
    }

    // Proceed to the next handler
    return handler(req, res);
  };
};
