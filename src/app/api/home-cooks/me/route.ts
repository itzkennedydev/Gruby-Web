import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { homeCooks } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Fetching home cook profile for userId:', userId);

    // Get the current user's home cook profile
    const [homeCook] = await db
      .select()
      .from(homeCooks)
      .where(eq(homeCooks.userId, userId))
      .limit(1);

    console.log('Home cook profile found:', homeCook ? 'yes' : 'no');

    if (!homeCook) {
      return NextResponse.json({ error: 'Home cook profile not found' }, { status: 404 });
    }

    return NextResponse.json(homeCook, { status: 200 });
  } catch (error) {
    console.error('Error fetching home cook profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 