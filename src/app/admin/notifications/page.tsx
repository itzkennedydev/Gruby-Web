'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Bell,
  Send,
  Users,
  User,
  Loader2,
  RefreshCw,
  Check,
  Clock,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  body: string;
  type: string;
  targetUserId?: string;
  isBroadcast: boolean;
  createdAt: string;
  createdBy: string;
  status: 'pending' | 'sent' | 'partial' | 'failed';
  sentCount?: number;
  failedCount?: number;
  errors?: string[];
}

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [targetType, setTargetType] = useState<'broadcast' | 'user'>('broadcast');
  const [userId, setUserId] = useState('');

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notifications');
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data.notifications);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const sendNotification = async () => {
    if (!title.trim() || !body.trim()) return;
    if (targetType === 'user' && !userId.trim()) return;

    setSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          body,
          userId: targetType === 'user' ? userId : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const { sentCount, failedCount } = data.data;
        if (sentCount > 0) {
          setResult({
            type: 'success',
            message: `Sent to ${sentCount} device(s)${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
          });
          setTitle('');
          setBody('');
          setUserId('');
        } else {
          setResult({
            type: 'error',
            message: data.data.errors?.[0] || 'Failed to send notification',
          });
        }
        fetchNotifications();
      } else {
        setResult({
          type: 'error',
          message: data.error || 'Failed to send notification',
        });
      }
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Network error - please try again',
      });
    } finally {
      setSending(false);
      // Clear result after 5 seconds
      setTimeout(() => setResult(null), 5000);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    if (!confirm('Delete this notification from history?')) return;

    setDeleting(notificationId);
    try {
      const res = await fetch(`/api/admin/notifications?id=${notificationId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    } finally {
      setDeleting(null);
    }
  };

  // Quick templates
  const templates = [
    {
      name: 'Welcome',
      title: 'Welcome to Gruby!',
      body: 'Start exploring recipes and connect with food lovers.',
    },
    {
      name: 'New Feature',
      title: 'New Feature Available',
      body: 'Check out our latest update with exciting new features!',
    },
    {
      name: 'Maintenance',
      title: 'Scheduled Maintenance',
      body: 'We will be performing maintenance shortly. Thank you for your patience.',
    },
    {
      name: 'Promotion',
      title: 'Special Offer',
      body: 'Limited time offer! Check out our latest deals.',
    },
  ];

  const applyTemplate = (template: typeof templates[0]) => {
    setTitle(template.title);
    setBody(template.body);
  };

  const getStatusBadge = (status: string, sentCount?: number, failedCount?: number) => {
    switch (status) {
      case 'sent':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Sent{sentCount ? ` (${sentCount})` : ''}
          </span>
        );
      case 'partial':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Partial ({sentCount}/{(sentCount || 0) + (failedCount || 0)})
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Push Notifications</h2>
        <p className="text-gray-500 mt-1">Send push notifications to users via FCM</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Notification
          </h3>

          <div className="space-y-4">
            {/* Target Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTargetType('broadcast')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    targetType === 'broadcast'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  All Users
                </button>
                <button
                  onClick={() => setTargetType('user')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    targetType === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Specific User
                </button>
              </div>
            </div>

            {/* User ID (if targeting specific user) */}
            {targetType === 'user' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User ID
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter user ID..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                />
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification title..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Notification message..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-24 resize-none"
              />
            </div>

            {/* Templates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Templates
              </label>
              <div className="flex flex-wrap gap-2">
                {templates.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => applyTemplate(template)}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Message */}
            {result && (
              <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                result.type === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}>
                {result.type === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {result.message}
              </div>
            )}

            {/* Send Button */}
            <button
              onClick={sendNotification}
              disabled={sending || !title.trim() || !body.trim() || (targetType === 'user' && !userId.trim())}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {sending ? 'Sending...' : 'Send Push Notification'}
            </button>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Notifications
            </h3>
            <button
              onClick={fetchNotifications}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications sent yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 bg-gray-50 rounded-lg group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{notif.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notif.body}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getStatusBadge(notif.status, notif.sentCount, notif.failedCount)}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        disabled={deleting === notif.id}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete"
                      >
                        {deleting === notif.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className={`px-1.5 py-0.5 rounded ${
                      notif.isBroadcast ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {notif.isBroadcast ? 'Broadcast' : 'User'}
                    </span>
                    <span>{new Date(notif.createdAt).toLocaleString()}</span>
                    <span className="truncate">by {notif.createdBy?.split('@')[0]}</span>
                  </div>
                  {notif.errors && notif.errors.length > 0 && (
                    <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600">
                      {notif.errors[0]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Push Notification Requirements</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
              <li>Users must have push notifications enabled in the app</li>
              <li>Users need a valid FCM token registered (happens on app launch)</li>
              <li>Broadcasts are limited to 500 users per send for safety</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
