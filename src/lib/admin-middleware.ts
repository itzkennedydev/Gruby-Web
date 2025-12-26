/**
 * Admin API Middleware
 * Provides secure authentication and rate limiting for admin API routes
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from './rate-limiter';

// Approved admin emails - keep in sync with admin layout
const APPROVED_ADMIN_EMAILS = [
  'itskennedy.dev@gmail.com',
];

export interface AdminContext {
  userId: string;
  email: string;
  name: string | null;
}

interface AdminAuthResult {
  success: boolean;
  context?: AdminContext;
  error?: string;
  status?: number;
}

/**
 * Verify admin authentication for API routes
 */
export async function verifyAdminAuth(req: NextRequest): Promise<AdminAuthResult> {
  try {
    // Check rate limit first
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(`admin:${ip}`, {
      windowMs: 60000, // 1 minute
      maxRequests: 60  // 60 requests per minute
    });

    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        status: 429,
      };
    }

    // Verify Clerk authentication
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: 'Authentication required',
        status: 401,
      };
    }

    // Get user details
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        status: 401,
      };
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return {
        success: false,
        error: 'Email not found',
        status: 401,
      };
    }

    // Verify email is in approved list
    if (!APPROVED_ADMIN_EMAILS.includes(email)) {
      // Log unauthorized access attempt
      console.warn(`Unauthorized admin access attempt from: ${email}`);
      return {
        success: false,
        error: 'Access denied. Your account is not authorized.',
        status: 403,
      };
    }

    return {
      success: true,
      context: {
        userId,
        email,
        name: user.fullName,
      },
    };
  } catch (error) {
    console.error('Admin auth error:', error);
    return {
      success: false,
      error: 'Authentication failed',
      status: 500,
    };
  }
}

/**
 * Create error response with consistent format
 */
export function createErrorResponse(error: string, status: number = 400): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Create success response with consistent format
 */
export function createSuccessResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Wrap an admin API handler with authentication
 */
export function withAdminAuth(
  handler: (req: NextRequest, context: AdminContext) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const authResult = await verifyAdminAuth(req);

    if (!authResult.success || !authResult.context) {
      return createErrorResponse(
        authResult.error || 'Unauthorized',
        authResult.status || 401
      );
    }

    try {
      return await handler(req, authResult.context);
    } catch (error) {
      console.error('Admin API error:', error);
      return createErrorResponse('Internal server error', 500);
    }
  };
}

/**
 * Add approved admin email
 */
export function addApprovedAdmin(email: string): void {
  if (!APPROVED_ADMIN_EMAILS.includes(email)) {
    APPROVED_ADMIN_EMAILS.push(email);
  }
}

/**
 * Check if email is approved admin
 */
export function isApprovedAdmin(email: string): boolean {
  return APPROVED_ADMIN_EMAILS.includes(email);
}
