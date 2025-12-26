'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Loader2,
  ChefHat,
  MessageSquare,
  Calendar,
  Award,
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  overview: {
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
    userGrowthPercent: number;
    totalChefs: number;
    bannedUsers: number;
  };
  content: {
    totalRecipes: number;
    newRecipes: number;
    totalPosts: number;
    totalStories: number;
    totalReviews: number;
    totalGatherings: number;
  };
  engagement: {
    totalConversations: number;
    avgRecipesPerUser: number;
  };
  moderation: {
    pendingApplications: number;
    approvedApplications: number;
    openReports: number;
    openFeedback: number;
  };
  topContent: {
    recipes: Array<{ id: string; title: string; saveCount: number; imageUrl?: string }>;
    creators: Array<{ id: string; displayName: string; followersCount: number; photoURL?: string }>;
  };
  generatedAt: string;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState('7d');

  const fetchAnalytics = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch(`/api/admin/analytics?period=${period}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [period]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
          <p className="text-gray-500 mt-1">Platform metrics and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
          <button
            onClick={() => fetchAnalytics(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm text-gray-500">Total Users</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{data?.overview.totalUsers.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-1">
            {(data?.overview.userGrowthPercent || 0) >= 0 ? (
              <TrendingUp className="w-4 h-4 text-gray-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-gray-400" />
            )}
            <span className={`text-sm ${(data?.overview.userGrowthPercent || 0) >= 0 ? 'text-gray-600' : 'text-gray-400'}`}>
              {data?.overview.userGrowthPercent}% vs previous
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm text-gray-500">New Users</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{data?.overview.newUsers.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{data?.overview.activeUsers.toLocaleString()} active</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm text-gray-500">Creators</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{data?.overview.totalChefs.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{data?.moderation.pendingApplications} pending</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm text-gray-500">Total Recipes</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{data?.content.totalRecipes.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">+{data?.content.newRecipes} new</p>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Content Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Recipes</span>
              <span className="font-medium">{data?.content.totalRecipes.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Posts</span>
              <span className="font-medium">{data?.content.totalPosts.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Stories</span>
              <span className="font-medium">{data?.content.totalStories.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Reviews</span>
              <span className="font-medium">{data?.content.totalReviews.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Gatherings</span>
              <span className="font-medium">{data?.content.totalGatherings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Moderation Queue</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Applications</span>
              <span className={`font-medium ${(data?.moderation.pendingApplications || 0) > 0 ? 'text-gray-900' : ''}`}>
                {data?.moderation.pendingApplications}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Approved Applications</span>
              <span className="font-medium">{data?.moderation.approvedApplications}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Open Reports</span>
              <span className={`font-medium ${(data?.moderation.openReports || 0) > 0 ? 'text-gray-900' : ''}`}>
                {data?.moderation.openReports}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Open Feedback</span>
              <span className={`font-medium ${(data?.moderation.openFeedback || 0) > 0 ? 'text-gray-900' : ''}`}>
                {data?.moderation.openFeedback}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Banned Users</span>
              <span className="font-medium">{data?.overview.bannedUsers}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Top Recipes
          </h3>
          <div className="space-y-3">
            {data?.topContent.recipes.map((recipe, index) => (
              <div key={recipe.id} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm text-gray-600">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{recipe.title}</p>
                  <p className="text-xs text-gray-500">{recipe.saveCount} saves</p>
                </div>
              </div>
            ))}
            {(!data?.topContent.recipes || data.topContent.recipes.length === 0) && (
              <p className="text-sm text-gray-500">No recipes yet</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Top Creators
          </h3>
          <div className="space-y-3">
            {data?.topContent.creators.map((creator, index) => (
              <div key={creator.id} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm text-gray-600">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{creator.displayName}</p>
                  <p className="text-xs text-gray-500">{creator.followersCount} followers</p>
                </div>
              </div>
            ))}
            {(!data?.topContent.creators || data.topContent.creators.length === 0) && (
              <p className="text-sm text-gray-500">No creators yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-400">
        Last updated: {data?.generatedAt ? new Date(data.generatedAt).toLocaleString() : 'N/A'}
      </div>
    </div>
  );
}
