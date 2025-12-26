/**
 * Admin Feedback API
 * User feedback and support tickets
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

// GET - Fetch feedback/support tickets
async function getHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || 'open'; // open, in_progress, resolved, closed
  const category = searchParams.get('category'); // bug, feature, question, complaint, other
  const priority = searchParams.get('priority'); // low, normal, high, urgent
  const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 100);

  const db = getDb();

  try {
    let query = db.collection('feedback').orderBy('createdAt', 'desc').limit(limit);

    if (status !== 'all') {
      query = query.where('status', '==', status);
    }

    if (category) {
      query = query.where('category', '==', category);
    }

    if (priority) {
      query = query.where('priority', '==', priority);
    }

    const snapshot = await query.get();

    const tickets = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data();

      // Get user info
      let user = null;
      if (data.userId) {
        try {
          const userDoc = await db.collection('users').doc(data.userId).get();
          if (userDoc.exists) {
            const ud = userDoc.data();
            user = {
              id: userDoc.id,
              displayName: ud?.displayName || ud?.name,
              email: ud?.email,
              photoURL: ud?.photoURL,
            };
          }
        } catch (e) {}
      }

      return {
        id: doc.id,
        subject: data.subject,
        message: data.message,
        category: data.category || 'other',
        priority: data.priority || 'normal',
        status: data.status || 'open',
        user,
        userEmail: data.userEmail,
        deviceInfo: data.deviceInfo,
        appVersion: data.appVersion,
        attachments: data.attachments || [],
        responses: data.responses || [],
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString(),
        assignedTo: data.assignedTo,
        resolvedAt: data.resolvedAt?.toDate?.()?.toISOString(),
      };
    }));

    // Get counts by status
    const counts: Record<string, number> = {};
    for (const s of ['open', 'in_progress', 'resolved', 'closed']) {
      const countSnap = await db.collection('feedback').where('status', '==', s).count().get();
      counts[s] = countSnap.data().count;
    }
    const totalSnap = await db.collection('feedback').count().get();
    counts.total = totalSnap.data().count;

    // Get counts by category
    const categoryCountsObj: Record<string, number> = {};
    for (const cat of ['bug', 'feature', 'question', 'complaint', 'other']) {
      const countSnap = await db.collection('feedback').where('category', '==', cat).count().get();
      categoryCountsObj[cat] = countSnap.data().count;
    }

    return createSuccessResponse({
      tickets,
      counts,
      categoryCounts: categoryCountsObj,
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return createErrorResponse('Failed to fetch feedback', 500);
  }
}

// PATCH - Update feedback ticket
async function patchHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { ticketId, action, response, priority, assignedTo } = body;

    if (!ticketId) {
      return createErrorResponse('Ticket ID required', 400);
    }

    const db = getDb();

    const ticketDoc = await db.collection('feedback').doc(ticketId).get();
    if (!ticketDoc.exists) {
      return createErrorResponse('Ticket not found', 404);
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
      lastUpdatedBy: context.email,
    };

    // Handle actions
    if (action === 'respond' && response) {
      const currentResponses = ticketDoc.data()?.responses || [];
      updates.responses = [
        ...currentResponses,
        {
          message: response,
          respondedBy: context.email,
          respondedAt: new Date(),
        },
      ];
      updates.status = 'in_progress';
    }

    if (action === 'resolve') {
      updates.status = 'resolved';
      updates.resolvedAt = new Date();
      updates.resolvedBy = context.email;
    }

    if (action === 'close') {
      updates.status = 'closed';
      updates.closedAt = new Date();
    }

    if (action === 'reopen') {
      updates.status = 'open';
    }

    if (priority) {
      updates.priority = priority;
    }

    if (assignedTo) {
      updates.assignedTo = assignedTo;
    }

    await db.collection('feedback').doc(ticketId).update(updates);

    await db.collection('adminLogs').add({
      level: 'info',
      message: `Feedback ticket updated: ${ticketId}`,
      source: 'admin-feedback',
      metadata: { ticketId, action, priority, assignedTo },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Ticket updated successfully',
      ticketId,
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    return createErrorResponse('Failed to update feedback', 500);
  }
}

// POST - Create admin response
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { ticketId, message, sendEmail } = body;

    if (!ticketId || !message) {
      return createErrorResponse('Ticket ID and message required', 400);
    }

    const db = getDb();

    const ticketDoc = await db.collection('feedback').doc(ticketId).get();
    if (!ticketDoc.exists) {
      return createErrorResponse('Ticket not found', 404);
    }

    const ticketData = ticketDoc.data();
    const currentResponses = ticketData?.responses || [];

    await db.collection('feedback').doc(ticketId).update({
      responses: [
        ...currentResponses,
        {
          message,
          respondedBy: context.email,
          respondedAt: new Date(),
          isAdmin: true,
        },
      ],
      status: 'in_progress',
      updatedAt: new Date(),
      lastUpdatedBy: context.email,
    });

    // If user has notifications enabled, send notification
    if (ticketData?.userId) {
      await db.collection('users').doc(ticketData.userId).collection('notifications').add({
        type: 'feedback_response',
        title: 'Response to your feedback',
        body: 'We\'ve responded to your feedback. Tap to view.',
        feedbackId: ticketId,
        createdAt: new Date(),
        read: false,
      });
    }

    await db.collection('adminLogs').add({
      level: 'info',
      message: `Responded to feedback: ${ticketId}`,
      source: 'admin-feedback',
      metadata: { ticketId, sendEmail },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Response sent successfully',
      ticketId,
    });
  } catch (error) {
    console.error('Error responding to feedback:', error);
    return createErrorResponse('Failed to send response', 500);
  }
}

export const GET = withAdminAuth(getHandler);
export const PATCH = withAdminAuth(patchHandler);
export const POST = withAdminAuth(postHandler);
