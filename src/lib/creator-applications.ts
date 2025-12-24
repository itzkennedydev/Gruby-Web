/**
 * Creator Applications Service
 * Server-side service for managing creator applications
 */

import { getDb } from './firebase-admin';
import type {
  CreatorApplication,
  CreatorApplicationStatus,
} from '@/types/creator-application';

/**
 * Get all creator applications with optional status filter
 */
export async function getCreatorApplications(
  status?: CreatorApplicationStatus
): Promise<CreatorApplication[]> {
  const db = getDb();
  let query = db.collection('creatorApplications').orderBy('createdAt', 'desc');

  if (status) {
    query = db
      .collection('creatorApplications')
      .where('status', '==', status)
      .orderBy('createdAt', 'asc');
  }

  const snapshot = await query.limit(100).get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      userEmail: data.userEmail,
      userDisplayName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      status: data.status,
      reason: data.reason,
      experience: data.experience,
      specialties: data.specialties || [],
      socialLinks: data.socialLinks || [],
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      reviewedAt: data.reviewedAt?.toDate(),
      reviewedBy: data.reviewedBy,
      reviewerName: data.reviewerName,
      reviewNotes: data.reviewNotes,
      rejectionReason: data.rejectionReason,
    } as CreatorApplication;
  });
}

/**
 * Get application statistics
 */
export async function getApplicationStats(): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}> {
  const db = getDb();

  const [pendingSnap, approvedSnap, rejectedSnap] = await Promise.all([
    db.collection('creatorApplications').where('status', '==', 'pending').count().get(),
    db.collection('creatorApplications').where('status', '==', 'approved').count().get(),
    db.collection('creatorApplications').where('status', '==', 'rejected').count().get(),
  ]);

  const pending = pendingSnap.data().count;
  const approved = approvedSnap.data().count;
  const rejected = rejectedSnap.data().count;

  return {
    pending,
    approved,
    rejected,
    total: pending + approved + rejected,
  };
}

/**
 * Approve a creator application
 */
export async function approveApplication(
  applicationId: string,
  adminUserId: string,
  adminName: string,
  notes?: string
): Promise<void> {
  const db = getDb();
  const batch = db.batch();

  // Get the application
  const appRef = db.collection('creatorApplications').doc(applicationId);
  const appDoc = await appRef.get();

  if (!appDoc.exists) {
    throw new Error('Application not found');
  }

  const appData = appDoc.data()!;

  // Update application status
  batch.update(appRef, {
    status: 'approved',
    reviewedAt: new Date(),
    reviewedBy: adminUserId,
    reviewerName: adminName,
    reviewNotes: notes || null,
    updatedAt: new Date(),
  });

  // Update user to be a chef/creator
  const userRef = db.collection('users').doc(appData.userId);
  batch.update(userRef, {
    isChef: true,
    role: 'chef',
    updatedAt: new Date(),
  });

  await batch.commit();
}

/**
 * Reject a creator application
 */
export async function rejectApplication(
  applicationId: string,
  adminUserId: string,
  adminName: string,
  rejectionReason: string,
  notes?: string
): Promise<void> {
  const db = getDb();

  const appRef = db.collection('creatorApplications').doc(applicationId);
  const appDoc = await appRef.get();

  if (!appDoc.exists) {
    throw new Error('Application not found');
  }

  await appRef.update({
    status: 'rejected',
    rejectionReason,
    reviewedAt: new Date(),
    reviewedBy: adminUserId,
    reviewerName: adminName,
    reviewNotes: notes || null,
    updatedAt: new Date(),
  });
}

/**
 * Get a single application by ID
 */
export async function getApplicationById(
  applicationId: string
): Promise<CreatorApplication | null> {
  const db = getDb();
  const doc = await db.collection('creatorApplications').doc(applicationId).get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data()!;
  return {
    id: doc.id,
    userId: data.userId,
    userEmail: data.userEmail,
    userDisplayName: data.userDisplayName,
    userPhotoURL: data.userPhotoURL,
    status: data.status,
    reason: data.reason,
    experience: data.experience,
    specialties: data.specialties || [],
    socialLinks: data.socialLinks || [],
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    reviewedAt: data.reviewedAt?.toDate(),
    reviewedBy: data.reviewedBy,
    reviewerName: data.reviewerName,
    reviewNotes: data.reviewNotes,
    rejectionReason: data.rejectionReason,
  } as CreatorApplication;
}
