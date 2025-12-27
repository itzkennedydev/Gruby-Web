/**
 * API route to fetch gathering data by ID
 * Used by the shared gathering web page
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';

interface GatheringDoc {
  title?: string;
  description?: string;
  hostId?: string;
  hostDisplayName?: string;
  hostPhotoURL?: string;
  startTime?: FirebaseFirestore.Timestamp;
  location?: {
    city?: string;
    state?: string;
    address?: string;
  };
  type?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  coverImageUrl?: string;
  isPrivate?: boolean;
  safety?: {
    ageRating?: string;
    contentWarnings?: string[];
    customContentWarning?: string;
    customContentWarningEmoji?: string;
  };
  recipes?: Array<{
    imageUrl?: string;
    title?: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gatheringId = params.id;

    if (!gatheringId) {
      return NextResponse.json(
        { error: 'Gathering ID is required' },
        { status: 400 }
      );
    }

    const db = getDb();
    const gatheringDoc = await db.collection('gatherings').doc(gatheringId).get();

    if (!gatheringDoc.exists) {
      return NextResponse.json(
        { error: 'Gathering not found' },
        { status: 404 }
      );
    }

    const data = gatheringDoc.data() as GatheringDoc;

    // Get host info if not embedded in gathering
    let hostDisplayName = data.hostDisplayName || 'Host';
    let hostPhotoURL = data.hostPhotoURL;

    if (data.hostId && (!data.hostDisplayName || !data.hostPhotoURL)) {
      try {
        const userDoc = await db.collection('users').doc(data.hostId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          hostDisplayName = userData?.displayName || hostDisplayName;
          hostPhotoURL = userData?.photoURL || hostPhotoURL;
        }
      } catch (error) {
        console.error('Error fetching host profile:', error);
      }
    }

    // Get participant count if not embedded
    let currentParticipants = data.currentParticipants || 0;

    if (!data.currentParticipants) {
      try {
        const participantsSnapshot = await db
          .collection('gatherings')
          .doc(gatheringId)
          .collection('participants')
          .get();
        currentParticipants = participantsSnapshot.size;
      } catch (error) {
        console.error('Error fetching participant count:', error);
      }
    }

    // Get a valid cover image URL
    // Priority: coverImageUrl (if valid URL) > first recipe image > undefined
    let coverImageUrl = data.coverImageUrl;

    // Check if coverImageUrl is a local file URI (invalid for web)
    if (coverImageUrl && (coverImageUrl.startsWith('file://') || coverImageUrl.startsWith('ph://'))) {
      coverImageUrl = undefined; // Invalid for web display
    }

    // Fall back to first recipe image if no valid cover image
    if (!coverImageUrl && data.recipes && data.recipes.length > 0) {
      const recipeWithImage = data.recipes.find(r => r.imageUrl && !r.imageUrl.startsWith('file://'));
      if (recipeWithImage) {
        coverImageUrl = recipeWithImage.imageUrl;
      }
    }

    // Format response
    const gathering = {
      id: gatheringId,
      title: data.title || 'Gathering',
      description: data.description,
      hostDisplayName,
      hostPhotoURL,
      startTime: data.startTime?.toDate?.()?.toISOString() || new Date().toISOString(),
      location: data.location || {},
      type: data.type || 'gathering',
      maxParticipants: data.maxParticipants || 10,
      currentParticipants,
      coverImageUrl,
      isPrivate: data.isPrivate || false,
      safety: data.safety,
    };

    return NextResponse.json(gathering);
  } catch (error) {
    console.error('Error fetching gathering:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gathering' },
      { status: 500 }
    );
  }
}
