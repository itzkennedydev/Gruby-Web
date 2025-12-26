'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Trash2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Check,
  Database,
  Users,
  FileText,
  Image,
  MessageSquare,
  Calendar,
} from 'lucide-react';

interface CleanupStatus {
  counts: Record<string, number>;
  demoData: {
    accounts: number;
    gatherings: number;
  };
  status: 'clean' | 'has_demo_data';
}

interface CleanupResult {
  message: string;
  results?: Array<{ collection: string; deleted: number; errors: number }>;
  deleted?: number;
  errors?: number;
  total?: number;
}

export default function CleanupPage() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [status, setStatus] = useState<CleanupStatus | null>(null);
  const [result, setResult] = useState<CleanupResult | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ action: string; title: string; description: string } | null>(null);
  const [confirmText, setConfirmText] = useState('');

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cleanup');
      const data = await res.json();
      if (data.success) {
        setStatus(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const runCleanup = async (action: string) => {
    setActionLoading(action);
    setResult(null);
    try {
      const res = await fetch('/api/admin/cleanup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        fetchStatus();
      }
    } catch (error) {
      console.error('Cleanup failed:', error);
    } finally {
      setActionLoading(null);
      setConfirmModal(null);
      setConfirmText('');
    }
  };

  const cleanupActions = [
    // Quick Actions (no confirmation)
    {
      id: 'removeDemoAccounts',
      title: 'Remove Demo Accounts',
      description: 'Delete demo user accounts (demo@grubyapp.com, etc.)',
      icon: Users,
      danger: false,
    },
    {
      id: 'removeDemoGatherings',
      title: 'Remove Demo Gatherings',
      description: 'Delete gatherings with demo- prefix IDs',
      icon: Calendar,
      danger: false,
    },
    // Content Cleanup (requires confirmation)
    {
      id: 'removeAllGatherings',
      title: 'Remove All Gatherings',
      description: 'Delete ALL gatherings (demo and user-created)',
      icon: Calendar,
      danger: true,
      requireConfirm: true,
    },
    {
      id: 'removeAllRecipes',
      title: 'Remove All Recipes',
      description: 'Delete all recipes from the database',
      icon: FileText,
      danger: true,
      requireConfirm: true,
    },
    {
      id: 'clearUserData',
      title: 'Clear All User Content',
      description: 'Remove posts, stories, reviews, shopping lists, and user data',
      icon: Database,
      danger: true,
      requireConfirm: true,
    },
    // Full Reset
    {
      id: 'fullProductionReset',
      title: 'Full Production Reset',
      description: 'Delete all content and demo data, keep real user accounts',
      icon: Trash2,
      danger: true,
      requireConfirm: true,
      confirmWord: 'PRODUCTION RESET',
    },
  ];

  const handleAction = (action: typeof cleanupActions[0]) => {
    if (action.requireConfirm) {
      setConfirmModal({
        action: action.id,
        title: action.title,
        description: action.description,
      });
    } else {
      runCleanup(action.id);
    }
  };

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
          <h2 className="text-2xl font-semibold text-gray-900">Data Cleanup</h2>
          <p className="text-gray-500 mt-1">Production readiness tools</p>
        </div>
        <button
          onClick={fetchStatus}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Status Overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Status
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-semibold text-gray-900">{status?.counts.users || 0}</p>
            <p className="text-sm text-gray-500">Users</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-semibold text-gray-900">{status?.counts.recipes || 0}</p>
            <p className="text-sm text-gray-500">Recipes</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-semibold text-gray-900">{status?.counts.posts || 0}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-semibold text-gray-900">{status?.counts.gatherings || 0}</p>
            <p className="text-sm text-gray-500">Gatherings</p>
          </div>
        </div>

        {/* Demo Data Status */}
        <div className={`p-4 rounded-lg ${
          status?.status === 'clean' ? 'bg-gray-50' : 'bg-gray-100'
        }`}>
          <div className="flex items-center gap-3">
            {status?.status === 'clean' ? (
              <>
                <Check className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Production Ready</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Demo Data Detected</span>
              </>
            )}
          </div>
          {status?.status !== 'clean' && (
            <p className="text-sm text-gray-600 mt-2">
              Found {status?.demoData.accounts} demo accounts and {status?.demoData.gatherings} demo gatherings
            </p>
          )}
        </div>
      </div>

      {/* Cleanup Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Cleanup Actions</h3>

        <div className="space-y-3">
          {cleanupActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  action.danger ? 'border-gray-300 bg-gray-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    action.danger ? 'bg-gray-200' : 'bg-gray-100'
                  }`}>
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAction(action)}
                  disabled={actionLoading !== null}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 ${
                    action.danger
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {actionLoading === action.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Run'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" />
            {result.message}
          </h3>
          {result.results && (
            <div className="space-y-2">
              {result.results.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">{r.collection}</span>
                  <span className="text-gray-500">{r.deleted} deleted, {r.errors} errors</span>
                </div>
              ))}
            </div>
          )}
          {result.deleted !== undefined && (
            <p className="text-sm text-gray-600 mt-2">
              Deleted: {result.deleted} {result.total && `/ ${result.total}`}
            </p>
          )}
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{confirmModal.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{confirmModal.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              This action cannot be undone. Type <strong>DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setConfirmModal(null);
                  setConfirmText('');
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => runCleanup(confirmModal.action)}
                disabled={confirmText !== 'DELETE' || actionLoading !== null}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {actionLoading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
