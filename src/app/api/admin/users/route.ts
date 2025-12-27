/**
 * Admin Users API
 * User management endpoints
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb, getAuth } from '@/lib/firebase-admin';

interface User {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  role?: string;
  isChef?: boolean;
  isBanned?: boolean;
  banReason?: string;
  createdAt?: string;
  lastActiveAt?: string;
}

async function handler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase();
  const role = searchParams.get('role');
  const isChef = searchParams.get('isChef');
  const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 100);
  const startAfter = searchParams.get('startAfter');

  const db = getDb();

  try {
    let query = db.collection('users')
      .orderBy('createdAt', 'desc')
      .limit(limit);

    if (role) {
      query = query.where('role', '==', role);
    }

    if (isChef === 'true') {
      query = query.where('isChef', '==', true);
    }

    if (startAfter) {
      const startAfterDoc = await db.collection('users').doc(startAfter).get();
      if (startAfterDoc.exists) {
        query = query.startAfter(startAfterDoc);
      }
    }

    const snapshot = await query.get();

    let users: User[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        displayName: data.displayName || data.name,
        photoURL: data.photoURL,
        role: data.role || 'user',
        isChef: data.isChef || false,
        isBanned: data.isBanned || false,
        banReason: data.banReason || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        lastActiveAt: data.lastActiveAt?.toDate?.()?.toISOString() || data.lastActiveAt,
      };
    });

    // Client-side search filtering (Firestore doesn't support full-text search)
    if (search) {
      users = users.filter(user =>
        user.email?.toLowerCase().includes(search) ||
        user.displayName?.toLowerCase().includes(search)
      );
    }

    // Get counts - try multiple field names for compatibility
    const totalUsersSnapshot = await db.collection('users').count().get();
    const totalUsers = totalUsersSnapshot.data().count;

    // Count creators - try isChef, isCreator, or role === 'creator'
    let totalChefs = 0;
    try {
      const chefsSnapshot = await db.collection('users')
        .where('isChef', '==', true)
        .count()
        .get();
      totalChefs = chefsSnapshot.data().count;
    } catch {
      try {
        const creatorsSnapshot = await db.collection('users')
          .where('isCreator', '==', true)
          .count()
          .get();
        totalChefs = creatorsSnapshot.data().count;
      } catch {
        // Count from fetched users as fallback
        totalChefs = users.filter(u => u.isChef).length;
      }
    }

    // Count admins
    let totalAdmins = 0;
    try {
      const adminsSnapshot = await db.collection('users')
        .where('role', '==', 'admin')
        .count()
        .get();
      totalAdmins = adminsSnapshot.data().count;
    } catch {
      // Count from fetched users as fallback
      totalAdmins = users.filter(u => u.role === 'admin').length;
    }

    return createSuccessResponse({
      users,
      pagination: {
        limit,
        hasMore: snapshot.docs.length === limit,
        nextCursor: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null,
      },
      counts: {
        total: totalUsers,
        chefs: totalChefs,
        admins: totalAdmins,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return createErrorResponse('Failed to fetch users', 500);
  }
}

// GET single user by ID
async function getUserHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  if (!userId) {
    return createErrorResponse('User ID required', 400);
  }

  const db = getDb();

  try {
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return createErrorResponse('User not found', 404);
    }

    const data = userDoc.data();

    return createSuccessResponse({
      user: {
        id: userDoc.id,
        ...data,
        createdAt: data?.createdAt?.toDate?.()?.toISOString() || data?.createdAt,
        lastActiveAt: data?.lastActiveAt?.toDate?.()?.toISOString() || data?.lastActiveAt,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return createErrorResponse('Failed to fetch user', 500);
  }
}

// PATCH handler for updating user
async function patchHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { userId, updates } = body;

    if (!userId) {
      return createErrorResponse('User ID required', 400);
    }

    // Only allow specific fields to be updated
    const allowedFields = ['role', 'isChef', 'isBanned', 'banReason'];
    const sanitizedUpdates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (field in updates) {
        sanitizedUpdates[field] = updates[field];
      }
    }

    if (Object.keys(sanitizedUpdates).length === 0) {
      return createErrorResponse('No valid fields to update', 400);
    }

    // Add audit trail
    sanitizedUpdates.updatedAt = new Date();
    sanitizedUpdates.updatedBy = context.email;

    const db = getDb();
    await db.collection('users').doc(userId).update(sanitizedUpdates);

    // Log the action
    await db.collection('adminLogs').add({
      level: 'info',
      message: `User ${userId} updated by ${context.email}`,
      source: 'admin-users',
      metadata: { userId, updates: sanitizedUpdates },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'User updated successfully',
      userId,
      updates: sanitizedUpdates,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return createErrorResponse('Failed to update user', 500);
  }
}

// POST handler for sending password reset
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { action, userId, email } = body;

    if (action === 'sendPasswordReset') {
      if (!email) {
        return createErrorResponse('Email required', 400);
      }

      const auth = getAuth();
      const db = getDb();

      // Generate password reset link
      const resetLink = await auth.generatePasswordResetLink(email);

      // Log the action
      await db.collection('adminLogs').add({
        level: 'info',
        message: `Password reset sent to ${email} by ${context.email}`,
        source: 'admin-users',
        metadata: { userId, email, resetLink: resetLink.substring(0, 50) + '...' },
        timestamp: new Date(),
        userId: context.userId,
        userEmail: context.email,
      });

      return createSuccessResponse({
        message: 'Password reset link generated',
        email,
        resetLink,
      });
    }

    return createErrorResponse('Unknown action', 400);
  } catch (error) {
    console.error('Error in POST handler:', error);
    return createErrorResponse('Failed to perform action', 500);
  }
}

// DELETE handler for deleting user
async function deleteHandler(req: NextRequest, context: AdminContext) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return createErrorResponse('User ID required', 400);
    }

    const auth = getAuth();
    const db = getDb();

    // Get user info before deletion for logging
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    // Delete from Firebase Auth
    try {
      await auth.deleteUser(userId);
    } catch (authError: unknown) {
      // User might not exist in Auth but still in Firestore
      console.warn('User not found in Auth, continuing with Firestore deletion:', authError);
    }

    // Delete from Firestore
    await db.collection('users').doc(userId).delete();

    // Also delete related data (optional - can be expanded)
    // Delete user's recipes, posts, etc. in batches if needed

    // Log the action
    await db.collection('adminLogs').add({
      level: 'warn',
      message: `User ${userId} deleted by ${context.email}`,
      source: 'admin-users',
      metadata: {
        userId,
        deletedUserEmail: userData?.email,
        deletedUserName: userData?.displayName || userData?.name,
      },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'User deleted successfully',
      userId,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return createErrorResponse('Failed to delete user', 500);
  }
}

export const GET = withAdminAuth(handler);
export const PATCH = withAdminAuth(patchHandler);
export const POST = withAdminAuth(postHandler);
export const DELETE = withAdminAuth(deleteHandler);
