/**
 * Admin Logs API
 * Fetch and manage application logs
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: string;
  source: string;
  metadata?: Record<string, unknown>;
  userId?: string;
  userEmail?: string;
}

async function handler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get('level');
  const source = searchParams.get('source');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
  const startAfter = searchParams.get('startAfter');

  const db = getDb();

  try {
    // Build query
    let query = db.collection('adminLogs')
      .orderBy('timestamp', 'desc')
      .limit(limit);

    if (level && ['info', 'warn', 'error', 'debug'].includes(level)) {
      query = query.where('level', '==', level);
    }

    if (source) {
      query = query.where('source', '==', source);
    }

    if (startAfter) {
      const startAfterDoc = await db.collection('adminLogs').doc(startAfter).get();
      if (startAfterDoc.exists) {
        query = query.startAfter(startAfterDoc);
      }
    }

    const snapshot = await query.get();

    const logs: LogEntry[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp,
    })) as LogEntry[];

    // Get log sources for filtering
    const sourcesSnapshot = await db.collection('adminLogs')
      .orderBy('source')
      .limit(100)
      .get();

    const sources = [...new Set(sourcesSnapshot.docs.map(d => d.data().source).filter(Boolean))];

    // Get log counts by level
    const levelCounts = {
      info: 0,
      warn: 0,
      error: 0,
      debug: 0,
    };

    // Count recent errors (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentErrorsSnapshot = await db.collection('adminLogs')
      .where('level', '==', 'error')
      .where('timestamp', '>=', oneDayAgo)
      .count()
      .get();
    const recentErrors = recentErrorsSnapshot.data().count;

    return createSuccessResponse({
      logs,
      pagination: {
        limit,
        hasMore: logs.length === limit,
        nextCursor: logs.length > 0 ? logs[logs.length - 1].id : null,
      },
      filters: {
        sources,
        levels: ['info', 'warn', 'error', 'debug'],
      },
      stats: {
        recentErrors,
        levelCounts,
      },
    });
  } catch (error) {
    console.error('Error fetching logs:', error);

    // If collection doesn't exist, return empty with helpful message
    return createSuccessResponse({
      logs: [],
      pagination: { limit, hasMore: false, nextCursor: null },
      filters: { sources: [], levels: ['info', 'warn', 'error', 'debug'] },
      stats: { recentErrors: 0, levelCounts: { info: 0, warn: 0, error: 0, debug: 0 } },
      message: 'No logs collection found. Logs will appear here once the adminLogs collection is populated.',
    });
  }
}

// POST handler for creating log entries (for client-side error reporting)
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { level, message, source, metadata } = body;

    if (!level || !message) {
      return createErrorResponse('level and message are required', 400);
    }

    if (!['info', 'warn', 'error', 'debug'].includes(level)) {
      return createErrorResponse('Invalid log level', 400);
    }

    const db = getDb();
    const logEntry = {
      level,
      message,
      source: source || 'admin-dashboard',
      metadata: metadata || {},
      userId: context.userId,
      userEmail: context.email,
      timestamp: new Date(),
      createdBy: context.email,
    };

    const docRef = await db.collection('adminLogs').add(logEntry);

    return createSuccessResponse({
      id: docRef.id,
      message: 'Log entry created',
    });
  } catch (error) {
    console.error('Error creating log:', error);
    return createErrorResponse('Failed to create log entry', 500);
  }
}

export const GET = withAdminAuth(handler);
export const POST = withAdminAuth(postHandler);
