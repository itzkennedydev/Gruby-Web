/**
 * Vector Search Service for GrubWeb Admin
 *
 * Provides semantic search capabilities using Firestore vector indexes
 * and Google's Gemini text-embedding-004 model.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { getDb } from './firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// Configuration
const EMBEDDING_MODEL = 'text-embedding-004';
const EMBEDDING_DIMENSION = 256;
const DEFAULT_LIMIT = 10;

// Collections
const RECIPE_EMBEDDINGS_COLLECTION = 'recipeEmbeddings';
const INGREDIENT_EMBEDDINGS_COLLECTION = 'ingredientEmbeddings';
const QUERY_EMBEDDINGS_COLLECTION = 'queryEmbeddings';

// Cache for embeddings (in-memory for serverless)
const embeddingCache = new Map<string, { embedding: number[]; timestamp: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

let genAI: GoogleGenerativeAI | null = null;

/**
 * Initialize Gemini AI client
 */
function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required for vector search');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Generate embedding for text using Gemini
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // Check cache first
  const cacheKey = text.toLowerCase().trim();
  const cached = embeddingCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.embedding;
  }

  try {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: EMBEDDING_MODEL });

    // Use the simpler embedContent API with just the text
    const result = await model.embedContent(text);

    let embedding = result.embedding.values;

    // Truncate to 256 dimensions if needed
    if (embedding.length > EMBEDDING_DIMENSION) {
      embedding = embedding.slice(0, EMBEDDING_DIMENSION);
    }

    // Normalize the embedding
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    if (magnitude > 0) {
      embedding = embedding.map(val => val / magnitude);
    }

    // Cache the result
    embeddingCache.set(cacheKey, { embedding, timestamp: Date.now() });

    return embedding;
  } catch (error) {
    console.error('[VectorSearch] Error generating embedding:', error);
    throw error;
  }
}

/**
 * Search recipes semantically
 */
export async function searchRecipes(
  query: string,
  options: {
    limit?: number;
    cuisineType?: string;
    category?: string;
    maxPrepTime?: number;
  } = {}
): Promise<{
  results: Array<{
    recipeId: string;
    recipeTitle: string;
    score: number;
    cuisineType?: string;
    categories?: string[];
    prepTime?: number;
  }>;
  queryEmbedding: number[];
  searchTimeMs: number;
}> {
  const startTime = Date.now();
  const { limit = DEFAULT_LIMIT, cuisineType, category, maxPrepTime } = options;

  try {
    const db = getDb();
    const queryEmbedding = await generateEmbedding(query);

    // Build the vector query
    let collectionRef = db.collection(RECIPE_EMBEDDINGS_COLLECTION);

    // Note: Firestore vector search with pre-filters requires composite indexes
    // The indexes were deployed via firestore.indexes.json
    const vectorQuery = collectionRef.findNearest('embedding', queryEmbedding, {
      limit,
      distanceMeasure: 'DOT_PRODUCT',
    });

    const snapshot = await vectorQuery.get();

    const results = snapshot.docs
      .map(doc => {
        const data = doc.data();
        // DOT_PRODUCT returns similarity (higher is better)
        // For normalized vectors, DOT_PRODUCT is between -1 and 1
        const score = data._distance !== undefined ? 1 - data._distance : 0.5;

        return {
          recipeId: data.recipeId || doc.id,
          recipeTitle: data.recipeTitle || 'Unknown',
          score,
          cuisineType: data.cuisineType,
          categories: data.categories,
          prepTime: data.prepTime,
        };
      })
      // Apply post-filters if pre-filters weren't applied at query level
      .filter(r => {
        if (cuisineType && r.cuisineType !== cuisineType) return false;
        if (category && (!r.categories || !r.categories.includes(category))) return false;
        if (maxPrepTime && r.prepTime && r.prepTime > maxPrepTime) return false;
        return true;
      })
      .sort((a, b) => b.score - a.score);

    return {
      results,
      queryEmbedding,
      searchTimeMs: Date.now() - startTime,
    };
  } catch (error) {
    console.error('[VectorSearch] Error searching recipes:', error);
    throw error;
  }
}

