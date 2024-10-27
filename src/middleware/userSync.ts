// middleware/userSync.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { db } from '@/db/db';
import { users as usersSchema } from '@/db/schema'; // Import the schema correctly
import { getAuth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export const userSyncMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get authenticated user ID from Clerk
      const { userId } = getAuth(req);

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Check if the user already exists in the database
      const existingUser = await db
        .select()
        .from(usersSchema)
        .where(eq((usersSchema as any).user_id, userId)); // Cast to any to bypass type error

      if (existingUser.length === 0) {
        // If the user doesn't exist, fetch user data from Clerk
        const clerkResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        });

        if (!clerkResponse.ok) {
          console.error('Failed to fetch user data from Clerk:', clerkResponse.statusText);
          return res.status(500).json({ message: 'Failed to synchronize user data' });
        }

        const clerkUser = await clerkResponse.json();

        // Prepare user data for insertion into the database
        const email = clerkUser.email_addresses[0]?.email_address || '';
        const firstName = clerkUser.first_name || '';
        const lastName = clerkUser.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim();

        // Insert the user into the database, ensuring user_id is not null
        await db.insert(usersSchema).values({
          id: clerkUser.id, // Use Clerk's user ID here
          email,
          name: fullName,
          avatarUrl: clerkUser.profile_image_url || '', // Handle missing avatar URL
        });

        console.log(`New user ${fullName} synced from Clerk`);
      }
      // Proceed to the next handler
      return handler(req, res);

    } catch (error) {
      console.error('Error in user synchronization:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

