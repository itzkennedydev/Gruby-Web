'use client';

import { useState, useEffect } from 'react';
import {
  Activity,
  Server,
  Database,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Loader2,
  Zap,
  Globe,
  HardDrive,
} from 'lucide-react';

interface SystemStatus {
  firebase: 'healthy' | 'degraded' | 'down';
  api: 'healthy' | 'degraded' | 'down';
  storage: 'healthy' | 'degraded' | 'down';
}

interface Stats {
  totalUsers: number;
  activeToday: number;
  totalRecipes: number;
  totalPosts: number;
  storageUsedMB: number;
  apiLatencyMs: number;
}

export default function MonitoringPage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SystemStatus>({
    firebase: 'healthy',
    api: 'healthy',
    storage: 'healthy',
  });
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeToday: 0,
    totalRecipes: 0,
    totalPosts: 0,
    storageUsedMB: 0,
    apiLatencyMs: 0,
  });
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkHealth = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      // Check API health
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();

      const latency = Date.now() - startTime;

      if (statsData.success) {
        setStats({
          totalUsers: statsData.data?.users?.total || 0,
          activeToday: statsData.data?.users?.activeToday || 0,
          totalRecipes: statsData.data?.content?.recipes || 0,
          totalPosts: statsData.data?.content?.posts || 0,
          storageUsedMB: statsData.data?.storage?.usedMB || 0,
          apiLatencyMs: latency,
        });

        setStatus({
          firebase: statsRes.ok ? 'healthy' : 'degraded',
          api: latency < 1000 ? 'healthy' : latency < 3000 ? 'degraded' : 'down',
          storage: 'healthy',
        });
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setStatus({
        firebase: 'down',
        api: 'down',
        storage: 'down',
      });
    } finally {
      setLoading(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkHealth();
    // Auto-refresh every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (health: 'healthy' | 'degraded' | 'down') => {
    switch (health) {
      case 'healthy':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            <CheckCircle className="w-3 h-3" />
            Healthy
          </span>
        );
      case 'degraded':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
            <AlertTriangle className="w-3 h-3" />
            Degraded
          </span>
        );
      case 'down':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
            <AlertTriangle className="w-3 h-3" />
            Down
          </span>
        );
    }
  };

  const overallHealth =
    status.firebase === 'healthy' && status.api === 'healthy' && status.storage === 'healthy'
      ? 'healthy'
      : status.firebase === 'down' || status.api === 'down' || status.storage === 'down'
      ? 'down'
      : 'degraded';

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">System Monitoring</h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={checkHealth}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Overall Status */}
      <div className={`p-6 rounded-xl border ${
        overallHealth === 'healthy'
          ? 'bg-green-50 border-green-200'
          : overallHealth === 'degraded'
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            overallHealth === 'healthy'
              ? 'bg-green-100'
              : overallHealth === 'degraded'
              ? 'bg-yellow-100'
              : 'bg-red-100'
          }`}>
            <Activity className={`w-6 h-6 ${
              overallHealth === 'healthy'
                ? 'text-green-600'
                : overallHealth === 'degraded'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {overallHealth === 'healthy'
                ? 'All Systems Operational'
                : overallHealth === 'degraded'
                ? 'Some Systems Degraded'
                : 'System Issues Detected'}
            </h3>
            <p className="text-sm text-gray-600">
              {overallHealth === 'healthy'
                ? 'Everything is running smoothly'
                : 'Some services may be experiencing issues'}
            </p>
          </div>
        </div>
      </div>

      {/* Service Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Firebase</span>
            </div>
            {getStatusBadge(status.firebase)}
          </div>
          <p className="text-sm text-gray-500">Database & Authentication</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">API</span>
            </div>
            {getStatusBadge(status.api)}
          </div>
          <p className="text-sm text-gray-500">Response time: {stats.apiLatencyMs}ms</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Storage</span>
            </div>
            {getStatusBadge(status.storage)}
          </div>
          <p className="text-sm text-gray-500">Cloud Storage & CDN</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-500">Total Users</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : stats.totalUsers.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-500">Active Today</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : stats.activeToday.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-500">Total Recipes</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : stats.totalRecipes.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-500">Total Posts</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : stats.totalPosts.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
        <p>
          System monitoring automatically refreshes every 30 seconds.
          For detailed logs and error tracking, visit the{' '}
          <a href="/admin/logs" className="text-gray-900 underline">Logs</a> page.
        </p>
      </div>
    </div>
  );
}
