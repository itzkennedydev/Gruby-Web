/**
 * Admin Settings API
 * Platform configuration and settings management
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

const SETTINGS_DOC_ID = 'platform';

interface PlatformSettings {
  notifications: {
    newApplications: boolean;
    newUsers: boolean;
    errorAlerts: boolean;
    weeklyReport: boolean;
  };
  maintenance: {
    enabled: boolean;
    message: string;
  };
  updatedAt?: string;
  updatedBy?: string;
}

const DEFAULT_SETTINGS: PlatformSettings = {
  notifications: {
    newApplications: true,
    newUsers: false,
    errorAlerts: true,
    weeklyReport: true,
  },
  maintenance: {
    enabled: false,
    message: 'We are currently performing scheduled maintenance. Please check back soon.',
  },
};

// GET - Fetch current settings
async function getHandler(req: NextRequest, context: AdminContext) {
  const db = getDb();

  try {
    const settingsDoc = await db.collection('platformSettings').doc(SETTINGS_DOC_ID).get();

    if (!settingsDoc.exists) {
      // Return default settings if none exist
      return createSuccessResponse({
        settings: DEFAULT_SETTINGS,
        isDefault: true,
      });
    }

    const data = settingsDoc.data();

    return createSuccessResponse({
      settings: {
        notifications: data?.notifications || DEFAULT_SETTINGS.notifications,
        maintenance: data?.maintenance || DEFAULT_SETTINGS.maintenance,
        updatedAt: data?.updatedAt?.toDate?.()?.toISOString() || data?.updatedAt,
        updatedBy: data?.updatedBy,
      },
      isDefault: false,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return createErrorResponse('Failed to fetch settings', 500);
  }
}

// PATCH - Update settings
async function patchHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { section, updates } = body;

    if (!section || !updates) {
      return createErrorResponse('Section and updates required', 400);
    }

    const allowedSections = ['notifications', 'maintenance'];
    if (!allowedSections.includes(section)) {
      return createErrorResponse('Invalid settings section', 400);
    }

    const db = getDb();

    // Prepare update data
    const updateData: Record<string, unknown> = {
      [section]: updates,
      updatedAt: new Date(),
      updatedBy: context.email,
    };

    // Get current settings to merge
    const currentDoc = await db.collection('platformSettings').doc(SETTINGS_DOC_ID).get();
    const currentData = (currentDoc.exists ? currentDoc.data() : DEFAULT_SETTINGS) as Record<string, unknown>;

    // Merge updates
    const sectionData = currentData?.[section] as Record<string, unknown> | undefined;
    const mergedData = {
      ...currentData,
      [section]: { ...sectionData, ...updates },
      updatedAt: new Date(),
      updatedBy: context.email,
    };

    await db.collection('platformSettings').doc(SETTINGS_DOC_ID).set(mergedData);

    // Log the action
    await db.collection('adminLogs').add({
      level: 'info',
      message: `Settings updated: ${section}`,
      source: 'admin-settings',
      metadata: { section, updates },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Settings updated successfully',
      section,
      updates,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return createErrorResponse('Failed to update settings', 500);
  }
}

// POST - Special actions (cache clear, reindex, etc.)
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { action } = body;

    if (!action) {
      return createErrorResponse('Action required', 400);
    }

    const db = getDb();

    switch (action) {
      case 'clearCache': {
        const { cacheType } = body;
        // In a real implementation, this would call Vercel API or other cache services
        // For now, we log the action
        await db.collection('adminLogs').add({
          level: 'info',
          message: `Cache cleared: ${cacheType || 'all'}`,
          source: 'admin-settings',
          metadata: { action, cacheType },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          message: `${cacheType || 'All'} cache cleared successfully`,
          action: 'clearCache',
          cacheType: cacheType || 'all',
        });
      }

      case 'rebuildIndex': {
        // In a real implementation, this would trigger a search index rebuild
        await db.collection('adminLogs').add({
          level: 'info',
          message: 'Search index rebuild triggered',
          source: 'admin-settings',
          metadata: { action },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          message: 'Search index rebuild triggered',
          action: 'rebuildIndex',
        });
      }

      case 'regenerateApiKey': {
        const { keyType } = body;
        // In a real implementation, this would generate new API keys
        // For now, we log the action and return a mock key
        const mockKey = keyType === 'production'
          ? `grb_live_${generateRandomString(24)}`
          : `grb_test_${generateRandomString(24)}`;

        await db.collection('adminLogs').add({
          level: 'warning',
          message: `API key regenerated: ${keyType}`,
          source: 'admin-settings',
          metadata: { action, keyType },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          message: `${keyType} API key regenerated`,
          action: 'regenerateApiKey',
          keyType,
          // In production, you'd store this securely and only show once
          hint: 'Key starts with: ' + mockKey.substring(0, 12) + '...',
        });
      }

      default:
        return createErrorResponse('Unknown action', 400);
    }
  } catch (error) {
    console.error('Error performing action:', error);
    return createErrorResponse('Failed to perform action', 500);
  }
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const GET = withAdminAuth(getHandler);
export const PATCH = withAdminAuth(patchHandler);
export const POST = withAdminAuth(postHandler);
