/**
 * Admin Cleanup API
 * Production data cleanup and maintenance
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

// Demo account identifiers
const DEMO_USER_IDS = [
  'demo_user_sarah_001',
  'demo-user-kevin',
  'demo-user-jake',
  'demo-user-maria',
  'demo-user-tom',
  'demo-user-lisa',
  'demo-user-david',
  'demo-user-emma',
];

const DEMO_EMAILS = [
  'demo@grubyapp.com',
  'applereview@grubyapp.com',
];

const DEMO_GATHERING_IDS = [
  'demo-gathering-pasta',
  'demo-gathering-brunch',
  'demo-gathering-taco',
  'demo-gathering-sushi',
  'demo-gathering-bbq',
  'demo-gathering-pizza',
  'demo-gathering-thai',
  'demo-gathering-indian',
];

interface CleanupResult {
  collection: string;
  deleted: number;
  errors: number;
}

// POST - Run cleanup operations
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { action, options } = body;

    if (!action) {
      return createErrorResponse('Action required', 400);
    }

    const db = getDb();

    switch (action) {
      case 'removeDemoAccounts': {
        const results: CleanupResult[] = [];

        // Remove demo users
        let deleted = 0;
        let errors = 0;
        for (const userId of DEMO_USER_IDS) {
          try {
            await db.collection('users').doc(userId).delete();
            deleted++;
          } catch (e) {
            errors++;
          }
        }
        results.push({ collection: 'users (demo IDs)', deleted, errors });

        // Remove users by demo email
        deleted = 0;
        errors = 0;
        for (const email of DEMO_EMAILS) {
          try {
            const snapshot = await db.collection('users').where('email', '==', email).get();
            for (const doc of snapshot.docs) {
              await doc.ref.delete();
              deleted++;
            }
          } catch (e) {
            errors++;
          }
        }
        results.push({ collection: 'users (demo emails)', deleted, errors });

        // Log action
        await db.collection('adminLogs').add({
          level: 'warning',
          message: 'Demo accounts removed',
          source: 'admin-cleanup',
          metadata: { action, results },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({ message: 'Demo accounts removed', results });
      }

      case 'removeDemoGatherings': {
        let deleted = 0;
        let errors = 0;

        for (const gatheringId of DEMO_GATHERING_IDS) {
          try {
            await db.collection('gatherings').doc(gatheringId).delete();
            deleted++;
          } catch (e) {
            errors++;
          }
        }

        await db.collection('adminLogs').add({
          level: 'warning',
          message: 'Demo gatherings removed',
          source: 'admin-cleanup',
          metadata: { action, deleted, errors },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({ message: 'Demo gatherings removed', deleted, errors });
      }

      case 'removeAllGatherings': {
        // Delete ALL gatherings, not just demo ones
        const snapshot = await db.collection('gatherings').get();
        let deleted = 0;
        let errors = 0;

        for (const doc of snapshot.docs) {
          try {
            await doc.ref.delete();
            deleted++;
          } catch (e) {
            errors++;
          }
        }

        await db.collection('adminLogs').add({
          level: 'warning',
          message: 'All gatherings removed',
          source: 'admin-cleanup',
          metadata: { action, deleted, errors, total: snapshot.size },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({ message: 'All gatherings removed', deleted, errors, total: snapshot.size });
      }

      case 'removeAllRecipes': {
        const snapshot = await db.collection('recipes').get();
        let deleted = 0;
        let errors = 0;

        const batch = db.batch();
        snapshot.docs.forEach((doc, index) => {
          if (index < 500) { // Firestore batch limit
            batch.delete(doc.ref);
            deleted++;
          }
        });

        if (deleted > 0) {
          await batch.commit();
        }

        // If more than 500, need multiple batches
        if (snapshot.docs.length > 500) {
          for (let i = 500; i < snapshot.docs.length; i++) {
            try {
              await snapshot.docs[i].ref.delete();
              deleted++;
            } catch (e) {
              errors++;
            }
          }
        }

        await db.collection('adminLogs').add({
          level: 'warning',
          message: 'All recipes removed',
          source: 'admin-cleanup',
          metadata: { action, deleted, errors, total: snapshot.size },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({ message: 'All recipes removed', deleted, errors, total: snapshot.size });
      }

      case 'removeAllPosts': {
        const snapshot = await db.collection('posts').get();
        let deleted = 0;
        let errors = 0;

        for (const doc of snapshot.docs) {
          try {
            await doc.ref.delete();
            deleted++;
          } catch (e) {
            errors++;
          }
        }

        await db.collection('adminLogs').add({
          level: 'warning',
          message: 'All posts removed',
          source: 'admin-cleanup',
          metadata: { action, deleted, errors },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({ message: 'All posts removed', deleted, errors });
      }

      case 'removeAllStories': {
        const snapshot = await db.collection('stories').get();
        let deleted = 0;
        let errors = 0;

        for (const doc of snapshot.docs) {
          try {
            await doc.ref.delete();
            deleted++;
          } catch (e) {
            errors++;
          }
        }

        await db.collection('adminLogs').add({
          level: 'warning',
          message: 'All stories removed',
          source: 'admin-cleanup',
          metadata: { action, deleted, errors },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({ message: 'All stories removed', deleted, errors });
      }

      case 'clearUserData': {
        // Keeps users but removes their generated content
        const results: CleanupResult[] = [];

        // Collections to clear (all user content)
        const userDataCollections = [
          'posts',
          'stories',
          'reviews',
          'shoppingLists',
          'pantryItems',
          'mealPlans',
          'savedRecipes',
          'conversations',
          'notifications',
          'comments',
          'likes',
        ];

        for (const collectionName of userDataCollections) {
          let deleted = 0;
          let errors = 0;
          try {
            const snapshot = await db.collection(collectionName).limit(500).get();
            for (const doc of snapshot.docs) {
              try {
                await doc.ref.delete();
                deleted++;
              } catch (e) {
                errors++;
              }
            }
          } catch (e) {
            errors++;
          }
          results.push({ collection: collectionName, deleted, errors });
        }

        await db.collection('adminLogs').add({
          level: 'warning',
          message: 'User data cleared (users kept)',
          source: 'admin-cleanup',
          metadata: { action, results },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({ message: 'User data cleared', results });
      }

      case 'fullProductionReset': {
        // DANGEROUS: Full reset keeping only real user accounts
        const results: CleanupResult[] = [];

        // 1. Remove demo accounts
        let deleted = 0;
        for (const userId of DEMO_USER_IDS) {
          try {
            await db.collection('users').doc(userId).delete();
            deleted++;
          } catch (e) {}
        }
        for (const email of DEMO_EMAILS) {
          const snapshot = await db.collection('users').where('email', '==', email).get();
          for (const doc of snapshot.docs) {
            await doc.ref.delete();
            deleted++;
          }
        }
        results.push({ collection: 'demoUsers', deleted, errors: 0 });

        // 2. Remove demo gatherings
        deleted = 0;
        for (const id of DEMO_GATHERING_IDS) {
          try {
            await db.collection('gatherings').doc(id).delete();
            deleted++;
          } catch (e) {}
        }
        results.push({ collection: 'demoGatherings', deleted, errors: 0 });

        // 3. Clear content collections
        const contentCollections = ['recipes', 'posts', 'stories', 'reviews'];
        for (const collectionName of contentCollections) {
          deleted = 0;
          const snapshot = await db.collection(collectionName).get();
          for (const doc of snapshot.docs) {
            try {
              await doc.ref.delete();
              deleted++;
            } catch (e) {}
          }
          results.push({ collection: collectionName, deleted, errors: 0 });
        }

        // 4. Clear user-generated data
        const userDataCollections = [
          'shoppingLists', 'pantryItems', 'mealPlans', 'savedRecipes',
          'conversations', 'notifications', 'userPreferences'
        ];
        for (const collectionName of userDataCollections) {
          deleted = 0;
          try {
            const snapshot = await db.collection(collectionName).limit(500).get();
            for (const doc of snapshot.docs) {
              await doc.ref.delete();
              deleted++;
            }
          } catch (e) {}
          results.push({ collection: collectionName, deleted, errors: 0 });
        }

        await db.collection('adminLogs').add({
          level: 'critical',
          message: 'FULL PRODUCTION RESET EXECUTED',
          source: 'admin-cleanup',
          metadata: { action, results },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          message: 'Full production reset complete. Real user accounts preserved.',
          results,
        });
      }

      default:
        return createErrorResponse('Unknown action', 400);
    }
  } catch (error) {
    console.error('Cleanup error:', error);
    return createErrorResponse('Cleanup operation failed', 500);
  }
}

// GET - Get cleanup status and stats
async function getHandler(req: NextRequest, context: AdminContext) {
  const db = getDb();

  try {
    // Get counts for various collections
    const collections = [
      'users', 'recipes', 'posts', 'stories', 'reviews',
      'gatherings', 'shoppingLists', 'conversations'
    ];

    const counts: Record<string, number> = {};

    for (const collection of collections) {
      try {
        const snapshot = await db.collection(collection).count().get();
        counts[collection] = snapshot.data().count;
      } catch (e) {
        counts[collection] = -1;
      }
    }

    // Check for demo accounts
    let demoAccountsFound = 0;
    for (const email of DEMO_EMAILS) {
      const snapshot = await db.collection('users').where('email', '==', email).get();
      demoAccountsFound += snapshot.size;
    }

    // Check for demo gatherings
    let demoGatheringsFound = 0;
    for (const id of DEMO_GATHERING_IDS) {
      const doc = await db.collection('gatherings').doc(id).get();
      if (doc.exists) demoGatheringsFound++;
    }

    return createSuccessResponse({
      counts,
      demoData: {
        accounts: demoAccountsFound,
        gatherings: demoGatheringsFound,
      },
      status: demoAccountsFound === 0 && demoGatheringsFound === 0 ? 'clean' : 'has_demo_data',
    });
  } catch (error) {
    console.error('Error getting cleanup status:', error);
    return createErrorResponse('Failed to get cleanup status', 500);
  }
}

export const POST = withAdminAuth(postHandler);
export const GET = withAdminAuth(getHandler);
