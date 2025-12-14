/**
 * Cron job endpoint for automated daily product syncing
 * Triggered by Vercel Cron at 2 AM daily
 * 
 * NOTE: This endpoint directly executes sync logic to avoid Vercel Authentication
 * issues when making internal HTTP requests.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { batchSearchProducts } from '@/lib/kroger-api';
import {
  calculateConfidenceScore,
  getCachedProduct,
  cacheProduct,
  shouldUpdateIngredient,
} from '@/lib/product-sync-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Collections
const SYNC_HISTORY_COLLECTION = 'productSyncHistory';
const RECIPES_COLLECTION = 'recipes';

interface Recipe {
  id: string;
  ingredients?: any[];
  [key: string]: any;
}

/**
 * Get recipes from Firestore
 */
async function getRecipes(limit: number = 100): Promise<Recipe[]> {
  try {
    const snapshot = await db.collection(RECIPES_COLLECTION)
      .limit(limit)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

/**
 * Update recipe with product prices
 */
async function updateRecipeProducts(
  recipeId: string,
  ingredients: any[],
  locationId: string
) {
  try {
    const ingredientNames = ingredients.map((ing: any) => ing.name).filter(Boolean);
    
    if (ingredientNames.length === 0) {
      return { updated: false, count: 0, skipped: 0, cacheHits: 0 };
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
        if (!shouldUpdateIngredient(ingredient, product, confidence)) {
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
async function logSyncHistory(result: any) {
  try {
    await db.collection(SYNC_HISTORY_COLLECTION).add({
      ...result,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error logging sync history:', error);
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const errors: string[] = [];
  let recipesProcessed = 0;
  let productsUpdated = 0;
  let productsSkipped = 0;
  let cacheHits = 0;

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

    // Get recipes to sync
    const recipes = await getRecipes(100);
    
    if (recipes.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No recipes found to sync',
        recipesProcessed: 0,
        productsUpdated: 0,
        productsSkipped: 0,
        cacheHits: 0,
        timestamp: new Date().toISOString(),
      });
    }

    const defaultLocation = process.env.DEFAULT_STORE_LOCATION_ID || '01400943';

    // Process recipes
    for (const recipe of recipes) {
      try {
        const result = await updateRecipeProducts(
          recipe.id,
          recipe.ingredients || [],
          defaultLocation
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
    const result = {
      success: errors.length === 0,
      message: errors.length === 0 
        ? `Successfully synced ${recipesProcessed} recipes` 
        : `Synced with ${errors.length} errors`,
      recipesProcessed,
      productsUpdated,
      productsSkipped,
      cacheHits,
      errors,
      triggeredBy: cronHeader ? 'Vercel Cron' : 'Manual trigger',
      timestamp: new Date().toISOString(),
      durationMs: duration,
    };

    await logSyncHistory(result);

    console.log(`Cron sync completed in ${duration}ms:`, {
      recipes: recipesProcessed,
      updated: productsUpdated,
      skipped: productsSkipped,
      cacheHits,
      errors: errors.length,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Cron job failed:', error);
    
    const result = {
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
