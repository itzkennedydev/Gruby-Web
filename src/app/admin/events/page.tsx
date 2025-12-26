'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Flag,
  Trash2,
  Eye,
  RotateCcw,
  Ban,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface Gathering {
  id: string;
  title: string;
  description: string;
  hostId: string;
  hostName: string;
  hostEmail?: string;
  location: {
    address: string;
  };
  date: string;
  time: string;
  attendees: string[];
  maxAttendees: number;
  imageUrl?: string;
  status: 'active' | 'cancelled' | 'completed' | 'flagged' | 'removed';
  isDemo?: boolean;
  createdAt: string;
}

interface Counts {
  total: number;
  active: number;
  cancelled: number;
  completed: number;
  flagged: number;
  removed: number;
  demo: number;
}

export default function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedGathering, setSelectedGathering] = useState<Gathering | null>(null);
  const [actionModal, setActionModal] = useState<{ gathering: Gathering; action: string } | null>(null);
  const [reason, setReason] = useState('');

  const fetchGatherings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/events?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setGatherings(data.data.gatherings);
        setCounts(data.data.counts);
      }
    } catch (error) {
      console.error('Failed to fetch gatherings:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchGatherings();
  }, [fetchGatherings]);

  const handleAction = async (gatheringId: string, action: string, actionReason?: string) => {
    setActionLoading(gatheringId);
    try {
      const res = await fetch('/api/admin/events', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gatheringId, action, reason: actionReason }),
      });

      if (res.ok) {
        fetchGatherings();
        setActionModal(null);
        setReason('');
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (gatheringId: string) => {
    if (!confirm('Permanently delete this event? This cannot be undone.')) return;

    setActionLoading(gatheringId);
    try {
      const res = await fetch(`/api/admin/events?id=${gatheringId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchGatherings();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveAllDemo = async () => {
    if (!confirm('Permanently delete ALL demo gatherings? This will find and remove all gatherings with IDs starting with "demo-".')) return;

    setActionLoading('bulk');
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'removeDemo' }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Deleted ${data.data.count} demo gatherings`);
        fetchGatherings();
      } else {
        alert(data.error || 'Failed to delete demo gatherings');
      }
    } catch (error) {
      console.error('Bulk remove failed:', error);
      alert('Failed to delete demo gatherings');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteAllRemoved = async () => {
    if (!confirm('Permanently delete ALL removed events? This action cannot be undone.')) return;

    setActionLoading('bulk-removed');
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteAllRemoved' }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Permanently deleted ${data.data.count} removed events`);
        fetchGatherings();
      } else {
        alert(data.error || 'Failed to delete removed events');
      }
    } catch (error) {
      console.error('Bulk delete removed failed:', error);
      alert('Failed to delete removed events');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-gray-200 text-gray-600';
      case 'completed': return 'bg-gray-100 text-gray-600';
      case 'flagged': return 'bg-gray-300 text-gray-800';
      case 'removed': return 'bg-gray-900 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <Ban className="w-4 h-4" />;
      case 'completed': return <Clock className="w-4 h-4" />;
      case 'flagged': return <Flag className="w-4 h-4" />;
      case 'removed': return <Trash2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'No date';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
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
          <h2 className="text-2xl font-semibold text-gray-900">Events</h2>
          <p className="text-gray-500 mt-1">Moderate gatherings and events</p>
        </div>
        <div className="flex items-center gap-2">
          {counts && counts.removed > 0 && (
            <button
              onClick={handleDeleteAllRemoved}
              disabled={actionLoading === 'bulk-removed'}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {actionLoading === 'bulk-removed' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete Removed ({counts.removed})
            </button>
          )}
          {counts && counts.demo > 0 && (
            <button
              onClick={handleRemoveAllDemo}
              disabled={actionLoading === 'bulk'}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {actionLoading === 'bulk' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete Demo ({counts.demo})
            </button>
          )}
          <button
            onClick={fetchGatherings}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      {counts && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">{counts.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">{counts.active}</p>
            <p className="text-sm text-gray-500">Active</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">{counts.completed}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">{counts.flagged}</p>
            <p className="text-sm text-gray-500">Flagged</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">{counts.removed}</p>
            <p className="text-sm text-gray-500">Removed</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">{counts.demo}</p>
            <p className="text-sm text-gray-500">Demo</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'active', 'flagged', 'cancelled', 'removed', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
              statusFilter === status
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {gatherings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No events found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {gatherings.map((gathering) => (
              <div
                key={gathering.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  gathering.isDemo ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                    {gathering.imageUrl ? (
                      <img
                        src={gathering.imageUrl}
                        alt={gathering.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-gray-900 truncate">
                          {gathering.title}
                          {gathering.isDemo && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                              Demo
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Hosted by {gathering.hostName}
                          {gathering.hostEmail && (
                            <span className="text-gray-400"> ({gathering.hostEmail})</span>
                          )}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusColor(gathering.status)}`}>
                        {getStatusIcon(gathering.status)}
                        {gathering.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(gathering.date)} {gathering.time && `at ${gathering.time}`}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {gathering.location?.address || 'No location'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {gathering.attendees?.length || 0}/{gathering.maxAttendees}
                      </span>
                    </div>

                    {gathering.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {gathering.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setSelectedGathering(gathering)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {gathering.status === 'active' && (
                      <button
                        onClick={() => setActionModal({ gathering, action: 'flag' })}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Flag event"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                    )}

                    {gathering.status === 'flagged' && (
                      <button
                        onClick={() => handleAction(gathering.id, 'unflag')}
                        disabled={actionLoading === gathering.id}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Unflag event"
                      >
                        {actionLoading === gathering.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <RotateCcw className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    {gathering.status !== 'removed' && (
                      <button
                        onClick={() => setActionModal({ gathering, action: 'remove' })}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Remove event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {gathering.status === 'removed' && (
                      <>
                        <button
                          onClick={() => handleAction(gathering.id, 'restore')}
                          disabled={actionLoading === gathering.id}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Restore event"
                        >
                          {actionLoading === gathering.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <RotateCcw className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(gathering.id)}
                          disabled={actionLoading === gathering.id}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedGathering && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedGathering.title}</h3>
                <button
                  onClick={() => setSelectedGathering(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {selectedGathering.imageUrl && (
                <img
                  src={selectedGathering.imageUrl}
                  alt={selectedGathering.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Host</p>
                  <p className="text-gray-900">{selectedGathering.hostName}</p>
                  {selectedGathering.hostEmail && (
                    <p className="text-sm text-gray-500">{selectedGathering.hostEmail}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-gray-900">
                    {formatDate(selectedGathering.date)} {selectedGathering.time && `at ${selectedGathering.time}`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">{selectedGathering.location?.address || 'No location'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Attendees</p>
                  <p className="text-gray-900">
                    {selectedGathering.attendees?.length || 0} of {selectedGathering.maxAttendees} max
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedGathering.status)}`}>
                    {getStatusIcon(selectedGathering.status)}
                    {selectedGathering.status}
                  </span>
                </div>

                {selectedGathering.description && (
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-gray-900">{selectedGathering.description}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Event ID</p>
                  <p className="text-xs font-mono text-gray-400">{selectedGathering.id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-gray-900">{formatDate(selectedGathering.createdAt)}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                {selectedGathering.status === 'active' && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedGathering(null);
                        setActionModal({ gathering: selectedGathering, action: 'flag' });
                      }}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Flag
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGathering(null);
                        setActionModal({ gathering: selectedGathering, action: 'remove' });
                      }}
                      className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Remove
                    </button>
                  </>
                )}
                {selectedGathering.status === 'removed' && (
                  <button
                    onClick={() => {
                      handleAction(selectedGathering.id, 'restore');
                      setSelectedGathering(null);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Restore
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(selectedGathering.id);
                    setSelectedGathering(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Delete Permanently
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {actionModal.action === 'flag' ? 'Flag Event' : 'Remove Event'}
              </h3>
            </div>

            <p className="text-gray-600 mb-4">
              {actionModal.action === 'flag'
                ? `Flag "${actionModal.gathering.title}" for review?`
                : `Remove "${actionModal.gathering.title}"? The host will be notified.`}
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason (optional)
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
                onClick={() => handleAction(actionModal.gathering.id, actionModal.action, reason)}
                disabled={actionLoading === actionModal.gathering.id}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {actionLoading === actionModal.gathering.id ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
