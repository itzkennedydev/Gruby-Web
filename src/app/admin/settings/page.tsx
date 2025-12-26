'use client';

import { useState, useEffect } from 'react';
import {
  Settings,
  Bell,
  Shield,
  Globe,
  Palette,
  Database,
  RefreshCw,
  Loader2,
  Save,
  Check,
  AlertTriangle,
  Mail,
  Smartphone,
} from 'lucide-react';

interface SettingsData {
  maintenance: {
    enabled: boolean;
    message: string;
  };
  features: {
    newUserSignups: boolean;
    recipeCreation: boolean;
    messaging: boolean;
    stories: boolean;
  };
  notifications: {
    adminAlerts: boolean;
    errorReports: boolean;
    weeklyDigest: boolean;
  };
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    maintenance: {
      enabled: false,
      message: 'We are performing scheduled maintenance. Please check back soon.',
    },
    features: {
      newUserSignups: true,
      recipeCreation: true,
      messaging: true,
      stories: true,
    },
    notifications: {
      adminAlerts: true,
      errorReports: true,
      weeklyDigest: false,
    },
  });

  useEffect(() => {
    // Simulated settings load
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setSettings(prev => ({ ...prev, ...data.data }));
          }
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateSettings', settings }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = <K extends keyof SettingsData>(
    category: K,
    key: keyof SettingsData[K],
    value: boolean | string
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
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
          <h2 className="text-2xl font-semibold text-gray-900">Admin Settings</h2>
          <p className="text-gray-500 mt-1">Configure platform settings and features</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          } disabled:opacity-50`}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-900">Maintenance Mode</h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Enable Maintenance Mode</p>
              <p className="text-sm text-gray-500">
                Show maintenance message to all users
              </p>
            </div>
            <div
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.maintenance.enabled ? 'bg-yellow-500' : 'bg-gray-200'
              }`}
              onClick={() => updateSetting('maintenance', 'enabled', !settings.maintenance.enabled)}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  settings.maintenance.enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </div>
          </label>

          {settings.maintenance.enabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maintenance Message
              </label>
              <textarea
                value={settings.maintenance.message}
                onChange={(e) => updateSetting('maintenance', 'message', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20 resize-none"
                placeholder="Enter maintenance message..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Feature Toggles</h3>
        </div>

        <div className="space-y-4">
          {[
            { key: 'newUserSignups', label: 'New User Signups', desc: 'Allow new users to create accounts' },
            { key: 'recipeCreation', label: 'Recipe Creation', desc: 'Allow creators to post new recipes' },
            { key: 'messaging', label: 'Direct Messaging', desc: 'Enable user-to-user messaging' },
            { key: 'stories', label: 'Stories', desc: 'Enable story creation and viewing' },
          ].map((feature) => (
            <label key={feature.key} className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">{feature.label}</p>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
              <div
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.features[feature.key as keyof typeof settings.features]
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}
                onClick={() =>
                  updateSetting(
                    'features',
                    feature.key as keyof typeof settings.features,
                    !settings.features[feature.key as keyof typeof settings.features]
                  )
                }
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                    settings.features[feature.key as keyof typeof settings.features]
                      ? 'translate-x-6'
                      : 'translate-x-0.5'
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Admin Notifications</h3>
        </div>

        <div className="space-y-4">
          {[
            { key: 'adminAlerts', label: 'Admin Alerts', desc: 'Receive alerts for new creator applications and reports' },
            { key: 'errorReports', label: 'Error Reports', desc: 'Get notified about system errors' },
            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive weekly platform statistics' },
          ].map((notif) => (
            <label key={notif.key} className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-gray-900">{notif.label}</p>
                <p className="text-sm text-gray-500">{notif.desc}</p>
              </div>
              <div
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications[notif.key as keyof typeof settings.notifications]
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}
                onClick={() =>
                  updateSetting(
                    'notifications',
                    notif.key as keyof typeof settings.notifications,
                    !settings.notifications[notif.key as keyof typeof settings.notifications]
                  )
                }
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                    settings.notifications[notif.key as keyof typeof settings.notifications]
                      ? 'translate-x-6'
                      : 'translate-x-0.5'
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/cleanup"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Data Cleanup</p>
              <p className="text-sm text-gray-500">Remove demo data and cleanup</p>
            </div>
          </a>

          <a
            href="/admin/tools"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Developer Tools</p>
              <p className="text-sm text-gray-500">API testing and cache management</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
