/**
 * Admin API for managing gatherings
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { withAdminAuth, AdminContext } from '@/lib/admin-middleware';

interface Gathering {
  id: string;
  title: string;
  description?: string;
  hostId: string;
  hostDisplayName?: string;
  hostPhotoURL?: string;
  startTime: string;
  endTime?: string;
  location?: {
    city?: string;
    state?: string;
    address?: string;
  };
  type: string;
  maxParticipants: number;
  currentParticipants: number;
  coverImageUrl?: string;
  isPrivate: boolean;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
}

// GET - List all gatherings with pagination
async function handleGet(request: NextRequest, _context: AdminContext) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '25');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const startAfter = searchParams.get('startAfter') || null;

    const db = getDb();
    let query = db.collection('gatherings')
      .orderBy('createdAt', 'desc')
      .limit(limit + 1);

    if (startAfter) {
      const startDoc = await db.collection('gatherings').doc(startAfter).get();
      if (startDoc.exists) {
        query = query.startAfter(startDoc);
      }
    }

    const snapshot = await query.get();
    const gatherings: Gathering[] = [];
    let hasMore = false;
    let nextCursor: string | null = null;

    const docs = snapshot.docs;
    if (docs.length > limit) {
      hasMore = true;
      docs.pop();
    }

    for (const doc of docs) {
      const data = doc.data();

      // Filter by search term
      if (search) {
        const searchLower = search.toLowerCase();
        const titleMatch = data.title?.toLowerCase().includes(searchLower);
        const hostMatch = data.hostDisplayName?.toLowerCase().includes(searchLower);
        if (!titleMatch && !hostMatch) continue;
      }

      // Filter by status
      if (status && data.status !== status) continue;

      gatherings.push({
        id: doc.id,
        title: data.title || 'Untitled Gathering',
        description: data.description,
        hostId: data.hostId,
        hostDisplayName: data.hostDisplayName || 'Unknown Host',
        hostPhotoURL: data.hostPhotoURL,
        startTime: data.startTime?.toDate?.()?.toISOString() || new Date().toISOString(),
        endTime: data.endTime?.toDate?.()?.toISOString(),
        location: data.location,
        type: data.type || 'gathering',
        maxParticipants: data.maxParticipants || 10,
        currentParticipants: data.currentParticipants || 0,
        coverImageUrl: data.coverImageUrl,
        isPrivate: data.isPrivate || false,
        status: data.status || 'published',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      });
    }

    if (hasMore && docs.length > 0) {
      nextCursor = docs[docs.length - 1].id;
    }

    // Get counts
    const totalSnapshot = await db.collection('gatherings').count().get();
    const total = totalSnapshot.data().count;

    const publishedSnapshot = await db.collection('gatherings')
      .where('status', '==', 'published')
      .count().get();
    const published = publishedSnapshot.data().count;

    const cancelledSnapshot = await db.collection('gatherings')
      .where('status', '==', 'cancelled')
      .count().get();
    const cancelled = cancelledSnapshot.data().count;

    return NextResponse.json({
      success: true,
      data: {
        gatherings,
        pagination: {
          limit,
          hasMore,
          nextCursor,
        },
        counts: {
          total,
          published,
          cancelled,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching gatherings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gatherings' },
      { status: 500 }
    );
  }
}

// PATCH - Update gathering status
async function handlePatch(request: NextRequest, _context: AdminContext) {
  try {
    const body = await request.json();
    const { gatheringId, updates } = body;

    if (!gatheringId) {
      return NextResponse.json(
        { success: false, error: 'Gathering ID is required' },
        { status: 400 }
      );
    }

    const db = getDb();
    const gatheringRef = db.collection('gatherings').doc(gatheringId);
    const gatheringDoc = await gatheringRef.get();

    if (!gatheringDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Gathering not found' },
        { status: 404 }
      );
    }

    // Only allow updating specific fields
    const allowedUpdates: Record<string, any> = {};
    if (updates.status) allowedUpdates.status = updates.status;
    if (updates.isPrivate !== undefined) allowedUpdates.isPrivate = updates.isPrivate;
    if (updates.moderationNote) allowedUpdates.moderationNote = updates.moderationNote;

    await gatheringRef.update({
      ...allowedUpdates,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Gathering updated successfully',
    });
  } catch (error) {
    console.error('Error updating gathering:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gathering' },
      { status: 500 }
    );
  }
}

// DELETE - Delete gathering
async function handleDelete(request: NextRequest, _context: AdminContext) {
  try {
    const { searchParams } = new URL(request.url);
    const gatheringId = searchParams.get('gatheringId');

    if (!gatheringId) {
      return NextResponse.json(
        { success: false, error: 'Gathering ID is required' },
        { status: 400 }
      );
    }

    const db = getDb();
    const gatheringRef = db.collection('gatherings').doc(gatheringId);
    const gatheringDoc = await gatheringRef.get();

    if (!gatheringDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Gathering not found' },
        { status: 404 }
      );
    }

    // Delete subcollections first
    const subcollections = ['participants', 'messages', 'tasks'];
    for (const subcollection of subcollections) {
      const subSnapshot = await gatheringRef.collection(subcollection).get();
      const batch = db.batch();
      subSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      if (subSnapshot.docs.length > 0) {
        await batch.commit();
      }
    }

    // Delete the gathering document
    await gatheringRef.delete();

    return NextResponse.json({
      success: true,
      message: 'Gathering deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting gathering:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gathering' },
      { status: 500 }
    );
  }
}

// Export wrapped handlers with admin authentication
export const GET = withAdminAuth(handleGet);
export const PATCH = withAdminAuth(handlePatch);
export const DELETE = withAdminAuth(handleDelete);
