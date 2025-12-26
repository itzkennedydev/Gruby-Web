/**
 * Admin Reports API
 * User reports and flags management
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

// GET - Fetch reports
async function getHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || 'pending'; // pending, reviewed, resolved, dismissed
  const type = searchParams.get('type'); // user, recipe, post, story, comment
  const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 100);

  const db = getDb();

  try {
    let query = db.collection('reports').orderBy('createdAt', 'desc').limit(limit);

    if (status !== 'all') {
      query = query.where('status', '==', status);
    }

    if (type) {
      query = query.where('contentType', '==', type);
    }

    const snapshot = await query.get();

    const reports = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data();

      // Get reporter info
      let reporter = null;
      if (data.reporterId) {
        try {
          const reporterDoc = await db.collection('users').doc(data.reporterId).get();
          if (reporterDoc.exists) {
            const rd = reporterDoc.data();
            reporter = { id: reporterDoc.id, displayName: rd?.displayName, email: rd?.email };
          }
        } catch (e) {}
      }

      // Get reported user info
      let reportedUser = null;
      if (data.reportedUserId) {
        try {
          const userDoc = await db.collection('users').doc(data.reportedUserId).get();
          if (userDoc.exists) {
            const ud = userDoc.data();
            reportedUser = { id: userDoc.id, displayName: ud?.displayName, email: ud?.email };
          }
        } catch (e) {}
      }

      return {
        id: doc.id,
        contentType: data.contentType,
        contentId: data.contentId,
        reason: data.reason,
        description: data.description,
        status: data.status || 'pending',
        priority: data.priority || 'normal',
        reporter,
        reportedUser,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        reviewedAt: data.reviewedAt?.toDate?.()?.toISOString(),
        reviewedBy: data.reviewedBy,
        resolution: data.resolution,
      };
    }));

    // Get counts
    const counts: Record<string, number> = {};
    for (const s of ['pending', 'reviewed', 'resolved', 'dismissed']) {
      const countSnap = await db.collection('reports').where('status', '==', s).count().get();
      counts[s] = countSnap.data().count;
    }
    const totalSnap = await db.collection('reports').count().get();
    counts.total = totalSnap.data().count;

    return createSuccessResponse({ reports, counts });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return createErrorResponse('Failed to fetch reports', 500);
  }
}

// PATCH - Update report status
async function patchHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { reportId, action, resolution, banUser } = body;

    if (!reportId || !action) {
      return createErrorResponse('Report ID and action required', 400);
    }

    const validActions = ['review', 'resolve', 'dismiss', 'escalate'];
    if (!validActions.includes(action)) {
      return createErrorResponse('Invalid action', 400);
    }

    const db = getDb();

    const reportDoc = await db.collection('reports').doc(reportId).get();
    if (!reportDoc.exists) {
      return createErrorResponse('Report not found', 404);
    }

    const reportData = reportDoc.data();
    const updates: Record<string, unknown> = {
      reviewedAt: new Date(),
      reviewedBy: context.email,
    };

    switch (action) {
      case 'review':
        updates.status = 'reviewed';
        break;
      case 'resolve':
        updates.status = 'resolved';
        updates.resolution = resolution;
        // If banning user was requested
        if (banUser && reportData?.reportedUserId) {
          await db.collection('users').doc(reportData.reportedUserId).update({
            isBanned: true,
            banReason: resolution || 'Violation of community guidelines',
            bannedAt: new Date(),
            bannedBy: context.email,
          });
        }
        break;
      case 'dismiss':
        updates.status = 'dismissed';
        updates.resolution = resolution || 'Report dismissed';
        break;
      case 'escalate':
        updates.priority = 'high';
        updates.escalatedAt = new Date();
        updates.escalatedBy = context.email;
        break;
    }

    await db.collection('reports').doc(reportId).update(updates);

    await db.collection('adminLogs').add({
      level: action === 'resolve' && banUser ? 'warning' : 'info',
      message: `Report ${action}: ${reportId}`,
      source: 'admin-reports',
      metadata: { reportId, action, resolution, banUser },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: `Report ${action}d successfully`,
      reportId,
      action,
    });
  } catch (error) {
    console.error('Error updating report:', error);
    return createErrorResponse('Failed to update report', 500);
  }
}

export const GET = withAdminAuth(getHandler);
export const PATCH = withAdminAuth(patchHandler);