/**
 * Find similar recipes by recipe ID
 */
export async function findSimilarRecipes(
  recipeId: string,
  limit: number = DEFAULT_LIMIT
): Promise<{
  results: Array<{
    recipeId: string;
    recipeTitle: string;
    score: number;
  }>;
  searchTimeMs: number;
}> {
  const startTime = Date.now();

  try {
    const db = getDb();

    // Get the source recipe's embedding
    const sourceDoc = await db
      .collection(RECIPE_EMBEDDINGS_COLLECTION)
      .where('recipeId', '==', recipeId)
      .limit(1)
      .get();

    if (sourceDoc.empty) {
      return { results: [], searchTimeMs: Date.now() - startTime };
    }

    const sourceEmbedding = sourceDoc.docs[0].data().embedding;

    // Find similar recipes
    const vectorQuery = db
      .collection(RECIPE_EMBEDDINGS_COLLECTION)
      .findNearest('embedding', sourceEmbedding, {
        limit: limit + 1, // +1 to exclude self
        distanceMeasure: 'DOT_PRODUCT',
      });

    const snapshot = await vectorQuery.get();

    const results = snapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          recipeId: data.recipeId || doc.id,
          recipeTitle: data.recipeTitle || 'Unknown',
          score: data._distance !== undefined ? 1 - data._distance : 0.5,
        };
      })
      .filter(r => r.recipeId !== recipeId) // Exclude the source recipe
      .slice(0, limit);

    return {
      results,
      searchTimeMs: Date.now() - startTime,
    };
  } catch (error) {
    console.error('[VectorSearch] Error finding similar recipes:', error);
    throw error;
  }
}

/**
 * Search ingredients semantically
 */
export async function searchIngredients(
  query: string,
  options: {
    limit?: number;
    category?: string;
  } = {}
): Promise<{
  results: Array<{
    ingredientId: string;
    name: string;
    canonicalName: string;
    score: number;
    category?: string;
    aliases?: string[];
  }>;
  searchTimeMs: number;
}> {
  const startTime = Date.now();
  const { limit = DEFAULT_LIMIT, category } = options;

  try {
    const db = getDb();
    const queryEmbedding = await generateEmbedding(query);

    const vectorQuery = db
      .collection(INGREDIENT_EMBEDDINGS_COLLECTION)
      .findNearest('embedding', queryEmbedding, {
        limit,
        distanceMeasure: 'DOT_PRODUCT',
      });

    const snapshot = await vectorQuery.get();

    const results = snapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          ingredientId: data.ingredientId || doc.id,
          name: data.name || 'Unknown',
          canonicalName: data.canonicalName || data.name || 'Unknown',
          score: data._distance !== undefined ? 1 - data._distance : 0.5,
          category: data.category,
          aliases: data.aliases,
        };
      })
      .filter(r => !category || r.category === category)
      .sort((a, b) => b.score - a.score);

    return {
      results,
      searchTimeMs: Date.now() - startTime,
    };
  } catch (error) {
    console.error('[VectorSearch] Error searching ingredients:', error);
    throw error;
  }
}

/**
 * Store recipe embedding
 */
