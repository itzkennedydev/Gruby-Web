'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  Loader2,
  Sparkles,
  Database,
  Zap,
  ChefHat,
  Apple,
  Play,
  Trash2,
  CheckCircle,
  XCircle,
  BarChart3,
  Clock,
} from 'lucide-react';

interface VectorStats {
  recipeEmbeddings: number;
  ingredientEmbeddings: number;
  queryEmbeddings: number;
  cacheSize: number;
  cacheTTL: string;
}

interface SearchResult {
  recipeId?: string;
  ingredientId?: string;
  recipeTitle?: string;
  name?: string;
  score: number;
  cuisineType?: string;
  categories?: string[];
  category?: string;
  prepTime?: number;
}

interface EmbeddingItem {
  id: string;
  name: string;
  category?: string;
  hasEmbedding: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function VectorSearchPage() {
  const [stats, setStats] = useState<VectorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'recipes' | 'ingredients'>('recipes');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchTime, setSearchTime] = useState<number | null>(null);
  const [embeddings, setEmbeddings] = useState<EmbeddingItem[]>([]);
  const [loadingEmbeddings, setLoadingEmbeddings] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: number; failed: number } | null>(null);
  const [testText, setTestText] = useState('');
  const [testResult, setTestResult] = useState<{
    embeddingLength: number;
    magnitude: number;
    generationTimeMs: number;
  } | null>(null);
  const [testing, setTesting] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/vector-search?action=stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setSearchResults([]);
    setSearchTime(null);

    try {
      const action = searchType === 'recipes' ? 'search-recipes' : 'search-ingredients';
      const params = new URLSearchParams({
        action,
        query: searchQuery,
        limit: '20',
      });

      const res = await fetch(`/api/admin/vector-search?${params}`);
      const data = await res.json();

      if (data.success) {
        setSearchResults(data.data.results);
        setSearchTime(data.data.searchTimeMs);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  const fetchEmbeddings = async (type: 'recipes' | 'ingredients') => {
    setLoadingEmbeddings(true);
    try {
      const params = new URLSearchParams({
        action: 'list-embeddings',
        type,
        limit: '50',
      });

      const res = await fetch(`/api/admin/vector-search?${params}`);
      const data = await res.json();

      if (data.success) {
        setEmbeddings(data.data.embeddings);
      }
    } catch (error) {
      console.error('Failed to fetch embeddings:', error);
    } finally {
      setLoadingEmbeddings(false);
    }
  };

  const handleSyncAllRecipes = async () => {
    if (!confirm('This will generate embeddings for all recipes. This may take a while and use API credits. Continue?')) {
      return;
    }

    setSyncing(true);
    setSyncResult(null);

    try {
      const res = await fetch('/api/admin/vector-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync-all-recipes' }),
      });

      const data = await res.json();

      if (data.success) {
        setSyncResult(data.data);
        fetchStats();
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  const handleTestEmbedding = async () => {
    if (!testText.trim()) return;

    setTesting(true);
    setTestResult(null);

    try {
      const params = new URLSearchParams({
        action: 'test-embedding',
        text: testText,
      });

      const res = await fetch(`/api/admin/vector-search?${params}`);
      const data = await res.json();

      if (data.success) {
        setTestResult({
          embeddingLength: data.data.embeddingLength,
          magnitude: data.data.magnitude,
          generationTimeMs: data.data.generationTimeMs,
        });
      }
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setTesting(false);
    }
  };

  const handleClearCache = async () => {
    try {
      await fetch('/api/admin/vector-search?action=clear-cache');
      fetchStats();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Vector Search
          </h2>
          <p className="text-gray-500 mt-1">
            Semantic search powered by Gemini AI embeddings
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Recipe Embeddings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.recipeEmbeddings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Apple className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ingredient Embeddings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.ingredientEmbeddings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Query Cache</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.cacheSize}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400">TTL: {stats.cacheTTL}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Embeddings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(stats.recipeEmbeddings + stats.ingredientEmbeddings).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Search Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-600" />
          Semantic Search
        </h3>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setSearchType('recipes')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === 'recipes'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Recipes
          </button>
          <button
            onClick={() => setSearchType('ingredients')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === 'ingredients'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Ingredients
          </button>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder={`Search ${searchType} semantically...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSearch}
            disabled={searching || !searchQuery.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {searching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Search
          </button>
        </div>

        {/* Search Results */}
        {searchTime !== null && (
          <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Found {searchResults.length} results in {searchTime}ms
          </p>
        )}

        {searchResults.length > 0 && (
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
            {searchResults.map((result, index) => (
              <div
                key={result.recipeId || result.ingredientId || index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {result.recipeTitle || result.name}
                  </p>
                  <div className="flex gap-2 mt-1">
                    {result.cuisineType && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                        {result.cuisineType}
                      </span>
                    )}
                    {result.category && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {result.category}
                      </span>
                    )}
                    {result.prepTime && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {result.prepTime} min
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                      {(result.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">similarity</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Test Embedding Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-600" />
          Test Embedding Generation
        </h3>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter text to generate embedding..."
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTestEmbedding()}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleTestEmbedding}
            disabled={testing || !testText.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {testing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Generate
          </button>
        </div>

        {testResult && (
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-semibold text-amber-700">{testResult.embeddingLength}</p>
                <p className="text-sm text-amber-600">Dimensions</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-amber-700">{testResult.magnitude.toFixed(4)}</p>
                <p className="text-sm text-amber-600">Magnitude</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-amber-700">{testResult.generationTimeMs}ms</p>
                <p className="text-sm text-amber-600">Generation Time</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          Embedding Management
        </h3>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSyncAllRecipes}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {syncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Sync All Recipes
          </button>

          <button
            onClick={() => fetchEmbeddings('recipes')}
            disabled={loadingEmbeddings}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <ChefHat className="w-4 h-4" />
            View Recipe Embeddings
          </button>

          <button
            onClick={() => fetchEmbeddings('ingredients')}
            disabled={loadingEmbeddings}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <Apple className="w-4 h-4" />
            View Ingredient Embeddings
          </button>

          <button
            onClick={handleClearCache}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cache
          </button>
        </div>

        {/* Sync Result */}
        {syncResult && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center gap-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Sync Complete</p>
              <p className="text-sm text-green-600">
                {syncResult.success} succeeded, {syncResult.failed} failed
              </p>
            </div>
          </div>
        )}

        {/* Embeddings List */}
        {loadingEmbeddings ? (
          <div className="mt-4 flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        ) : embeddings.length > 0 ? (
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            <p className="text-sm text-gray-500 mb-2">
              Showing {embeddings.length} embeddings
            </p>
            {embeddings.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {item.hasEmbedding ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    {item.category && (
                      <span className="text-xs text-gray-500">{item.category}</span>
                    )}
                  </div>
                </div>
                <div className="text-right text-xs text-gray-400">
                  {item.updatedAt && new Date(item.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
