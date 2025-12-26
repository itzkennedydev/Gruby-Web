/**
 * Admin Events/Gatherings API
 * Moderate and manage gatherings
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

interface Gathering {
  id: string;
  title: string;
  description: string;
  hostId: string;
  hostName: string;
  location: {
    address: string;
    lat?: number;
    lng?: number;
  };
  date: string;
  time: string;
  attendees: string[];
  maxAttendees: number;
  imageUrl?: string;
  status: 'active' | 'cancelled' | 'completed' | 'flagged' | 'removed';
  isDemo?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// GET - Fetch all gatherings with filtering
async function getHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '50');

  const db = getDb();

  try {
    let query;

    if (status && status !== 'all') {
      // Filter by specific status
      query = db.collection('gatherings')
        .where('status', '==', status)
        .orderBy('createdAt', 'desc')
        .limit(limit);
    } else {
      // "all" view - exclude removed events (they should only be seen when explicitly filtering)
      query = db.collection('gatherings')
        .where('status', 'in', ['active', 'cancelled', 'completed', 'flagged'])
        .orderBy('createdAt', 'desc')
        .limit(limit);
    }

    const snapshot = await query.get();

    const gatherings: Gathering[] = [];
    const hostIds = new Set<string>();

    snapshot.forEach(doc => {
      const data = doc.data();
      hostIds.add(data.hostId);
      // Check if it's a demo gathering by ID prefix or isDemo flag
      const isDemo = doc.id.startsWith('demo-') || doc.id.startsWith('demo_') || data.isDemo === true;
      gatherings.push({
        id: doc.id,
        title: data.title || 'Untitled Event',
        description: data.description || '',
        hostId: data.hostId,
        hostName: data.hostName || 'Unknown Host',
        location: data.location || { address: 'No location' },
        date: data.date || '',
        time: data.time || '',
        attendees: data.attendees || [],
        maxAttendees: data.maxAttendees || 10,
        imageUrl: data.imageUrl || data.coverImageUrl,
        status: data.status || 'active',
        isDemo,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      });
    });

    // Get host details
    const hostDetails: Record<string, { displayName: string; email: string }> = {};
    if (hostIds.size > 0) {
      const usersSnapshot = await db.collection('users')
        .where('__name__', 'in', Array.from(hostIds).slice(0, 10))
        .get();

      usersSnapshot.forEach(doc => {
        const data = doc.data();
        hostDetails[doc.id] = {
          displayName: data.displayName || 'Unknown',
          email: data.email || '',
        };
      });
    }

    // Enrich gatherings with host info
    const enrichedGatherings = gatherings.map(g => ({
      ...g,
      hostName: hostDetails[g.hostId]?.displayName || g.hostName,
      hostEmail: hostDetails[g.hostId]?.email || '',
    }));

    // Get counts by status
    const allSnapshot = await db.collection('gatherings').get();
    const counts = {
      total: allSnapshot.size,
      active: 0,
      cancelled: 0,
      completed: 0,
      flagged: 0,
      removed: 0,
      demo: 0,
    };

    allSnapshot.forEach(doc => {
      const data = doc.data();
      const s = data.status || 'active';
      if (s in counts) counts[s as keyof typeof counts]++;
      // Count demo gatherings by ID prefix or isDemo flag
      const isDemo = doc.id.startsWith('demo-') || doc.id.startsWith('demo_') || data.isDemo === true;
      if (isDemo) counts.demo++;
    });

    return createSuccessResponse({
      gatherings: enrichedGatherings,
      counts,
    });
  } catch (error) {
    console.error('Error fetching gatherings:', error);
    return createErrorResponse('Failed to fetch gatherings', 500);
  }
}

// PATCH - Update gathering status
async function patchHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { gatheringId, action, reason } = body;

    if (!gatheringId || !action) {
      return createErrorResponse('Gathering ID and action required', 400);
    }

    const db = getDb();
    const gatheringRef = db.collection('gatherings').doc(gatheringId);
    const gatheringDoc = await gatheringRef.get();

    if (!gatheringDoc.exists) {
      return createErrorResponse('Gathering not found', 404);
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
      moderatedBy: context.email,
      moderatedAt: new Date(),
    };

    switch (action) {
      case 'flag':
        updates.status = 'flagged';
        updates.flagReason = reason || 'Flagged by admin';
        break;
      case 'unflag':
        updates.status = 'active';
        updates.flagReason = null;
        break;
      case 'remove':
        updates.status = 'removed';
        updates.removeReason = reason || 'Removed by admin';
        break;
      case 'restore':
        updates.status = 'active';
        updates.removeReason = null;
        break;
      case 'cancel':
        updates.status = 'cancelled';
        updates.cancelReason = reason || 'Cancelled by admin';
        break;
      default:
        return createErrorResponse('Invalid action', 400);
    }

    await gatheringRef.update(updates);

    // Log the action
    await db.collection('adminLogs').add({
      level: action === 'remove' ? 'warning' : 'info',
      message: `Gathering ${action}: ${gatheringId}`,
      source: 'admin-events',
      metadata: {
        gatheringId,
        action,
        reason,
        title: gatheringDoc.data()?.title,
      },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    // Notify host if gathering was removed or flagged
    if (action === 'remove' || action === 'flag') {
      const gatheringData = gatheringDoc.data();
      if (gatheringData?.hostId) {
        await db.collection('notifications').add({
          userId: gatheringData.hostId,
          type: 'gathering_moderated',
          title: action === 'remove' ? 'Event Removed' : 'Event Flagged',
          body: action === 'remove'
            ? `Your event "${gatheringData.title}" was removed: ${reason || 'Violation of community guidelines'}`
            : `Your event "${gatheringData.title}" was flagged for review: ${reason || 'Under review'}`,
          read: false,
          createdAt: new Date(),
          data: { gatheringId, action },
        });
      }
    }

    return createSuccessResponse({
      message: `Gathering ${action} successful`,
      gatheringId,
      newStatus: updates.status,
    });
  } catch (error) {
    console.error('Error updating gathering:', error);
    return createErrorResponse('Failed to update gathering', 500);
  }
}

// DELETE - Permanently delete a gathering
async function deleteHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const gatheringId = searchParams.get('id');

  if (!gatheringId) {
    return createErrorResponse('Gathering ID required', 400);
  }

  const db = getDb();

  try {
    const gatheringRef = db.collection('gatherings').doc(gatheringId);
    const gatheringDoc = await gatheringRef.get();

    if (!gatheringDoc.exists) {
      return createErrorResponse('Gathering not found', 404);
    }

    const gatheringData = gatheringDoc.data();

    // Delete the gathering
    await gatheringRef.delete();

    // Log the action
    await db.collection('adminLogs').add({
      level: 'warning',
      message: `Gathering permanently deleted: ${gatheringId}`,
      source: 'admin-events',
      metadata: {
        gatheringId,
        title: gatheringData?.title,
        hostId: gatheringData?.hostId,
      },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Gathering permanently deleted',
      gatheringId,
    });
  } catch (error) {
    console.error('Error deleting gathering:', error);
    return createErrorResponse('Failed to delete gathering', 500);
  }
}

// POST - Bulk actions
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { action, reason } = body;

    if (!action) {
      return createErrorResponse('Action required', 400);
    }

    const db = getDb();
    let processedCount = 0;

    if (action === 'removeDemo' || action === 'deleteAllDemo') {
      // Find and DELETE all demo gatherings (identified by ID prefix or isDemo flag)
      const allGatherings = await db.collection('gatherings').get();
      const batch = db.batch();

      allGatherings.docs.forEach(doc => {
        const data = doc.data();
        // Check if it's a demo gathering by ID prefix or isDemo flag
        const isDemo = doc.id.startsWith('demo-') || doc.id.startsWith('demo_') || data.isDemo === true;

        if (isDemo) {
          batch.delete(doc.ref);
          processedCount++;
        }
      });

      if (processedCount > 0) {
        await batch.commit();
      }

      // Log the action
      await db.collection('adminLogs').add({
        level: 'warning',
        message: `Permanently deleted ${processedCount} demo gatherings`,
        source: 'admin-events',
        metadata: { action: 'deleteAllDemo', count: processedCount },
        timestamp: new Date(),
        userId: context.userId,
        userEmail: context.email,
      });

      return createSuccessResponse({
        message: `${processedCount} demo gatherings permanently deleted`,
        action: 'deleteAllDemo',
        count: processedCount,
      });
    }

    // Bulk delete all removed gatherings (permanent deletion)
    if (action === 'deleteAllRemoved') {
      const removedGatherings = await db.collection('gatherings')
        .where('status', '==', 'removed')
        .get();

      const batch = db.batch();

      removedGatherings.docs.forEach(doc => {
        batch.delete(doc.ref);
        processedCount++;
      });

      if (processedCount > 0) {
        await batch.commit();
      }

      // Log the action
      await db.collection('adminLogs').add({
        level: 'warning',
        message: `Permanently deleted ${processedCount} removed gatherings`,
        source: 'admin-events',
        metadata: { action: 'deleteAllRemoved', count: processedCount },
        timestamp: new Date(),
        userId: context.userId,
        userEmail: context.email,
      });

      return createSuccessResponse({
        message: `${processedCount} removed gatherings permanently deleted`,
        action: 'deleteAllRemoved',
        count: processedCount,
      });
    }

    // Handle other bulk actions with provided IDs
    const { gatheringIds } = body;
    if (!gatheringIds || !Array.isArray(gatheringIds)) {
      return createErrorResponse('Gathering IDs required for this action', 400);
    }

    const batch = db.batch();

    for (const gatheringId of gatheringIds) {
      const gatheringRef = db.collection('gatherings').doc(gatheringId);

      const baseUpdates = {
        updatedAt: new Date(),
        moderatedBy: context.email,
        moderatedAt: new Date(),
      };

      let updates: typeof baseUpdates & { status?: string; flagReason?: string; removeReason?: string };

      switch (action) {
        case 'flag':
          updates = { ...baseUpdates, status: 'flagged', flagReason: reason || 'Flagged by admin' };
          break;
        case 'remove':
          updates = { ...baseUpdates, status: 'removed', removeReason: reason || 'Removed by admin' };
          break;
        default:
          continue;
      }

      batch.update(gatheringRef, updates);
      processedCount++;
    }

    await batch.commit();

    // Log bulk action
    await db.collection('adminLogs').add({
      level: 'warning',
      message: `Bulk ${action} on ${processedCount} gatherings`,
      source: 'admin-events',
      metadata: { action, count: processedCount, reason },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: `${processedCount} gatherings processed`,
      action,
      count: processedCount,
    });
  } catch (error) {
    console.error('Error in bulk action:', error);
    return createErrorResponse('Bulk action failed', 500);
  }
}

export const GET = withAdminAuth(getHandler);
export const PATCH = withAdminAuth(patchHandler);
export const DELETE = withAdminAuth(deleteHandler);
export const POST = withAdminAuth(postHandler);
