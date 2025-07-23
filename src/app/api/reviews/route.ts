import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { reviews, homeCooks, users } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { homeCookId, rating, comment, orderId } = body;

    // Validate required fields
    if (!homeCookId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ 
        error: 'Home cook ID and rating (1-5) are required' 
      }, { status: 400 });
    }

    // Check if user has already reviewed this home cook
    const existingReview = await db
      .select()
      .from(reviews)
      .where(and(
        eq(reviews.homeCookId, homeCookId),
        eq(reviews.userId, userId)
      ))
      .limit(1);

    if (existingReview.length > 0) {
      return NextResponse.json({ 
        error: 'You have already reviewed this home cook' 
      }, { status: 400 });
    }

    // Create the review
    const [newReview] = await db
      .insert(reviews)
      .values({
        homeCookId,
        userId,
        rating,
        comment: comment || null,
        orderId: orderId || null,
      })
      .returning();

    // Update home cook's average rating and total reviews
    const allReviews = await db
      .select({ rating: reviews.rating })
      .from(reviews)
      .where(eq(reviews.homeCookId, homeCookId));

    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / allReviews.length).toFixed(2);
    const totalReviews = allReviews.length;

    await db
      .update(homeCooks)
      .set({
        averageRating,
        totalReviews,
      })
      .where(eq(homeCooks.id, homeCookId));

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const homeCookId = searchParams.get('homeCookId');

    if (!homeCookId) {
      return NextResponse.json({ error: 'Home cook ID is required' }, { status: 400 });
    }

    const reviewsData = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
        userName: users.name,
        userAvatar: users.avatarUrl,
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.userId, users.user_id))
      .where(eq(reviews.homeCookId, homeCookId))
      .orderBy(reviews.createdAt);

    return NextResponse.json(reviewsData);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
} 