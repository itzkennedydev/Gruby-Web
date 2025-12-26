/**
 * Admin Database API
 * Database exploration and management
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

// Collections that can be browsed
const BROWSABLE_COLLECTIONS = [
  'users',
  'recipes',
  'posts',
  'stories',
  'creatorApplications',
  'adminLogs',
  'notifications',
  'reports',
  'feedback',
];

// Fields to redact for security
const REDACTED_FIELDS = [
  'password',
  'passwordHash',
  'refreshToken',
  'accessToken',
  'apiKey',
  'secret',
  'privateKey',
];

function redactSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const redacted = { ...data };
  for (const field of REDACTED_FIELDS) {
    if (field in redacted) {
      redacted[field] = '[REDACTED]';
    }
  }
  return redacted;
}

async function handler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') || 'collections';

  const db = getDb();

  try {
    switch (action) {
      case 'collections': {
        // List available collections with counts
        const collections: { name: string; count: number; browsable: boolean }[] = [];

        for (const collName of BROWSABLE_COLLECTIONS) {
          try {
            const countSnapshot = await db.collection(collName).count().get();
            collections.push({
              name: collName,
              count: countSnapshot.data().count,
              browsable: true,
            });
          } catch (e) {
            // Collection might not exist
            collections.push({
              name: collName,
              count: 0,
              browsable: true,
            });
          }
        }

        return createSuccessResponse({
          collections,
          totalCollections: collections.length,
        });
      }

      case 'browse': {
        const collection = searchParams.get('collection');
        const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 100);
        const startAfter = searchParams.get('startAfter');
        const orderBy = searchParams.get('orderBy') || 'createdAt';
        const orderDir = (searchParams.get('orderDir') || 'desc') as 'asc' | 'desc';

        if (!collection) {
          return createErrorResponse('Collection name required', 400);
        }

        if (!BROWSABLE_COLLECTIONS.includes(collection)) {
          return createErrorResponse('Collection not available for browsing', 403);
        }

        let query = db.collection(collection)
          .orderBy(orderBy, orderDir)
          .limit(limit);

        if (startAfter) {
          const startAfterDoc = await db.collection(collection).doc(startAfter).get();
          if (startAfterDoc.exists) {
            query = query.startAfter(startAfterDoc);
          }
        }

        const snapshot = await query.get();

        const documents = snapshot.docs.map(doc => {
          const data = doc.data();
          // Convert timestamps to ISO strings
          const processed: Record<string, unknown> = { id: doc.id };
          for (const [key, value] of Object.entries(data)) {
            if (value?.toDate) {
              processed[key] = value.toDate().toISOString();
            } else {
              processed[key] = value;
            }
          }
          return redactSensitiveData(processed);
        });

        return createSuccessResponse({
          collection,
          documents,
          pagination: {
            limit,
            hasMore: documents.length === limit,
            nextCursor: documents.length > 0 ? documents[documents.length - 1].id : null,
          },
        });
      }

      case 'document': {
        const collection = searchParams.get('collection');
        const documentId = searchParams.get('id');

        if (!collection || !documentId) {
          return createErrorResponse('Collection and document ID required', 400);
        }

        if (!BROWSABLE_COLLECTIONS.includes(collection)) {
          return createErrorResponse('Collection not available for browsing', 403);
        }

        const docRef = await db.collection(collection).doc(documentId).get();

        if (!docRef.exists) {
          return createErrorResponse('Document not found', 404);
        }

        const data = docRef.data() || {};
        const processed: Record<string, unknown> = { id: docRef.id };

        for (const [key, value] of Object.entries(data)) {
          if (value?.toDate) {
            processed[key] = value.toDate().toISOString();
          } else {
            processed[key] = value;
          }
        }

        return createSuccessResponse({
          document: redactSensitiveData(processed),
        });
      }

      case 'stats': {
        // Get database overview stats
        const stats: Record<string, { count: number; sampleFields: string[] }> = {};

        for (const collName of BROWSABLE_COLLECTIONS) {
          try {
            const countSnapshot = await db.collection(collName).count().get();
            const sampleDoc = await db.collection(collName).limit(1).get();
            const sampleFields = sampleDoc.docs.length > 0
              ? Object.keys(sampleDoc.docs[0].data())
              : [];

            stats[collName] = {
              count: countSnapshot.data().count,
              sampleFields,
            };
          } catch (e) {
            stats[collName] = { count: 0, sampleFields: [] };
          }
        }

        return createSuccessResponse({
          stats,
          generatedAt: new Date().toISOString(),
        });
      }

      default:
        return createErrorResponse('Invalid action', 400);
    }
  } catch (error) {
    console.error('Database API error:', error);
    return createErrorResponse('Database operation failed', 500);
  }
}

// POST handler for database operations (with extra caution)
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { action, collection, documentId, data } = body;

    if (!BROWSABLE_COLLECTIONS.includes(collection)) {
      return createErrorResponse('Collection not available', 403);
    }

    const db = getDb();

    switch (action) {
      case 'update': {
        if (!documentId) {
          return createErrorResponse('Document ID required for update', 400);
        }

        // Remove any sensitive or protected fields
        const protectedFields = ['id', 'createdAt', 'userId', ...REDACTED_FIELDS];
        const sanitizedData: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(data || {})) {
          if (!protectedFields.includes(key)) {
            sanitizedData[key] = value;
          }
        }

        sanitizedData.updatedAt = new Date();
        sanitizedData.updatedBy = context.email;

        await db.collection(collection).doc(documentId).update(sanitizedData);

        // Log the action
        await db.collection('adminLogs').add({
          level: 'warn',
          message: `Document ${collection}/${documentId} updated by ${context.email}`,
          source: 'admin-database',
          metadata: { collection, documentId, fields: Object.keys(sanitizedData) },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          message: 'Document updated',
          collection,
          documentId,
        });
      }

      case 'delete': {
        if (!documentId) {
          return createErrorResponse('Document ID required for delete', 400);
        }

        // Extra confirmation for delete operations
        if (body.confirm !== 'DELETE') {
          return createErrorResponse('Confirm deletion by passing confirm: "DELETE"', 400);
        }

        await db.collection(collection).doc(documentId).delete();

        // Log the action
        await db.collection('adminLogs').add({
          level: 'warn',
          message: `Document ${collection}/${documentId} deleted by ${context.email}`,
          source: 'admin-database',
          metadata: { collection, documentId },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          message: 'Document deleted',
          collection,
          documentId,
        });
      }

      default:
        return createErrorResponse('Invalid action. Supported: update, delete', 400);
    }
  } catch (error) {
    console.error('Database POST error:', error);
    return createErrorResponse('Database operation failed', 500);
  }
}

export const GET = withAdminAuth(handler);
export const POST = withAdminAuth(postHandler);
