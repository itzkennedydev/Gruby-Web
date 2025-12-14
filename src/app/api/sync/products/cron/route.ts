/**
 * Cron job endpoint for automated daily product syncing
 * Triggered by Vercel Cron at 2 AM daily
 * 
 * This endpoint is called by Vercel's cron system, not by users
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verify this is coming from Vercel Cron
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || process.env.SYNC_API_SECRET;
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Call the sync API internally
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';
    const response = await fetch(`${baseUrl}/api/sync/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SYNC_API_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 100, // Sync 100 recipes per day
        force: false, // Use smart confidence checking
      }),
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Cron job executed successfully',
      syncResult: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Cron job failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
