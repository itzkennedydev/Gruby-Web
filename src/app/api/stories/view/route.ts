/**
 * Story View Tracking API
 *
 * Increments the view count for a story when viewed on the web.
 * Uses IP-based deduplication to prevent abuse.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// Simple in-memory rate limiting (per IP + story combination)
const viewedStories = new Map<string, number>();
const VIEW_COOLDOWN = 60 * 60 * 1000; // 1 hour cooldown per IP per story

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { storyId } = body;

    if (!storyId || typeof storyId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid story ID' },
        { status: 400 }
      );
    }

    // Rate limiting based on IP + story combination
    const clientIp = getClientIp(request);
    const viewKey = `${clientIp}:${storyId}`;
    const lastViewed = viewedStories.get(viewKey);
    const now = Date.now();

    if (lastViewed && now - lastViewed < VIEW_COOLDOWN) {
      // Already counted this view recently, return success but don't increment
      return NextResponse.json({
        success: true,
        message: 'View already counted',
      });
    }

    // Update the view record
    viewedStories.set(viewKey, now);

    // Clean up old entries periodically (every 100 requests)
    if (viewedStories.size > 10000) {
      const cutoff = now - VIEW_COOLDOWN;
      for (const [key, timestamp] of viewedStories.entries()) {
        if (timestamp < cutoff) {
          viewedStories.delete(key);
        }
      }
    }

    // Increment view count in Firebase
    const db = getDb();
    const storyRef = db.collection('stories').doc(storyId);

    // Check if story exists first
    const storyDoc = await storyRef.get();
    if (!storyDoc.exists) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    // Increment the views count
    await storyRef.update({
      views: FieldValue.increment(1),
    });

    return NextResponse.json({
      success: true,
      message: 'View counted',
    });
  } catch (error) {
    console.error('Error tracking story view:', error);
    return NextResponse.json(
      { error: 'Failed to track view' },
      { status: 500 }
    );
  }
}
