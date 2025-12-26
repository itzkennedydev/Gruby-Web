'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  RefreshCw,
  Loader2,
  AlertCircle,
  AlertTriangle,
  Info,
  Bug,
  ChevronDown,
} from 'lucide-react';

interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: string;
  source: string;
  metadata?: Record<string, unknown>;
  userId?: string;
  userEmail?: string;
}

interface LogsResponse {
  success: boolean;
  data: {
    logs: LogEntry[];
    pagination: {
      limit: number;
      hasMore: boolean;
      nextCursor: string | null;
    };
    filters: {
      sources: string[];
      levels: string[];
    };
    stats: {
      recentErrors: number;
    };
    message?: string;
  };
}

type LevelFilter = 'all' | 'info' | 'warn' | 'error' | 'debug';

export default function LogsPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [recentErrors, setRecentErrors] = useState(0);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchLogs = useCallback(async (append = false) => {
    if (!append) setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '50' });
      if (levelFilter !== 'all') params.set('level', levelFilter);
      if (sourceFilter !== 'all') params.set('source', sourceFilter);
      if (append && cursor) params.set('startAfter', cursor);

      const res = await fetch(`/api/admin/logs?${params}`);
      const data: LogsResponse = await res.json();

      if (data.success) {
        setLogs(prev => append ? [...prev, ...data.data.logs] : data.data.logs);
        setHasMore(data.data.pagination.hasMore);
        setCursor(data.data.pagination.nextCursor);
        setSources(data.data.filters.sources);
        setRecentErrors(data.data.stats.recentErrors);
        setMessage(data.data.message || null);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  }, [levelFilter, sourceFilter, cursor]);

  useEffect(() => {
    setCursor(null);
    fetchLogs(false);
  }, [levelFilter, sourceFilter]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'debug':
        return <Bug className="w-4 h-4 text-purple-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warn':
        return 'bg-yellow-50 border-yellow-200';
      case 'debug':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading && logs.length === 0) {
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
          <h2 className="text-2xl font-semibold text-gray-900">System Logs</h2>
          <p className="text-gray-500 mt-1">
            {recentErrors > 0 ? (
              <span className="text-red-500">{recentErrors} errors in last 24h</span>
            ) : (
              'No recent errors'
            )}
          </p>
        </div>
        <button
          onClick={() => {
            setCursor(null);
            fetchLogs(false);
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Level Filter */}
        <div className="flex gap-2">
          {(['all', 'error', 'warn', 'info', 'debug'] as LevelFilter[]).map((level) => (
            <button
              key={level}
              onClick={() => setLevelFilter(level)}
              className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                levelFilter === level
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Source Filter */}
        {sources.length > 0 && (
          <div className="relative">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-sm cursor-pointer"
            >
              <option value="all">All Sources</option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm">
          {message}
        </div>
      )}

      {/* Logs List */}
      <div className="space-y-2">
        {logs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No logs found</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`border rounded-lg overflow-hidden transition-colors ${getLevelStyle(log.level)}`}
            >
              <div
                className="p-3 cursor-pointer"
                onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              >
                <div className="flex items-start gap-3">
                  {getLevelIcon(log.level)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm text-gray-900">{log.message}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>{formatTimestamp(log.timestamp)}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{log.source}</span>
                      {log.userEmail && <span>{log.userEmail}</span>}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedLog === log.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {expandedLog === log.id && log.metadata && (
                <div className="px-3 pb-3 pt-0">
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => fetchLogs(true)}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
