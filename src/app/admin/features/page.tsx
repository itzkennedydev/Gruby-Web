'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ToggleLeft,
  Plus,
  Save,
  Loader2,
  RefreshCw,
  Trash2,
  Settings,
  Smartphone,
  Globe,
  Users,
} from 'lucide-react';

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetPlatforms: string[];
  targetUserGroups: string[];
  updatedAt: string;
  updatedBy: string;
}

export default function FeaturesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [platforms] = useState(['ios', 'android', 'web']);
  const [userGroups] = useState(['all', 'beta', 'creators', 'admins']);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFlag, setNewFlag] = useState({
    name: '',
    description: '',
    enabled: false,
    rolloutPercentage: 0,
    targetPlatforms: ['ios', 'android', 'web'],
    targetUserGroups: ['all'],
  });

  const fetchFlags = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/features');
      const data = await res.json();
      if (data.success) {
        setFlags(data.data.flags);
      }
    } catch (error) {
      console.error('Failed to fetch flags:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);

  const updateFlag = async (flagId: string, updates: Partial<FeatureFlag>) => {
    setSaving(flagId);
    try {
      const res = await fetch('/api/admin/features', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flagId, updates }),
      });

      if (res.ok) {
        fetchFlags();
      }
    } catch (error) {
      console.error('Failed to update flag:', error);
    } finally {
      setSaving(null);
    }
  };

  const createFlag = async () => {
    if (!newFlag.name.trim()) return;

    setSaving('new');
    try {
      const res = await fetch('/api/admin/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFlag),
      });

      if (res.ok) {
        fetchFlags();
        setShowCreateModal(false);
        setNewFlag({
          name: '',
          description: '',
          enabled: false,
          rolloutPercentage: 0,
          targetPlatforms: ['ios', 'android', 'web'],
          targetUserGroups: ['all'],
        });
      }
    } catch (error) {
      console.error('Failed to create flag:', error);
    } finally {
      setSaving(null);
    }
  };

  const deleteFlag = async (flagId: string) => {
    if (!confirm('Are you sure you want to delete this feature flag?')) return;

    setSaving(flagId);
    try {
      const res = await fetch(`/api/admin/features?id=${flagId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchFlags();
      }
    } catch (error) {
      console.error('Failed to delete flag:', error);
    } finally {
      setSaving(null);
    }
  };

  const togglePlatform = (flagId: string, flag: FeatureFlag, platform: string) => {
    const currentPlatforms = flag.targetPlatforms;
    const newPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter(p => p !== platform)
      : [...currentPlatforms, platform];
    updateFlag(flagId, { targetPlatforms: newPlatforms });
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
          <h2 className="text-2xl font-semibold text-gray-900">Feature Flags</h2>
          <p className="text-gray-500 mt-1">Control feature rollouts and A/B tests</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchFlags}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Flag
          </button>
        </div>
      </div>

      {/* Flags List */}
      <div className="space-y-4">
        {flags.map((flag) => (
          <div
            key={flag.id}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-gray-900 font-mono">{flag.name}</h3>
                  {saving === flag.id && (
                    <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{flag.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Last updated: {new Date(flag.updatedAt).toLocaleString()} by {flag.updatedBy}
                </p>
              </div>

              {/* Toggle */}
              <button
                onClick={() => updateFlag(flag.id, { enabled: !flag.enabled })}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  flag.enabled ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    flag.enabled ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Settings */}
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Rollout Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rollout Percentage
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={flag.rolloutPercentage}
                    onChange={(e) => updateFlag(flag.id, { rolloutPercentage: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12">{flag.rolloutPercentage}%</span>
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforms
                </label>
                <div className="flex gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(flag.id, flag, platform)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        flag.targetPlatforms.includes(platform)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {platform === 'ios' ? 'iOS' : platform === 'android' ? 'Android' : 'Web'}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Groups */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Users
                </label>
                <select
                  value={flag.targetUserGroups[0] || 'all'}
                  onChange={(e) => updateFlag(flag.id, { targetUserGroups: [e.target.value] })}
                  className="w-full px-3 py-1 border border-gray-200 rounded-lg text-sm"
                >
                  {userGroups.map((group) => (
                    <option key={group} value={group}>
                      {group.charAt(0).toUpperCase() + group.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delete */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => deleteFlag(flag.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {flags.length === 0 && (
          <div className="text-center py-12">
            <ToggleLeft className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No feature flags configured</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Feature Flag</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flag Name
                </label>
                <input
                  type="text"
                  value={newFlag.name}
                  onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                  placeholder="feature_name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newFlag.description}
                  onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })}
                  placeholder="What does this feature do?"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Enabled by default</span>
                <button
                  onClick={() => setNewFlag({ ...newFlag, enabled: !newFlag.enabled })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    newFlag.enabled ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      newFlag.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createFlag}
                  disabled={!newFlag.name.trim() || saving === 'new'}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {saving === 'new' ? 'Creating...' : 'Create Flag'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
