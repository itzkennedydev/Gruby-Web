import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { homeCooks, users } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch only home cooks with completed payment setup AND active subscription
    const allHomeCooks = await db
      .select()
      .from(homeCooks)
      .where(and(
        eq(homeCooks.onboardingCompleted, 'true'),
        eq(homeCooks.subscriptionStatus, 'active')
      ));
    
    return NextResponse.json(allHomeCooks, { status: 200 });
  } catch (error) {
    console.error('Error fetching home cooks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, bio, cuisine, experience, avatarUrl, coverImageUrl } = body;
    
    // Validate required fields
    if (!name || !cuisine || !experience) {
      return NextResponse.json({ error: 'Name, cuisine, and experience are required' }, { status: 400 });
    }

    // Ensure user exists in the database first
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.user_id, userId))
      .limit(1);

    if (existingUser.length === 0) {
      // User doesn't exist, create them
      try {
        await db.insert(users).values({
          user_id: userId,
          email: '', // Will be updated when we have more user data
          name: name,
          avatarUrl: avatarUrl || '',
        });
        console.log(`Created user ${userId} in database`);
      } catch (userError) {
        console.error('Error creating user:', userError);
        return NextResponse.json({ error: 'Failed to create user record' }, { status: 500 });
      }
    }

    // Check if user already has a home cook profile
    const existingHomeCook = await db
      .select()
      .from(homeCooks)
      .where(eq(homeCooks.userId, userId))
      .limit(1);

    if (existingHomeCook.length > 0) {
      const homeCook = existingHomeCook[0];
      
      // Update existing profile with new data (including images)
      const updatedHomeCook = await db
        .update(homeCooks)
        .set({
          name,
          bio,
          cuisine,
          experience,
          avatarUrl: avatarUrl || homeCook.avatarUrl,
          coverImage: coverImageUrl || homeCook.coverImage,
        })
        .where(eq(homeCooks.userId, userId))
        .returning();
      
      // Check if they need Stripe onboarding
      const needsStripeOnboarding = !homeCook.stripeAccountId || homeCook.onboardingCompleted !== 'true';
      
      if (needsStripeOnboarding) {
        // Return updated profile but indicate Stripe onboarding is needed
        return NextResponse.json({ 
          homeCook: updatedHomeCook[0],
          needsStripeOnboarding: true
        }, { status: 200 });
      } else {
        // Profile is complete, return conflict
        return NextResponse.json({ 
          error: 'User already has a complete home cook profile',
          homeCook: updatedHomeCook[0]
        }, { status: 409 });
      }
    }

    // Insert new home cook with userId
    const newHomeCook = await db.insert(homeCooks).values({
      userId,
      name,
      bio,
      cuisine,
      experience,
      avatarUrl,
      coverImage: coverImageUrl,
    }).returning();

    return NextResponse.json(newHomeCook[0], { status: 201 });
  } catch (error) {
    console.error('Error creating home cook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 