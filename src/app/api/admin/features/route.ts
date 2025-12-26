/**
 * Admin Feature Flags API
 * Manage feature toggles and A/B tests
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb } from '@/lib/firebase-admin';

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetPlatforms: string[];
  targetUserGroups: string[];
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

const DEFAULT_FLAGS: Omit<FeatureFlag, 'id' | 'createdAt' | 'updatedAt' | 'updatedBy'>[] = [
  {
    name: 'gatherings',
    description: 'Enable gathering/event feature',
    enabled: true,
    rolloutPercentage: 100,
    targetPlatforms: ['ios', 'android', 'web'],
    targetUserGroups: ['all'],
  },
  {
    name: 'ai_recommendations',
    description: 'AI-powered recipe recommendations',
    enabled: true,
    rolloutPercentage: 100,
    targetPlatforms: ['ios', 'android'],
    targetUserGroups: ['all'],
  },
  {
    name: 'circles',
    description: 'Friend circles feature',
    enabled: false,
    rolloutPercentage: 0,
    targetPlatforms: ['ios', 'android'],
    targetUserGroups: ['beta'],
  },
  {
    name: 'budget_coach',
    description: 'Budget coaching and tips',
    enabled: true,
    rolloutPercentage: 100,
    targetPlatforms: ['ios', 'android', 'web'],
    targetUserGroups: ['all'],
  },
  {
    name: 'video_recipes',
    description: 'Video recipe uploads',
    enabled: false,
    rolloutPercentage: 0,
    targetPlatforms: ['ios', 'android'],
    targetUserGroups: ['creators'],
  },
  {
    name: 'social_sharing',
    description: 'Social media sharing features',
    enabled: true,
    rolloutPercentage: 100,
    targetPlatforms: ['ios', 'android', 'web'],
    targetUserGroups: ['all'],
  },
  {
    name: 'dark_mode',
    description: 'Dark mode theme option',
    enabled: true,
    rolloutPercentage: 100,
    targetPlatforms: ['ios', 'android'],
    targetUserGroups: ['all'],
  },
  {
    name: 'macro_tracking',
    description: 'Macro nutrient tracking',
    enabled: true,
    rolloutPercentage: 100,
    targetPlatforms: ['ios', 'android'],
    targetUserGroups: ['all'],
  },
  {
    name: 'grocery_integration',
    description: 'Kroger grocery store integration',
    enabled: true,
    rolloutPercentage: 100,
    targetPlatforms: ['ios', 'android'],
    targetUserGroups: ['all'],
  },
  {
    name: 'maintenance_mode',
    description: 'Put app in maintenance mode',
    enabled: false,
    rolloutPercentage: 0,
    targetPlatforms: ['ios', 'android', 'web'],
    targetUserGroups: ['all'],
  },
];

// GET - Fetch all feature flags
async function getHandler(req: NextRequest, context: AdminContext) {
  const db = getDb();

  try {
    const snapshot = await db.collection('featureFlags').get();

    let flags: FeatureFlag[] = [];

    if (snapshot.empty) {
      // Initialize default flags
      const batch = db.batch();
      for (const flag of DEFAULT_FLAGS) {
        const docRef = db.collection('featureFlags').doc(flag.name);
        batch.set(docRef, {
          ...flag,
          createdAt: new Date(),
          updatedAt: new Date(),
          updatedBy: 'system',
        });
      }
      await batch.commit();

      flags = DEFAULT_FLAGS.map(flag => ({
        ...flag,
        id: flag.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: 'system',
      }));
    } else {
      flags = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          enabled: data.enabled,
          rolloutPercentage: data.rolloutPercentage || 100,
          targetPlatforms: data.targetPlatforms || ['ios', 'android', 'web'],
          targetUserGroups: data.targetUserGroups || ['all'],
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
          updatedBy: data.updatedBy,
        };
      });
    }

    // Sort by name
    flags.sort((a, b) => a.name.localeCompare(b.name));

    return createSuccessResponse({
      flags,
      platforms: ['ios', 'android', 'web'],
      userGroups: ['all', 'beta', 'creators', 'admins'],
    });
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return createErrorResponse('Failed to fetch feature flags', 500);
  }
}

// PATCH - Update a feature flag
async function patchHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { flagId, updates } = body;

    if (!flagId) {
      return createErrorResponse('Flag ID required', 400);
    }

    const allowedFields = ['enabled', 'rolloutPercentage', 'targetPlatforms', 'targetUserGroups', 'description'];
    const sanitizedUpdates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (field in updates) {
        sanitizedUpdates[field] = updates[field];
      }
    }

    if (Object.keys(sanitizedUpdates).length === 0) {
      return createErrorResponse('No valid fields to update', 400);
    }

    sanitizedUpdates.updatedAt = new Date();
    sanitizedUpdates.updatedBy = context.email;

    const db = getDb();

    await db.collection('featureFlags').doc(flagId).update(sanitizedUpdates);

    await db.collection('adminLogs').add({
      level: 'info',
      message: `Feature flag updated: ${flagId}`,
      source: 'admin-features',
      metadata: { flagId, updates: sanitizedUpdates },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Feature flag updated',
      flagId,
      updates: sanitizedUpdates,
    });
  } catch (error) {
    console.error('Error updating feature flag:', error);
    return createErrorResponse('Failed to update feature flag', 500);
  }
}

// POST - Create a new feature flag
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { name, description, enabled, rolloutPercentage, targetPlatforms, targetUserGroups } = body;

    if (!name) {
      return createErrorResponse('Flag name required', 400);
    }

    const db = getDb();

    // Check if flag already exists
    const existing = await db.collection('featureFlags').doc(name).get();
    if (existing.exists) {
      return createErrorResponse('Feature flag already exists', 409);
    }

    const flagData = {
      name,
      description: description || '',
      enabled: enabled ?? false,
      rolloutPercentage: rolloutPercentage ?? 0,
      targetPlatforms: targetPlatforms || ['ios', 'android', 'web'],
      targetUserGroups: targetUserGroups || ['all'],
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: context.email,
    };

    await db.collection('featureFlags').doc(name).set(flagData);

    await db.collection('adminLogs').add({
      level: 'info',
      message: `Feature flag created: ${name}`,
      source: 'admin-features',
      metadata: { name, flagData },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Feature flag created',
      flagId: name,
    });
  } catch (error) {
    console.error('Error creating feature flag:', error);
    return createErrorResponse('Failed to create feature flag', 500);
  }
}

// DELETE - Delete a feature flag
async function deleteHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const flagId = searchParams.get('id');

  if (!flagId) {
    return createErrorResponse('Flag ID required', 400);
  }

  const db = getDb();

  try {
    await db.collection('featureFlags').doc(flagId).delete();

    await db.collection('adminLogs').add({
      level: 'warning',
      message: `Feature flag deleted: ${flagId}`,
      source: 'admin-features',
      metadata: { flagId },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Feature flag deleted',
      flagId,
    });
  } catch (error) {
    console.error('Error deleting feature flag:', error);
    return createErrorResponse('Failed to delete feature flag', 500);
  }
}

export const GET = withAdminAuth(getHandler);
export const PATCH = withAdminAuth(patchHandler);
export const POST = withAdminAuth(postHandler);
export const DELETE = withAdminAuth(deleteHandler);
