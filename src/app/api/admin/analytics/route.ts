/**
 * Admin Analytics API
 * Platform analytics and metrics
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

// GET - Fetch analytics data
async function getHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period') || '7d'; // 1d, 7d, 30d, 90d, all
  const metric = searchParams.get('metric'); // users, recipes, engagement, revenue

  const db = getDb();

  try {
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    switch (period) {
      case '1d':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate = new Date(2020, 0, 1);
    }

    // User metrics
    const totalUsersSnap = await db.collection('users').count().get();
    const totalUsers = totalUsersSnap.data().count;

    const newUsersSnap = await db.collection('users')
      .where('createdAt', '>=', startDate)
      .count()
      .get();
    const newUsers = newUsersSnap.data().count;

    const activeUsersSnap = await db.collection('users')
      .where('lastActiveAt', '>=', startDate)
      .count()
      .get();
    const activeUsers = activeUsersSnap.data().count;

    const chefsSnap = await db.collection('users')
      .where('isChef', '==', true)
      .count()
      .get();
    const totalChefs = chefsSnap.data().count;

    const bannedSnap = await db.collection('users')
      .where('isBanned', '==', true)
      .count()
      .get();
    const bannedUsers = bannedSnap.data().count;

    // Content metrics
    const recipesSnap = await db.collection('recipes').count().get();
    const totalRecipes = recipesSnap.data().count;

    const newRecipesSnap = await db.collection('recipes')
      .where('createdAt', '>=', startDate)
      .count()
      .get();
    const newRecipes = newRecipesSnap.data().count;

    const postsSnap = await db.collection('posts').count().get();
    const totalPosts = postsSnap.data().count;

    const storiesSnap = await db.collection('stories').count().get();
    const totalStories = storiesSnap.data().count;

    const reviewsSnap = await db.collection('reviews').count().get();
    const totalReviews = reviewsSnap.data().count;

    // Engagement metrics
    const gatheringsSnap = await db.collection('gatherings').count().get();
    const totalGatherings = gatheringsSnap.data().count;

    const conversationsSnap = await db.collection('conversations').count().get();
    const totalConversations = conversationsSnap.data().count;

    // Creator applications
    const pendingAppsSnap = await db.collection('creatorApplications')
      .where('status', '==', 'pending')
      .count()
      .get();
    const pendingApplications = pendingAppsSnap.data().count;

    const approvedAppsSnap = await db.collection('creatorApplications')
      .where('status', '==', 'approved')
      .count()
      .get();
    const approvedApplications = approvedAppsSnap.data().count;

    // Reports and feedback
    const openReportsSnap = await db.collection('reports')
      .where('status', '==', 'pending')
      .count()
      .get();
    const openReports = openReportsSnap.data().count;

    const openFeedbackSnap = await db.collection('feedback')
      .where('status', '==', 'open')
      .count()
      .get();
    const openFeedback = openFeedbackSnap.data().count;

    // Growth calculations
    let previousPeriodStart = new Date(startDate);
    let previousPeriodEnd = new Date(startDate);
    switch (period) {
      case '1d':
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 1);
        break;
      case '7d':
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 7);
        break;
      case '30d':
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);
        break;
      case '90d':
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 90);
        break;
    }

    const previousUsersSnap = await db.collection('users')
      .where('createdAt', '>=', previousPeriodStart)
      .where('createdAt', '<', previousPeriodEnd)
      .count()
      .get();
    const previousUsers = previousUsersSnap.data().count;

    const userGrowth = previousUsers > 0
      ? ((newUsers - previousUsers) / previousUsers * 100).toFixed(1)
      : 100;

    // Top content (most liked/saved recipes)
    const topRecipesSnap = await db.collection('recipes')
      .orderBy('saveCount', 'desc')
      .limit(5)
      .get();
    const topRecipes = topRecipesSnap.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      saveCount: doc.data().saveCount || 0,
      imageUrl: doc.data().imageUrl,
    }));

    // Top creators
    const topCreatorsSnap = await db.collection('users')
      .where('isChef', '==', true)
      .orderBy('followersCount', 'desc')
      .limit(5)
      .get();
    const topCreators = topCreatorsSnap.docs.map(doc => ({
      id: doc.id,
      displayName: doc.data().displayName || doc.data().name,
      followersCount: doc.data().followersCount || 0,
      photoURL: doc.data().photoURL,
    }));

    return createSuccessResponse({
      period,
      overview: {
        totalUsers,
        newUsers,
        activeUsers,
        userGrowthPercent: parseFloat(userGrowth as string),
        totalChefs,
        bannedUsers,
      },
      content: {
        totalRecipes,
        newRecipes,
        totalPosts,
        totalStories,
        totalReviews,
        totalGatherings,
      },
      engagement: {
        totalConversations,
        avgRecipesPerUser: totalUsers > 0 ? (totalRecipes / totalUsers).toFixed(2) : 0,
      },
      moderation: {
        pendingApplications,
        approvedApplications,
        openReports,
        openFeedback,
      },
      topContent: {
        recipes: topRecipes,
        creators: topCreators,
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return createErrorResponse('Failed to fetch analytics', 500);
  }
}

export const GET = withAdminAuth(getHandler);
