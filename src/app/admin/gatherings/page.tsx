'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  CalendarDays,
  Search,
  RefreshCw,
  Loader2,
  MapPin,
  Users,
  Calendar,
  MoreVertical,
  Eye,
  Ban,
  CheckCircle,
  Trash2,
  ExternalLink,
  Clock,
  Lock,
  Globe,
} from 'lucide-react';

interface Gathering {
  id: string;
  title: string;
  description?: string;
  hostId: string;
  hostDisplayName?: string;
  hostPhotoURL?: string;
  startTime: string;
  endTime?: string;
  location?: {
    city?: string;
    state?: string;
    address?: string;
  };
  type: string;
  maxParticipants: number;
  currentParticipants: number;
  coverImageUrl?: string;
  isPrivate: boolean;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
}

interface GatheringsResponse {
  success: boolean;
  data: {
    gatherings: Gathering[];
    pagination: {
      limit: number;
      hasMore: boolean;
      nextCursor: string | null;
    };
    counts: {
      total: number;
      published: number;
      cancelled: number;
    };
  };
}

type StatusFilter = 'all' | 'published' | 'cancelled' | 'completed';

export default function GatheringsPage() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [counts, setCounts] = useState({ total: 0, published: 0, cancelled: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [selectedGathering, setSelectedGathering] = useState<Gathering | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Gathering | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const fetchGatherings = useCallback(async (append = false) => {
    if (!append) setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '25' });
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);
      if (append && cursor) params.set('startAfter', cursor);

      const res = await fetch(`/api/admin/gatherings?${params}`);
      const data: GatheringsResponse = await res.json();

      if (data.success) {
        setGatherings(prev => append ? [...prev, ...data.data.gatherings] : data.data.gatherings);
        setCounts(data.data.counts);
        setHasMore(data.data.pagination.hasMore);
        setCursor(data.data.pagination.nextCursor);
      }
    } catch (error) {
      console.error('Failed to fetch gatherings:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery, cursor]);

  useEffect(() => {
    setCursor(null);
    fetchGatherings(false);
  }, [statusFilter, searchQuery]);

  const updateGathering = async (gatheringId: string, updates: Partial<Gathering>) => {
    setActionLoading(gatheringId);
    try {
      const res = await fetch('/api/admin/gatherings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gatheringId, updates }),
      });

      if (res.ok) {
        setGatherings(prev =>
          prev.map(g => (g.id === gatheringId ? { ...g, ...updates } : g))
        );
        setSelectedGathering(null);
        setShowActionMenu(null);
        setMenuPosition(null);
      }
    } catch (error) {
      console.error('Failed to update gathering:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const cancelGathering = (gathering: Gathering) => {
    const reason = prompt('Enter cancellation reason (optional):');
    updateGathering(gathering.id, {
      status: 'cancelled',
      ...(reason ? { moderationNote: reason } as any : {}),
    });
  };

  const reinstateGathering = (gathering: Gathering) => {
    updateGathering(gathering.id, { status: 'published' });
  };

  const deleteGathering = async (gathering: Gathering) => {
    setActionLoading(gathering.id);
    try {
      const res = await fetch(`/api/admin/gatherings?gatheringId=${gathering.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setGatherings(prev => prev.filter(g => g.id !== gathering.id));
        setDeleteConfirm(null);
        setSelectedGathering(null);
        setShowActionMenu(null);
        setMenuPosition(null);
      }
    } catch (error) {
      console.error('Failed to delete gathering:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatShortDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 flex items-center gap-1 w-fit">
            <Ban className="w-3 h-3" />
            Cancelled
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 flex items-center gap-1 w-fit">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3" />
            Draft
          </span>
        );
    }
  };

  const getLocationString = (location?: Gathering['location']) => {
    if (!location) return 'No location';
    const parts = [location.city, location.state].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'No location';
  };

  if (loading && gatherings.length === 0) {
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
          <h2 className="text-2xl font-semibold text-gray-900">Gathering Management</h2>
          <p className="text-gray-500 mt-1">
            {counts.total.toLocaleString()} total gatherings, {counts.published} active, {counts.cancelled} cancelled
          </p>
        </div>
        <button
          onClick={() => {
            setCursor(null);
            fetchGatherings(false);
          }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or host..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'cancelled', 'completed'] as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Gatherings Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        {gatherings.length === 0 ? (
          <div className="text-center py-12">
            <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No gatherings found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gathering
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Host
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participants
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {gatherings.map((gathering) => (
                    <tr key={gathering.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {gathering.coverImageUrl ? (
                            <img
                              src={gathering.coverImageUrl}
                              alt={gathering.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <CalendarDays className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900 flex items-center gap-2">
                              {gathering.title}
                              {gathering.isPrivate && (
                                <Lock className="w-3 h-3 text-gray-400" />
                              )}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {getLocationString(gathering.location)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {gathering.hostPhotoURL ? (
                            <img
                              src={gathering.hostPhotoURL}
                              alt={gathering.hostDisplayName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <Users className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                          <span className="text-sm text-gray-900">
                            {gathering.hostDisplayName || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(gathering.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatShortDate(gathering.startTime)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {gathering.currentParticipants}/{gathering.maxParticipants}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          ref={(el) => {
                            if (el) buttonRefs.current.set(gathering.id, el);
                          }}
                          onClick={() => {
                            if (showActionMenu === gathering.id) {
                              setShowActionMenu(null);
                              setMenuPosition(null);
                            } else {
                              const button = buttonRefs.current.get(gathering.id);
                              if (button) {
                                const rect = button.getBoundingClientRect();
                                setMenuPosition({
                                  top: rect.bottom + 4,
                                  left: rect.right - 192,
                                });
                              }
                              setShowActionMenu(gathering.id);
                            }
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="px-6 py-4 border-t border-gray-200 text-center">
                <button
                  onClick={() => fetchGatherings(true)}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Gathering Detail Modal */}
      {selectedGathering && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {selectedGathering.coverImageUrl ? (
                  <img
                    src={selectedGathering.coverImageUrl}
                    alt={selectedGathering.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                    <CalendarDays className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    {selectedGathering.title}
                    {selectedGathering.isPrivate ? (
                      <Lock className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Globe className="w-4 h-4 text-gray-400" />
                    )}
                  </h3>
                  {getStatusBadge(selectedGathering.status)}
                </div>
              </div>
              <button
                onClick={() => setSelectedGathering(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                x
              </button>
            </div>

            <div className="space-y-4">
              {selectedGathering.description && (
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-900">{selectedGathering.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Host</p>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedGathering.hostPhotoURL && (
                      <img
                        src={selectedGathering.hostPhotoURL}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <p className="text-gray-900">{selectedGathering.hostDisplayName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-gray-900 capitalize">{selectedGathering.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-gray-900">{formatDate(selectedGathering.startTime)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="text-gray-900">
                    {selectedGathering.currentParticipants} / {selectedGathering.maxParticipants}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-900">
                  {selectedGathering.location?.address || getLocationString(selectedGathering.location)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Gathering ID</p>
                <p className="text-xs font-mono text-gray-600 break-all">{selectedGathering.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-gray-900">{formatDate(selectedGathering.createdAt)}</p>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex gap-3">
                <a
                  href={`/gathering/${selectedGathering.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Page
                </a>
                {selectedGathering.status === 'cancelled' ? (
                  <button
                    onClick={() => reinstateGathering(selectedGathering)}
                    disabled={actionLoading === selectedGathering.id}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    Reinstate
                  </button>
                ) : (
                  <button
                    onClick={() => cancelGathering(selectedGathering)}
                    disabled={actionLoading === selectedGathering.id}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    Cancel Gathering
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedGathering(null);
                  setDeleteConfirm(selectedGathering);
                }}
                className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Gathering
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portal-based Action Menu */}
      {showActionMenu && menuPosition && typeof document !== 'undefined' && createPortal(
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowActionMenu(null);
              setMenuPosition(null);
            }}
          />
          <div
            className="fixed w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            style={{ top: menuPosition.top, left: menuPosition.left }}
          >
            {(() => {
              const gathering = gatherings.find(g => g.id === showActionMenu);
              if (!gathering) return null;
              return (
                <>
                  <button
                    onClick={() => {
                      setSelectedGathering(gathering);
                      setShowActionMenu(null);
                      setMenuPosition(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <a
                    href={`/gathering/${gathering.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Page
                  </a>
                  <div className="border-t border-gray-100 my-1" />
                  {gathering.status === 'cancelled' ? (
                    <button
                      onClick={() => {
                        reinstateGathering(gathering);
                        setMenuPosition(null);
                      }}
                      disabled={actionLoading === gathering.id}
                      className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Reinstate
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        cancelGathering(gathering);
                        setMenuPosition(null);
                      }}
                      disabled={actionLoading === gathering.id}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Ban className="w-4 h-4" />
                      Cancel Gathering
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setDeleteConfirm(gathering);
                      setShowActionMenu(null);
                      setMenuPosition(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              );
            })()}
          </div>
        </>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Gathering</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {deleteConfirm.coverImageUrl ? (
                  <img
                    src={deleteConfirm.coverImageUrl}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{deleteConfirm.title}</p>
                  <p className="text-sm text-gray-500">
                    {deleteConfirm.currentParticipants} participants
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              This will permanently delete the gathering, all participants, messages, and associated data.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteGathering(deleteConfirm)}
                disabled={actionLoading === deleteConfirm.id}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading === deleteConfirm.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
