import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { email, name, avatar_url } = body;

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.user_id, userId))
      .limit(1);

    if (existingUser.length > 0) {
      // Update existing user
      const updatedUser = await db
        .update(users)
        .set({
          email: email || existingUser[0].email,
          name: name || existingUser[0].name,
          avatarUrl: avatar_url || existingUser[0].avatarUrl,
          updatedAt: new Date(),
        })
        .where(eq(users.user_id, userId))
        .returning();

      return NextResponse.json(updatedUser[0], { status: 200 });
    } else {
      // Insert new user
      if (!email) {
        return NextResponse.json({ error: 'Email is required for new users' }, { status: 400 });
      }

      const newUser = await db.insert(users).values({
        user_id: userId,
        email,
        name,
        avatarUrl: avatar_url,
      }).returning();

      return NextResponse.json(newUser[0], { status: 201 });
    }
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 