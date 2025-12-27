/**
 * Admin Vector Search API
 * Semantic search and embedding management
 */

import { NextRequest } from 'next/server';
import {
  withAdminAuth,
  createSuccessResponse,
  createErrorResponse,
  AdminContext,
} from '@/lib/admin-middleware';
import {
  searchRecipes,
  searchIngredients,
  findSimilarRecipes,
  storeRecipeEmbedding,
  storeIngredientEmbedding,
  batchStoreRecipeEmbeddings,
  getVectorSearchStats,
  clearEmbeddingCache,
  deleteRecipeEmbedding,
  deleteIngredientEmbedding,
  generateEmbedding,
} from '@/lib/vector-search';
import { getDb } from '@/lib/firebase-admin';

async function handler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') || 'stats';

  try {
    switch (action) {
      case 'stats': {
        const stats = await getVectorSearchStats();
        return createSuccessResponse({
          ...stats,
          adminEmail: context.email,
        });
      }

      case 'search-recipes': {
        const query = searchParams.get('query');
        const limit = parseInt(searchParams.get('limit') || '10');
        const cuisineType = searchParams.get('cuisineType') || undefined;
        const category = searchParams.get('category') || undefined;
        const maxPrepTime = searchParams.get('maxPrepTime')
          ? parseInt(searchParams.get('maxPrepTime')!)
          : undefined;

        if (!query) {
          return createErrorResponse('Query parameter required', 400);
        }

        const results = await searchRecipes(query, {
          limit,
          cuisineType,
          category,
          maxPrepTime,
        });

        return createSuccessResponse({
          query,
          ...results,
          filters: { cuisineType, category, maxPrepTime },
        });
      }

      case 'search-ingredients': {
        const query = searchParams.get('query');
        const limit = parseInt(searchParams.get('limit') || '10');
        const category = searchParams.get('category') || undefined;

        if (!query) {
          return createErrorResponse('Query parameter required', 400);
        }

        const results = await searchIngredients(query, { limit, category });

        return createSuccessResponse({
          query,
          ...results,
        });
      }

      case 'similar-recipes': {
        const recipeId = searchParams.get('recipeId');
        const limit = parseInt(searchParams.get('limit') || '5');

        if (!recipeId) {
          return createErrorResponse('Recipe ID required', 400);
        }

        const results = await findSimilarRecipes(recipeId, limit);

        return createSuccessResponse({
          sourceRecipeId: recipeId,
          ...results,
        });
      }

      case 'test-embedding': {
        const text = searchParams.get('text');

        if (!text) {
          return createErrorResponse('Text parameter required', 400);
        }

        const startTime = Date.now();
        const embedding = await generateEmbedding(text);
        const timeMs = Date.now() - startTime;

        return createSuccessResponse({
          text,
          embeddingLength: embedding.length,
          embeddingPreview: embedding.slice(0, 10),
          magnitude: Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0)),
          generationTimeMs: timeMs,
        });
      }

      case 'clear-cache': {
        clearEmbeddingCache();
        return createSuccessResponse({
          message: 'Embedding cache cleared',
        });
      }

      case 'list-embeddings': {
        const type = searchParams.get('type') || 'recipes';
        const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

        const db = getDb();
        const collection =
          type === 'ingredients' ? 'ingredientEmbeddings' : 'recipeEmbeddings';

        const snapshot = await db
          .collection(collection)
          .orderBy('updatedAt', 'desc')
          .limit(limit)
          .get();

        const embeddings = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.recipeTitle || data.name || 'Unknown',
            category: data.cuisineType || data.category,
            hasEmbedding: !!data.embedding,
            createdAt: data.createdAt?.toDate?.()?.toISOString(),
            updatedAt: data.updatedAt?.toDate?.()?.toISOString(),
          };
        });

        return createSuccessResponse({
          type,
          count: embeddings.length,
          embeddings,
        });
      }

      default:
        return createErrorResponse(
          'Invalid action. Supported: stats, search-recipes, search-ingredients, similar-recipes, test-embedding, clear-cache, list-embeddings',
          400
        );
    }
  } catch (error) {
    console.error('Vector Search API error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Vector search operation failed',
      500
    );
  }
}

