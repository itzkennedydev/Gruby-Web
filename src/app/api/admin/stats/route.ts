/**
 * Admin Stats API
 * Get platform statistics and metrics
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

async function handler(req: NextRequest, context: AdminContext) {
  const db = getDb();
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  try {
    // Get user counts
    const usersSnapshot = await db.collection('users').count().get();
    const totalUsers = usersSnapshot.data().count;

    // Get users created in last 24 hours
    const newUsersSnapshot = await db.collection('users')
      .where('createdAt', '>=', oneDayAgo)
      .count()
      .get();
    const newUsersToday = newUsersSnapshot.data().count;

    // Get users created in last 7 days
    const newUsersWeekSnapshot = await db.collection('users')
      .where('createdAt', '>=', oneWeekAgo)
      .count()
      .get();
    const newUsersThisWeek = newUsersWeekSnapshot.data().count;

    // Get recipe counts
    const recipesSnapshot = await db.collection('recipes').count().get();
    const totalRecipes = recipesSnapshot.data().count;

    // Get creator application counts
    const pendingAppsSnapshot = await db.collection('creatorApplications')
      .where('status', '==', 'pending')
      .count()
      .get();
    const pendingApplications = pendingAppsSnapshot.data().count;

    const approvedAppsSnapshot = await db.collection('creatorApplications')
      .where('status', '==', 'approved')
      .count()
      .get();
    const approvedCreators = approvedAppsSnapshot.data().count;

    // Get chef/creator count
    const chefsSnapshot = await db.collection('users')
      .where('isChef', '==', true)
      .count()
      .get();
    const totalChefs = chefsSnapshot.data().count;

    // Get post counts (if collection exists)
    let totalPosts = 0;
    let postsToday = 0;
    try {
      const postsSnapshot = await db.collection('posts').count().get();
      totalPosts = postsSnapshot.data().count;

      const postsTodaySnapshot = await db.collection('posts')
        .where('createdAt', '>=', oneDayAgo)
        .count()
        .get();
      postsToday = postsTodaySnapshot.data().count;
    } catch (e) {
      // Posts collection might not exist
    }

    // Get story counts (if collection exists)
    let totalStories = 0;
    try {
      const storiesSnapshot = await db.collection('stories').count().get();
      totalStories = storiesSnapshot.data().count;
    } catch (e) {
      // Stories collection might not exist
    }

    return createSuccessResponse({
      users: {
        total: totalUsers,
        newToday: newUsersToday,
        newThisWeek: newUsersThisWeek,
        creators: totalChefs,
      },
      content: {
        recipes: totalRecipes,
        posts: totalPosts,
        postsToday: postsToday,
        stories: totalStories,
      },
      applications: {
        pending: pendingApplications,
        approved: approvedCreators,
      },
      generatedAt: now.toISOString(),
      requestedBy: context.email,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return createSuccessResponse({
      error: 'Failed to fetch some stats',
      users: { total: 0, newToday: 0, newThisWeek: 0, creators: 0 },
      content: { recipes: 0, posts: 0, postsToday: 0, stories: 0 },
      applications: { pending: 0, approved: 0 },
      generatedAt: now.toISOString(),
    });
  }
}

export const GET = withAdminAuth(handler);
