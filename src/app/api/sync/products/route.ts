/**
 * Enhanced Background Product Sync API Route with:
 * - Rate limiting
 * - Intelligent caching
 * - Confidence scoring
 * - Smart update logic
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { batchSearchProducts } from '@/lib/kroger-api';
import { checkRateLimit } from '@/lib/rate-limiter';
import {
  calculateConfidenceScore,
  getCachedProduct,
  cacheProduct,
  shouldUpdateIngredient,
} from '@/lib/product-sync-utils';

// Collections
const SYNC_HISTORY_COLLECTION = 'productSyncHistory';
const RECIPES_COLLECTION = 'recipes';

interface SyncRequest {
  recipeIds?: string[];
  locationId?: string;
  limit?: number;
  force?: boolean; // Skip confidence checks
}

interface SyncResult {
  success: boolean;
  message: string;
  recipesProcessed: number;
  productsUpdated: number;
  productsSkipped: number;
  cacheHits: number;
  errors: string[];
  timestamp: string;
}

interface Recipe {
  id: string;
  ingredients?: any[];
  [key: string]: any;
}

/**
 * Authenticate the request
 */
function authenticateRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const expectedSecret = process.env.SYNC_API_SECRET;

  if (!expectedSecret) {
    console.error('SYNC_API_SECRET not configured');
    return false;
  }

  if (!authHeader) {
    return false;
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  return token === expectedSecret;
}

/**
 * Get client identifier for rate limiting
 */
function getClientIdentifier(request: NextRequest): string {
  // Use IP or auth token as identifier
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

/**
 * Get recipe data from Firestore
 */
async function getRecipes(recipeIds?: string[], limit: number = 50): Promise<Recipe[]> {
  try {
    if (recipeIds && recipeIds.length > 0) {
      const recipePromises = recipeIds.map(id => 
        db.collection(RECIPES_COLLECTION).doc(id).get()
      );
      const recipeDocs = await Promise.all(recipePromises);
      return recipeDocs
        .filter(doc => doc.exists)
        .map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
    } else {
      const snapshot = await db.collection(RECIPES_COLLECTION)
        .limit(limit)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

/**
 * Update recipe with product prices (smart version)
 */
async function updateRecipeProducts(
  recipeId: string,
  ingredients: any[],
  locationId: string,
  force: boolean = false
) {
  try {
    const ingredientNames = ingredients.map((ing: any) => ing.name).filter(Boolean);
    
    if (ingredientNames.length === 0) {
      return { updated: false, count: 0, skipped: 0, cacheHits: 0, reason: 'No ingredients found' };
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let cacheHitCount = 0;
    
    const updatedIngredients = await Promise.all(
      ingredients.map(async (ingredient: any) => {
        if (!ingredient.name) return ingredient;

        // Check cache first
        let product = await getCachedProduct(ingredient.name, locationId);
        if (product) {
          cacheHitCount++;
        } else {
          // Search Kroger API
          const results = await batchSearchProducts([ingredient.name], locationId);
          const products = results.get(ingredient.name);
          
          if (products && products.length > 0) {
            product = products[0];
            // Cache the result
            await cacheProduct(ingredient.name, locationId, product);
          }
        }

        if (!product) return ingredient;

        const item = product.items?.[0];
        if (!item?.price) return ingredient;

        // Calculate confidence score
        const confidence = calculateConfidenceScore(
          ingredient.name,
          product.description || product.productId
        );

        // Check if we should update
        if (!force && !shouldUpdateIngredient(ingredient, product, confidence)) {
          skippedCount++;
          return ingredient;
        }

        updatedCount++;
        return {
          ...ingredient,
          krogerProductId: product.productId,
          krogerPrice: item.price.promo || item.price.regular,
          krogerRegularPrice: item.price.regular,
          krogerPromoPrice: item.price.promo || null,
          krogerImageUrl: product.images?.[0]?.sizes[0]?.url || null,
          krogerSize: item.size || null,
          confidenceScore: confidence,
          lastUpdated: new Date().toISOString(),
        };
      })
    );

    // Update recipe in Firestore
    if (updatedCount > 0) {
      await db.collection(RECIPES_COLLECTION).doc(recipeId).update({
        ingredients: updatedIngredients,
        productDataLastSynced: new Date().toISOString(),
      });
    }

    return {
      updated: updatedCount > 0,
      count: updatedCount,
      skipped: skippedCount,
      cacheHits: cacheHitCount,
    };
  } catch (error) {
    console.error(`Error updating recipe ${recipeId}:`, error);
    throw error;
  }
}

/**
 * Log sync history
 */
async function logSyncHistory(result: SyncResult) {
  try {
    await db.collection(SYNC_HISTORY_COLLECTION).add({
      ...result,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error logging sync history:', error);
  }
}

/**
 * POST handler - Run sync
 */
export async function POST(request: NextRequest) {
  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId);
  
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Rate limit exceeded',
        retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    );
  }

  // Authenticate
  if (!authenticateRequest(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const startTime = Date.now();
  const errors: string[] = [];
  let recipesProcessed = 0;
  let productsUpdated = 0;
  let productsSkipped = 0;
  let cacheHits = 0;

  try {
    const body: SyncRequest = await request.json();
    const { recipeIds, locationId, limit = 50, force = false } = body;

    const recipes = await getRecipes(recipeIds, limit);
    
    if (recipes.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No recipes found to sync',
        recipesProcessed: 0,
        productsUpdated: 0,
        productsSkipped: 0,
        cacheHits: 0,
        errors: [],
        timestamp: new Date().toISOString(),
      });
    }

    const defaultLocation = locationId || process.env.DEFAULT_STORE_LOCATION_ID || '01400943';

    // Process recipes
    for (const recipe of recipes) {
      try {
        const result = await updateRecipeProducts(
          recipe.id,
          recipe.ingredients || [],
          defaultLocation,
          force
        );
        
        recipesProcessed++;
        productsUpdated += result.count || 0;
        productsSkipped += result.skipped || 0;
        cacheHits += result.cacheHits || 0;

        // Small delay to respect API limits
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error: any) {
        errors.push(`Recipe ${recipe.id}: ${error.message}`);
      }
    }

    const duration = Date.now() - startTime;
    const result: SyncResult = {
      success: errors.length === 0,
      message: errors.length === 0 
        ? `Successfully synced ${recipesProcessed} recipes` 
        : `Synced with ${errors.length} errors`,
      recipesProcessed,
      productsUpdated,
      productsSkipped,
      cacheHits,
      errors,
      timestamp: new Date().toISOString(),
    };

    await logSyncHistory(result);

    console.log(`Sync completed in ${duration}ms:`, {
      recipes: recipesProcessed,
      updated: productsUpdated,
      skipped: productsSkipped,
      cacheHits,
      errors: errors.length,
    });

    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
      },
    });
  } catch (error: any) {
    const result: SyncResult = {
      success: false,
      message: `Sync failed: ${error.message}`,
      recipesProcessed,
      productsUpdated,
      productsSkipped,
      cacheHits,
      errors: [error.message, ...errors],
      timestamp: new Date().toISOString(),
    };

    await logSyncHistory(result);

    return NextResponse.json(result, { status: 500 });
  }
}

/**
 * GET handler - Returns sync history
 */
export async function GET(request: NextRequest) {
  // Authenticate
  if (!authenticateRequest(request)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const snapshot = await db.collection(SYNC_HISTORY_COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(Math.min(limit, 50))
      .get();

    const history = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      history,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
