/**
 * Cron job endpoint for automated daily product syncing
 * Triggered by Vercel Cron at 2 AM daily
 */

import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Verify this is coming from Vercel Cron (uses special header)
    const cronHeader = request.headers.get('x-vercel-cron');
    
    // Also allow manual triggers with Bearer token for testing
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || process.env.SYNC_API_SECRET;
    
    // Accept either Vercel cron header OR valid Bearer token
    const isVercelCron = cronHeader === '1' || cronHeader === 'true';
    const isAuthorized = authHeader === `Bearer ${cronSecret}`;
    
    if (!isVercelCron && !isAuthorized) {
      console.log('Cron auth failed:', { cronHeader, hasAuth: !!authHeader });
      return NextResponse.json(
        { error: 'Unauthorized - Not from Vercel Cron or missing valid token' },
        { status: 401 }
      );
    }

    // Build internal API URL with bypass parameter for Vercel Authentication
    const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3005';
    
    // Add bypass parameter to URL if available
    const apiUrl = bypassSecret 
      ? `${baseUrl}/api/sync/products?x-vercel-protection-bypass=${bypassSecret}`
      : `${baseUrl}/api/sync/products`;
      
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SYNC_API_SECRET}`,
        'Content-Type': 'application/json',
        // Also send bypass in header
        ...(bypassSecret && { 'x-vercel-protection-bypass': bypassSecret }),
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
      triggeredBy: cronHeader ? 'Vercel Cron' : 'Manual trigger',
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
