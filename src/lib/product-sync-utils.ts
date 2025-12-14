/**
 * Utilities for intelligent product syncing
 */

import { db } from './firebase-admin';

const PRODUCT_CACHE_COLLECTION = 'productCache';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Calculate confidence score for ingredient-product match
 * Returns 0-1, where 1 is perfect match
 */
export function calculateConfidenceScore(ingredientName: string, productName: string): number {
  const ingLower = ingredientName.toLowerCase().trim();
  const prodLower = productName.toLowerCase().trim();
  
  // Exact match
  if (ingLower === prodLower) {
    return 1.0;
  }
  
  // One contains the other
  if (prodLower.includes(ingLower) || ingLower.includes(prodLower)) {
    return 0.9;
  }
  
  // Split into words and check overlap
  const ingWords = ingLower.split(/\s+/);
  const prodWords = prodLower.split(/\s+/);
  const matchingWords = ingWords.filter(w => prodWords.includes(w));
  
  if (matchingWords.length > 0) {
    const score = (matchingWords.length / Math.max(ingWords.length, prodWords.length));
    return Math.min(0.8, score); // Cap at 0.8 for partial matches
  }
  
  return 0.0;
}

/**
 * Check if cached product is still valid
 */
export async function getCachedProduct(ingredientName: string, locationId: string) {
  try {
    const cacheKey = `${ingredientName.toLowerCase().trim()}_${locationId}`;
    const cacheDoc = await db.collection(PRODUCT_CACHE_COLLECTION).doc(cacheKey).get();
    
    if (!cacheDoc.exists) {
      return null;
    }
    
    const data = cacheDoc.data();
    if (!data) return null;
    
    // Check if cache is expired
    const cacheTime = data.cachedAt?.toMillis?.() || 0;
    const now = Date.now();
    
    if (now - cacheTime > CACHE_DURATION_MS) {
      return null;
    }
    
    return data.product;
  } catch (error) {
    console.error('Error getting cached product:', error);
    return null;
  }
}

/**
 * Cache product result
 */
export async function cacheProduct(ingredientName: string, locationId: string, product: any) {
  try {
    const cacheKey = `${ingredientName.toLowerCase().trim()}_${locationId}`;
    await db.collection(PRODUCT_CACHE_COLLECTION).doc(cacheKey).set({
      ingredientName,
      locationId,
      product,
      cachedAt: new Date(),
    });
  } catch (error) {
    console.error('Error caching product:', error);
  }
}

/**
 * Should update ingredient with new product data?
 * Checks confidence scores to avoid overwriting good matches with worse ones
 */
export function shouldUpdateIngredient(
  ingredient: any,
  newProduct: any,
  newConfidence: number
): boolean {
  // No existing product data - always update
  if (!ingredient.krogerProductId) {
    return true;
  }
  
  // If existing data is older than 7 days, update
  const lastUpdated = ingredient.lastUpdated;
  if (lastUpdated) {
    const daysSinceUpdate = (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate > 7) {
      return true;
    }
  }
  
  // Calculate existing confidence if we have product name
  const existingConfidence = ingredient.confidenceScore || 0;
  
  // Only update if new confidence is significantly better (>10% improvement)
  return newConfidence > existingConfidence + 0.1;
}
