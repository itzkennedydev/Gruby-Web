import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { homeCooks, users, products } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const cuisine = searchParams.get('cuisine');

    // Fetch home cooks with product counts
    let homeCooksData;
    
    if (featured === 'true') {
      // Fetch featured home cooks (active subscription, ordered by rating)
      homeCooksData = await db
        .select({
          id: homeCooks.id,
          name: homeCooks.name,
          bio: homeCooks.bio,
          avatarUrl: homeCooks.avatarUrl,
          coverImage: homeCooks.coverImage,
          cuisine: homeCooks.cuisine,
          experience: homeCooks.experience,
          averageRating: homeCooks.averageRating,
          totalReviews: homeCooks.totalReviews,
          subscriptionStatus: homeCooks.subscriptionStatus,
          city: homeCooks.city,
          state: homeCooks.state,
          createdAt: homeCooks.createdAt,
          updatedAt: homeCooks.updatedAt,
        })
        .from(homeCooks)
        .where(and(
          eq(homeCooks.subscriptionStatus, 'active'),
          eq(homeCooks.onboardingCompleted, 'true')
        ));
    } else {
      // Fetch all home cooks
      homeCooksData = await db
        .select({
          id: homeCooks.id,
          name: homeCooks.name,
          bio: homeCooks.bio,
          avatarUrl: homeCooks.avatarUrl,
          coverImage: homeCooks.coverImage,
          cuisine: homeCooks.cuisine,
          experience: homeCooks.experience,
          averageRating: homeCooks.averageRating,
          totalReviews: homeCooks.totalReviews,
          subscriptionStatus: homeCooks.subscriptionStatus,
          city: homeCooks.city,
          state: homeCooks.state,
          createdAt: homeCooks.createdAt,
          updatedAt: homeCooks.updatedAt,
        })
        .from(homeCooks);
    }

    // Get product counts for each home cook
    const allProducts = await db
      .select({
        homeCookId: products.homeCookId,
      })
      .from(products);

    // Count products per home cook
    const productCountMap = new Map();
    allProducts.forEach(product => {
      const currentCount = productCountMap.get(product.homeCookId) || 0;
      productCountMap.set(product.homeCookId, currentCount + 1);
    });

    // Transform the data and add product counts
    const transformedData = homeCooksData.map(cook => ({
      ...cook,
      averageRating: cook.averageRating ? parseFloat(cook.averageRating.toString()) : 0,
      totalReviews: cook.totalReviews || 0,
      productCount: productCountMap.get(cook.id) || 0,
    }));

    // Filter by cuisine if specified
    const filteredData = cuisine 
      ? transformedData.filter(cook => cook.cuisine.toLowerCase() === cuisine.toLowerCase())
      : transformedData;

    // Sort by rating for featured
    if (featured === 'true') {
      filteredData.sort((a, b) => {
        if (a.averageRating !== b.averageRating) {
          return b.averageRating - a.averageRating;
        }
        return b.totalReviews - a.totalReviews;
      });
    }

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error fetching home cooks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home cooks' },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: 'User already has a home cook profile' },
        { status: 400 }
      );
    }

    // Create new home cook profile
    const [newHomeCook] = await db
      .insert(homeCooks)
      .values({
        userId,
        name,
        bio,
        cuisine,
        experience,
        avatarUrl: avatarUrl || null,
        coverImage: coverImageUrl || null,
        averageRating: '0.00',
        totalReviews: 0,
      })
      .returning();

    return NextResponse.json(newHomeCook);
  } catch (error) {
    console.error('Error creating home cook:', error);
    return NextResponse.json(
      { error: 'Failed to create home cook profile' },
      { status: 500 }
    );
  }
} 