async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { action } = body;

    const db = getDb();

    switch (action) {
      case 'store-recipe': {
        const { recipeId, title, description, cuisineType, categories, prepTime } = body;

        if (!recipeId || !title) {
          return createErrorResponse('Recipe ID and title required', 400);
        }

        const success = await storeRecipeEmbedding(recipeId, title, {
          description,
          cuisineType,
          categories,
          prepTime,
        });

        // Log the action
        await db.collection('adminLogs').add({
          level: 'info',
          message: `Recipe embedding stored for ${recipeId} by ${context.email}`,
          source: 'admin-vector-search',
          metadata: { recipeId, title },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          success,
          recipeId,
          message: success ? 'Recipe embedding stored' : 'Failed to store embedding',
        });
      }

      case 'store-ingredient': {
        const { ingredientId, name, canonicalName, category, aliases } = body;

        if (!ingredientId || !name) {
          return createErrorResponse('Ingredient ID and name required', 400);
        }

        const success = await storeIngredientEmbedding(ingredientId, name, {
          canonicalName,
          category,
          aliases,
        });

        return createSuccessResponse({
          success,
          ingredientId,
          message: success ? 'Ingredient embedding stored' : 'Failed to store embedding',
        });
      }

      case 'batch-store-recipes': {
        const { recipes } = body;

        if (!recipes || !Array.isArray(recipes)) {
          return createErrorResponse('Recipes array required', 400);
        }

        if (recipes.length > 100) {
          return createErrorResponse('Maximum 100 recipes per batch', 400);
        }

        const result = await batchStoreRecipeEmbeddings(recipes);

        // Log the action
        await db.collection('adminLogs').add({
          level: 'info',
          message: `Batch recipe embeddings: ${result.success} success, ${result.failed} failed by ${context.email}`,
          source: 'admin-vector-search',
          metadata: { totalRecipes: recipes.length, ...result },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          ...result,
          message: `Processed ${recipes.length} recipes`,
        });
      }

      case 'sync-all-recipes': {
        // Fetch all recipes and generate embeddings
        const recipesSnapshot = await db
          .collection('recipes')
          .orderBy('createdAt', 'desc')
          .limit(500) // Limit for safety
          .get();

        const recipes = recipesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || data.name || 'Untitled',
            description: data.description,
            cuisineType: data.cuisineType,
            categories: data.categories,
            prepTime: data.prepTime,
          };
        });

        const result = await batchStoreRecipeEmbeddings(recipes);

        // Log the action
        await db.collection('adminLogs').add({
          level: 'warn',
          message: `Full recipe embedding sync: ${result.success} success, ${result.failed} failed by ${context.email}`,
          source: 'admin-vector-search',
          metadata: { totalRecipes: recipes.length, ...result },
          timestamp: new Date(),
          userId: context.userId,
          userEmail: context.email,
        });

        return createSuccessResponse({
          ...result,
          totalRecipes: recipes.length,
          message: 'Recipe embedding sync complete',
        });
      }

      case 'delete-recipe-embedding': {
        const { recipeId } = body;

        if (!recipeId) {
          return createErrorResponse('Recipe ID required', 400);
        }

        const success = await deleteRecipeEmbedding(recipeId);

        return createSuccessResponse({
          success,
          recipeId,
          message: success ? 'Recipe embedding deleted' : 'Failed to delete embedding',
        });
      }

      case 'delete-ingredient-embedding': {
        const { ingredientId } = body;

        if (!ingredientId) {
          return createErrorResponse('Ingredient ID required', 400);
        }

        const success = await deleteIngredientEmbedding(ingredientId);

        return createSuccessResponse({
          success,
          ingredientId,
          message: success ? 'Ingredient embedding deleted' : 'Failed to delete embedding',
        });
      }

      default:
        return createErrorResponse(
          'Invalid action. Supported: store-recipe, store-ingredient, batch-store-recipes, sync-all-recipes, delete-recipe-embedding, delete-ingredient-embedding',
          400
        );
    }
  } catch (error) {
    console.error('Vector Search POST error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Vector search operation failed',
      500
    );
  }
}

export const GET = withAdminAuth(handler);
export const POST = withAdminAuth(postHandler);
