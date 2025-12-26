/**
 * Admin Content Moderation API
 * Manage recipes, posts, stories, and reviews
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

type ContentType = 'recipes' | 'posts' | 'stories' | 'reviews';

// GET - Fetch content for moderation
async function getHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') as ContentType || 'recipes';
  const status = searchParams.get('status'); // pending, approved, flagged, removed
  const search = searchParams.get('search')?.toLowerCase();
  const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 100);
  const startAfter = searchParams.get('startAfter');

  const db = getDb();

  try {
    const validTypes: ContentType[] = ['recipes', 'posts', 'stories', 'reviews'];
    if (!validTypes.includes(type)) {
      return createErrorResponse('Invalid content type', 400);
    }

    let query = db.collection(type).orderBy('createdAt', 'desc').limit(limit);

    if (status) {
      query = query.where('moderationStatus', '==', status);
    }

    if (startAfter) {
      const startDoc = await db.collection(type).doc(startAfter).get();
      if (startDoc.exists) {
        query = query.startAfter(startDoc);
      }
    }

    const snapshot = await query.get();

    const items = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data();

      // Get author info
      let author = null;
      if (data.userId || data.authorId || data.createdBy) {
        const authorId = data.userId || data.authorId || data.createdBy;
        try {
          const authorDoc = await db.collection('users').doc(authorId).get();
          if (authorDoc.exists) {
            const authorData = authorDoc.data();
            author = {
              id: authorDoc.id,
              displayName: authorData?.displayName || authorData?.name,
              email: authorData?.email,
              photoURL: authorData?.photoURL,
            };
          }
        } catch (e) {}
      }

      return {
        id: doc.id,
        type,
        title: data.title || data.name || data.content?.substring(0, 50) || 'Untitled',
        description: data.description || data.content?.substring(0, 100),
        imageUrl: data.imageUrl || data.thumbnailUrl || data.photoURL || data.images?.[0],
        author,
        moderationStatus: data.moderationStatus || 'approved',
        flagCount: data.flagCount || 0,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        ...(['reviews'].includes(type) && { rating: data.rating }),
        ...(['recipes'].includes(type) && {
          cookTime: data.cookTime,
          category: data.category,
        }),
      };
    }));

    // Client-side search
    let filteredItems = items;
    if (search) {
      filteredItems = items.filter(item =>
        item.title?.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search) ||
        item.author?.displayName?.toLowerCase().includes(search)
      );
    }

    // Get counts by status
    const counts: Record<string, number> = {};
    const statuses = ['pending', 'approved', 'flagged', 'removed'];
    for (const s of statuses) {
      try {
        const countSnap = await db.collection(type).where('moderationStatus', '==', s).count().get();
        counts[s] = countSnap.data().count;
      } catch (e) {
        counts[s] = 0;
      }
    }

    // Get total
    const totalSnap = await db.collection(type).count().get();
    counts.total = totalSnap.data().count;

    return createSuccessResponse({
      items: filteredItems,
      counts,
      pagination: {
        limit,
        hasMore: snapshot.docs.length === limit,
        nextCursor: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null,
      },
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return createErrorResponse('Failed to fetch content', 500);
  }
}

// PATCH - Update content moderation status
async function patchHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { type, contentId, action, reason } = body;

    if (!type || !contentId || !action) {
      return createErrorResponse('Type, contentId, and action required', 400);
    }

    const validTypes: ContentType[] = ['recipes', 'posts', 'stories', 'reviews'];
    if (!validTypes.includes(type)) {
      return createErrorResponse('Invalid content type', 400);
    }

    const validActions = ['approve', 'flag', 'remove', 'restore', 'feature', 'unfeature'];
    if (!validActions.includes(action)) {
      return createErrorResponse('Invalid action', 400);
    }

    const db = getDb();

    const updates: Record<string, unknown> = {
      moderatedAt: new Date(),
      moderatedBy: context.email,
    };

    switch (action) {
      case 'approve':
        updates.moderationStatus = 'approved';
        updates.flagCount = 0;
        break;
      case 'flag':
        updates.moderationStatus = 'flagged';
        updates.flagReason = reason;
        break;
      case 'remove':
        updates.moderationStatus = 'removed';
        updates.removalReason = reason;
        break;
      case 'restore':
        updates.moderationStatus = 'approved';
        break;
      case 'feature':
        updates.isFeatured = true;
        updates.featuredAt = new Date();
        break;
      case 'unfeature':
        updates.isFeatured = false;
        break;
    }

    await db.collection(type).doc(contentId).update(updates);

    // Log the action
    await db.collection('adminLogs').add({
      level: action === 'remove' ? 'warning' : 'info',
      message: `Content ${action}: ${type}/${contentId}`,
      source: 'admin-content',
      metadata: { type, contentId, action, reason },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: `Content ${action}d successfully`,
      contentId,
      type,
      action,
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return createErrorResponse('Failed to update content', 500);
  }
}

// DELETE - Permanently delete content
async function deleteHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') as ContentType;
  const contentId = searchParams.get('id');

  if (!type || !contentId) {
    return createErrorResponse('Type and id required', 400);
  }

  const db = getDb();

  try {
    // Archive before deletion
    const doc = await db.collection(type).doc(contentId).get();
    if (doc.exists) {
      await db.collection('deletedContent').add({
        originalCollection: type,
        originalId: contentId,
        data: doc.data(),
        deletedAt: new Date(),
        deletedBy: context.email,
      });
    }

    await db.collection(type).doc(contentId).delete();

    await db.collection('adminLogs').add({
      level: 'warning',
      message: `Content permanently deleted: ${type}/${contentId}`,
      source: 'admin-content',
      metadata: { type, contentId },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Content permanently deleted',
      contentId,
      type,
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    return createErrorResponse('Failed to delete content', 500);
  }
}

export const GET = withAdminAuth(getHandler);
export const PATCH = withAdminAuth(patchHandler);
export const DELETE = withAdminAuth(deleteHandler);
