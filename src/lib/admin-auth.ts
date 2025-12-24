/**
 * Admin Authentication Utilities
 * Server-side utilities for verifying admin access
 */

import { getDb } from './firebase-admin';
import { cookies } from 'next/headers';

/**
 * Verify if a user is an admin
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const db = getDb();
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return false;
    }

    const userData = userDoc.data();
    return userData?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Get admin session from cookies
 * Returns the user ID if valid admin session exists
 */
export async function getAdminSession(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie?.value) {
      return null;
    }

    // In production, verify the session token properly
    // For now, we'll use a simple approach
    const userId = sessionCookie.value;

    if (await isUserAdmin(userId)) {
      return userId;
    }

    return null;
  } catch (error) {
    console.error('Error getting admin session:', error);
    return null;
  }
}

/**
 * Get all admins for notifications
 */
export async function getAdminUserIds(): Promise<string[]> {
  try {
    const db = getDb();
    const adminsSnapshot = await db
      .collection('users')
      .where('role', '==', 'admin')
      .get();

    return adminsSnapshot.docs.map(doc => doc.id);
  } catch (error) {
    console.error('Error getting admin users:', error);
    return [];
  }
}
