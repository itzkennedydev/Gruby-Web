'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Search,
  RefreshCw,
  Loader2,
  Image,
  MessageSquare,
  Video,
  Star,
  MoreVertical,
  Eye,
  Flag,
  Trash2,
  CheckCircle,
  XCircle,
  Award,
  User,
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  imageUrl?: string;
  author?: {
    id: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
  };
  moderationStatus: string;
  flagCount: number;
  createdAt: string;
  rating?: number;
  cookTime?: string;
  category?: string;
}

interface ContentResponse {
  success: boolean;
  data: {
    items: ContentItem[];
    counts: Record<string, number>;
    pagination: {
      limit: number;
      hasMore: boolean;
      nextCursor: string | null;
    };
  };
}

type ContentType = 'recipes' | 'posts' | 'stories' | 'reviews';
type StatusFilter = 'all' | 'pending' | 'approved' | 'flagged' | 'removed';

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [contentType, setContentType] = useState<ContentType>('recipes');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{ item: ContentItem; action: string } | null>(null);
  const [reason, setReason] = useState('');

  const fetchContent = useCallback(async (append = false) => {
    if (!append) setLoading(true);
    try {
      const params = new URLSearchParams({
        type: contentType,
        limit: '25',
      });
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);
      if (append && cursor) params.set('startAfter', cursor);

      const res = await fetch(`/api/admin/content?${params}`);
      const data: ContentResponse = await res.json();

      if (data.success) {
        setItems(prev => append ? [...prev, ...data.data.items] : data.data.items);
        setCounts(data.data.counts);
        setHasMore(data.data.pagination.hasMore);
        setCursor(data.data.pagination.nextCursor);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  }, [contentType, statusFilter, searchQuery, cursor]);

  useEffect(() => {
    setCursor(null);
    fetchContent(false);
  }, [contentType, statusFilter, searchQuery]);

  const handleAction = async (contentId: string, action: string, actionReason?: string) => {
    setActionLoading(contentId);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contentType,
          contentId,
          action,
          reason: actionReason,
        }),
      });

      if (res.ok) {
        fetchContent(false);
        setActionModal(null);
        setReason('');
        setShowActionMenu(null);
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (item: ContentItem) => {
    if (!confirm(`Permanently delete this ${contentType.slice(0, -1)}? This cannot be undone.`)) return;

    setActionLoading(item.id);
    try {
      const res = await fetch(`/api/admin/content?type=${contentType}&id=${item.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchContent(false);
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'flagged':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
            <Flag className="w-3 h-3" />
            Flagged
          </span>
        );
      case 'removed':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 flex items-center gap-1 w-fit">
            <XCircle className="w-3 h-3" />
            Removed
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 flex items-center gap-1 w-fit">
            Pending
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recipes':
        return <FileText className="w-5 h-5" />;
      case 'posts':
        return <Image className="w-5 h-5" />;
      case 'stories':
        return <Video className="w-5 h-5" />;
      case 'reviews':
        return <Star className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading && items.length === 0) {
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
          <h2 className="text-2xl font-semibold text-gray-900">Content Moderation</h2>
          <p className="text-gray-500 mt-1">
            {counts.total || 0} total {contentType}
          </p>
        </div>
        <button
          onClick={() => {
            setCursor(null);
            fetchContent(false);
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Content Type Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {(['recipes', 'posts', 'stories', 'reviews'] as ContentType[]).map((type) => (
          <button
            key={type}
            onClick={() => setContentType(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              contentType === type
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {getTypeIcon(type)}
            {type}
          </button>
        ))}
      </div>

      {/* Search and Status Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'flagged', 'removed'] as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
              {counts[status] !== undefined && status !== 'all' && (
                <span className="ml-1 opacity-70">({counts[status]})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No content found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {getStatusBadge(item.moderationStatus)}
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      {item.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.author.displayName || item.author.email}
                        </span>
                      )}
                      <span>{formatDate(item.createdAt)}</span>
                      {item.flagCount > 0 && (
                        <span className="text-yellow-600 flex items-center gap-1">
                          <Flag className="w-3 h-3" />
                          {item.flagCount} flags
                        </span>
                      )}
                      {item.rating !== undefined && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {item.rating}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowActionMenu(showActionMenu === item.id ? null : item.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>

                    {showActionMenu === item.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowActionMenu(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        {item.moderationStatus !== 'approved' && (
                          <button
                            onClick={() => handleAction(item.id, 'approve')}
                            disabled={actionLoading === item.id}
                            className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                        )}
                        {item.moderationStatus !== 'flagged' && (
                          <button
                            onClick={() => {
                              setActionModal({ item, action: 'flag' });
                              setShowActionMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Flag className="w-4 h-4" />
                            Flag
                          </button>
                        )}
                        {!item.moderationStatus?.includes('featured') && (
                          <button
                            onClick={() => handleAction(item.id, 'feature')}
                            disabled={actionLoading === item.id}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Award className="w-4 h-4" />
                            Feature
                          </button>
                        )}
                        {item.moderationStatus !== 'removed' && (
                          <button
                            onClick={() => {
                              setActionModal({ item, action: 'remove' });
                              setShowActionMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            Remove
                          </button>
                        )}
                        {item.moderationStatus === 'removed' && (
                          <button
                            onClick={() => handleAction(item.id, 'restore')}
                            disabled={actionLoading === item.id}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Restore
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={actionLoading === item.id}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-100"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Permanently
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="px-6 py-4 border-t border-gray-200 text-center">
            <button
              onClick={() => fetchContent(true)}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedItem.title}</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {selectedItem.imageUrl && (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-gray-900 capitalize">{selectedItem.type}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {getStatusBadge(selectedItem.moderationStatus)}
                </div>

                {selectedItem.author && (
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="text-gray-900">
                      {selectedItem.author.displayName || selectedItem.author.email}
                    </p>
                  </div>
                )}

                {selectedItem.description && (
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-gray-900">{selectedItem.description}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-gray-900">{formatDate(selectedItem.createdAt)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Content ID</p>
                  <p className="text-xs font-mono text-gray-600 break-all">{selectedItem.id}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => handleAction(selectedItem.id, 'approve')}
                  disabled={actionLoading === selectedItem.id}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setActionModal({ item: selectedItem, action: 'remove' });
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {actionModal.action === 'flag' ? 'Flag Content' : 'Remove Content'}
            </h3>
            <p className="text-gray-600 mb-4">
              {actionModal.action === 'flag'
                ? `Flag "${actionModal.item.title}" for review?`
                : `Remove "${actionModal.item.title}"? The author will be notified.`}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActionModal(null);
                  setReason('');
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(actionModal.item.id, actionModal.action, reason)}
                disabled={actionLoading === actionModal.item.id}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {actionLoading === actionModal.item.id ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showActionMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowActionMenu(null)}
        />
      )}
    </div>
  );
}
