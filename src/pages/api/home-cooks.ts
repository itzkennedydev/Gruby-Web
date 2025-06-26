import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/db';
import { homeCooks } from '@/db/schema';
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
      const { name, bio, cuisine, experience, avatarUrl, coverImageUrl, userId } = req.body;
      
      // Validate required fields
      if (!name || !cuisine || !experience || !userId) {
        return res.status(400).json({ error: 'Name, cuisine, experience, and userId are required' });
      }

      // Check for existing home cook for this user
      const existingHomeCook = await db.select()
        .from(homeCooks)
        .where(eq(homeCooks.userId, userId))
        .limit(1);

      if (existingHomeCook.length > 0) {
        const homeCook = existingHomeCook[0];
        
        // If they have a Stripe account and onboarding is complete, return error
        if (homeCook.stripeAccountId && homeCook.onboardingCompleted === 'true') {
          return res.status(409).json({ 
            error: 'You already have a complete home cook profile with payment processing set up',
            existingHomeCook: homeCook
          });
        }
        
        // If they have a profile but no Stripe account or incomplete onboarding, return existing profile
        return res.status(200).json({
          message: 'Continuing with existing profile',
          homeCook: homeCook,
          needsStripeOnboarding: !homeCook.stripeAccountId || homeCook.onboardingCompleted !== 'true'
        });
      }

      // Insert new home cook
      const newHomeCook = await db.insert(homeCooks).values({
        name,
        bio,
        cuisine,
        experience,
        avatarUrl,
        coverImageUrl,
        userId,
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
