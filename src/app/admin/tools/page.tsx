'use client';

import { useState } from 'react';
import {
  Terminal,
  Send,
  Bell,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Code,
  Zap,
  Database,
} from 'lucide-react';

interface ToolResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<'api' | 'notifications' | 'cache'>('api');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ToolResult | null>(null);
  const [copied, setCopied] = useState(false);

  // API Tester State
  const [apiEndpoint, setApiEndpoint] = useState('/api/admin/stats');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiBody, setApiBody] = useState('');

  // Notification Tester State
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [notifUserId, setNotifUserId] = useState('');

  const testApiEndpoint = async () => {
    setLoading(true);
    setResult(null);
    try {
      const options: RequestInit = {
        method: apiMethod,
        headers: { 'Content-Type': 'application/json' },
      };
      if (apiMethod !== 'GET' && apiBody) {
        options.body = apiBody;
      }

      const startTime = Date.now();
      const res = await fetch(apiEndpoint, options);
      const duration = Date.now() - startTime;
      const data = await res.json();

      setResult({
        success: res.ok,
        message: `${res.status} ${res.statusText} (${duration}ms)`,
        data,
      });
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Request failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const sendTestNotification = async () => {
    if (!notifTitle || !notifBody) {
      setResult({
        success: false,
        message: 'Title and body are required',
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: notifTitle,
          body: notifBody,
          userId: notifUserId || undefined,
        }),
      });
      const data = await res.json();
      setResult({
        success: data.success,
        message: data.success
          ? 'Notification sent successfully'
          : data.error || 'Failed to send notification',
        data: data.data,
      });
      if (data.success) {
        setNotifTitle('');
        setNotifBody('');
        setNotifUserId('');
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to send notification',
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async (cacheType: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clearCache', cacheType }),
      });
      const data = await res.json();
      setResult({
        success: data.success,
        message: data.success
          ? `${cacheType} cache cleared successfully`
          : data.error || 'Failed to clear cache',
        data: data.data,
      });
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to clear cache',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (result?.data) {
      navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs = [
    { id: 'api', label: 'API Tester', icon: Terminal },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'cache', label: 'Cache', icon: Database },
  ] as const;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Developer Tools</h2>
        <p className="text-gray-500 mt-1">
          Test APIs, send notifications, and manage caches
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setResult(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {activeTab === 'api' && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Code className="w-5 h-5" />
              API Endpoint Tester
            </h3>
            <div className="flex gap-2">
              <select
                value={apiMethod}
                onChange={(e) => setApiMethod(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="/api/admin/..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
              />
              <button
                onClick={testApiEndpoint}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send
              </button>
            </div>
            {apiMethod !== 'GET' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request Body (JSON)
                </label>
                <textarea
                  value={apiBody}
                  onChange={(e) => setApiBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono h-24"
                />
              </div>
            )}

            {/* Quick Actions */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Quick endpoints:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  '/api/admin/stats',
                  '/api/admin/logs',
                  '/api/admin/users',
                  '/api/admin/database?action=collections',
                ].map((endpoint) => (
                  <button
                    key={endpoint}
                    onClick={() => setApiEndpoint(endpoint)}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono hover:bg-gray-200 transition-colors"
                  >
                    {endpoint}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Send Test Notification
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                placeholder="Notification title..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body
              </label>
              <textarea
                value={notifBody}
                onChange={(e) => setNotifBody(e.target.value)}
                placeholder="Notification body..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User ID (optional, leave empty for broadcast)
              </label>
              <input
                type="text"
                value={notifUserId}
                onChange={(e) => setNotifUserId(e.target.value)}
                placeholder="User ID..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
              />
            </div>
            <button
              onClick={sendTestNotification}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send Notification
            </button>
          </div>
        )}

        {activeTab === 'cache' && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Cache Management
            </h3>
            <p className="text-sm text-gray-500">
              Clear various caches to refresh data across the platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => clearCache('CDN')}
                disabled={loading}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">CDN Cache</p>
                    <p className="text-sm text-gray-500">Clear Vercel edge cache</p>
                  </div>
                </div>
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => clearCache('API')}
                disabled={loading}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">API Cache</p>
                    <p className="text-sm text-gray-500">Clear API response cache</p>
                  </div>
                </div>
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => clearCache('Image')}
                disabled={loading}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Image Cache</p>
                    <p className="text-sm text-gray-500">Clear image optimization cache</p>
                  </div>
                </div>
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => clearCache('All')}
                disabled={loading}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Clear All</p>
                    <p className="text-sm text-gray-500">Clear all caches</p>
                  </div>
                </div>
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className={`border rounded-xl p-4 ${result.success ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {result.success ? (
                <Check className="w-5 h-5 text-gray-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-gray-600" />
              )}
              <span className="font-medium text-gray-900">{result.message}</span>
            </div>
            {result.data !== undefined && (
              <button
                onClick={copyResult}
                className="flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          {result.data !== undefined && (
            <pre className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 overflow-x-auto max-h-64">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