export async function storeRecipeEmbedding(
  recipeId: string,
  recipeTitle: string,
  metadata: {
    cuisineType?: string;
    categories?: string[];
    prepTime?: number;
    description?: string;
  } = {}
): Promise<boolean> {
  try {
    const db = getDb();

    // Generate embedding from title and description
    const textToEmbed = metadata.description
      ? `${recipeTitle}. ${metadata.description}`
      : recipeTitle;

    const embedding = await generateEmbedding(textToEmbed);

    // Store in Firestore
    await db.collection(RECIPE_EMBEDDINGS_COLLECTION).doc(recipeId).set({
      recipeId,
      recipeTitle,
      embedding: FieldValue.vector(embedding),
      cuisineType: metadata.cuisineType || null,
      categories: metadata.categories || [],
      prepTime: metadata.prepTime || null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error('[VectorSearch] Error storing recipe embedding:', error);
    return false;
  }
}

/**
 * Store ingredient embedding
 */
export async function storeIngredientEmbedding(
  ingredientId: string,
  name: string,
  metadata: {
    canonicalName?: string;
    category?: string;
    aliases?: string[];
  } = {}
): Promise<boolean> {
  try {
    const db = getDb();

    // Generate embedding including aliases for better matching
    const textToEmbed = metadata.aliases?.length
      ? `${name}, also known as ${metadata.aliases.join(', ')}`
      : name;

    const embedding = await generateEmbedding(textToEmbed);

    await db.collection(INGREDIENT_EMBEDDINGS_COLLECTION).doc(ingredientId).set({
      ingredientId,
      name,
      canonicalName: metadata.canonicalName || name,
      embedding: FieldValue.vector(embedding),
      category: metadata.category || null,
      aliases: metadata.aliases || [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error('[VectorSearch] Error storing ingredient embedding:', error);
    return false;
  }
}

/**
 * Batch store recipe embeddings
 */
export async function batchStoreRecipeEmbeddings(
  recipes: Array<{
    id: string;
    title: string;
    description?: string;
    cuisineType?: string;
    categories?: string[];
    prepTime?: number;
  }>,
  onProgress?: (processed: number, total: number) => void
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    try {
      await storeRecipeEmbedding(recipe.id, recipe.title, {
        description: recipe.description,
        cuisineType: recipe.cuisineType,
        categories: recipe.categories,
        prepTime: recipe.prepTime,
      });
      success++;
    } catch (error) {
      console.error(`Failed to store embedding for recipe ${recipe.id}:`, error);
      failed++;
    }

    if (onProgress) {
      onProgress(i + 1, recipes.length);
    }

    // Rate limiting to avoid hitting Gemini API limits
    if ((i + 1) % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return { success, failed };
}

/**
 * Get vector search stats
 */
export async function getVectorSearchStats(): Promise<{
  recipeEmbeddings: number;
  ingredientEmbeddings: number;
  queryEmbeddings: number;
  cacheSize: number;
  cacheTTL: string;
}> {
  try {
    const db = getDb();

    const [recipeCount, ingredientCount, queryCount] = await Promise.all([
      db.collection(RECIPE_EMBEDDINGS_COLLECTION).count().get(),
      db.collection(INGREDIENT_EMBEDDINGS_COLLECTION).count().get(),
      db.collection(QUERY_EMBEDDINGS_COLLECTION).count().get(),
    ]);

    return {
      recipeEmbeddings: recipeCount.data().count,
      ingredientEmbeddings: ingredientCount.data().count,
      queryEmbeddings: queryCount.data().count,
      cacheSize: embeddingCache.size,
      cacheTTL: `${CACHE_TTL_MS / 1000 / 60} minutes`,
    };
  } catch (error) {
    console.error('[VectorSearch] Error getting stats:', error);
    return {
      recipeEmbeddings: 0,
      ingredientEmbeddings: 0,
      queryEmbeddings: 0,
      cacheSize: embeddingCache.size,
      cacheTTL: `${CACHE_TTL_MS / 1000 / 60} minutes`,
    };
  }
}

/**
 * Clear embedding cache
 */
export function clearEmbeddingCache(): void {
  embeddingCache.clear();
}

/**
 * Delete all embeddings for a recipe
 */
export async function deleteRecipeEmbedding(recipeId: string): Promise<boolean> {
  try {
    const db = getDb();
    await db.collection(RECIPE_EMBEDDINGS_COLLECTION).doc(recipeId).delete();
    return true;
  } catch (error) {
    console.error('[VectorSearch] Error deleting recipe embedding:', error);
    return false;
  }
}

/**
 * Delete all embeddings for an ingredient
 */
export async function deleteIngredientEmbedding(ingredientId: string): Promise<boolean> {
  try {
    const db = getDb();
    await db.collection(INGREDIENT_EMBEDDINGS_COLLECTION).doc(ingredientId).delete();
    return true;
  } catch (error) {
    console.error('[VectorSearch] Error deleting ingredient embedding:', error);
    return false;
  }
}
