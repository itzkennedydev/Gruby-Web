'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  RefreshCw,
  Loader2,
  User,
  Bug,
  Lightbulb,
  HelpCircle,
  AlertCircle,
  Send,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

interface FeedbackUser {
  id: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

interface FeedbackResponseItem {
  message: string;
  respondedBy: string;
  respondedAt: string;
  isAdmin?: boolean;
}

interface Ticket {
  id: string;
  subject: string;
  message: string;
  category: string;
  priority: string;
  status: string;
  user?: FeedbackUser;
  userEmail?: string;
  deviceInfo?: string;
  appVersion?: string;
  responses: FeedbackResponseItem[];
  createdAt: string;
  updatedAt?: string;
  assignedTo?: string;
}

interface FeedbackData {
  success: boolean;
  data: {
    tickets: Ticket[];
    counts: Record<string, number>;
    categoryCounts: Record<string, number>;
  };
}

type StatusFilter = 'all' | 'open' | 'in_progress' | 'resolved' | 'closed';

export default function FeedbackPage() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('open');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '50' });
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (categoryFilter !== 'all') params.set('category', categoryFilter);

      const res = await fetch(`/api/admin/feedback?${params}`);
      const data: FeedbackData = await res.json();

      if (data.success) {
        setTickets(data.data.tickets);
        setCounts(data.data.counts);
        setCategoryCounts(data.data.categoryCounts);
      }
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleAction = async (ticketId: string, action: string) => {
    setActionLoading(ticketId);
    try {
      const res = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, action }),
      });

      if (res.ok) {
        fetchFeedback();
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const sendReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    setActionLoading(selectedTicket.id);
    try {
      const res = await fetch('/api/admin/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          message: replyMessage,
        }),
      });

      if (res.ok) {
        setReplyMessage('');
        fetchFeedback();
        setSelectedTicket(null);
      }
    } catch (error) {
      console.error('Reply failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bug':
        return <Bug className="w-4 h-4 text-red-500" />;
      case 'feature':
        return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'question':
        return <HelpCircle className="w-4 h-4 text-blue-500" />;
      case 'complaint':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3" />
            Open
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
            <Loader2 className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
            <CheckCircle className="w-3 h-3" />
            Resolved
          </span>
        );
      case 'closed':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 flex items-center gap-1 w-fit">
            <XCircle className="w-3 h-3" />
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && tickets.length === 0) {
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
          <h2 className="text-2xl font-semibold text-gray-900">User Feedback</h2>
          <p className="text-gray-500 mt-1">
            {counts.open || 0} open, {counts.total || 0} total tickets
          </p>
        </div>
        <button
          onClick={fetchFeedback}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(['bug', 'feature', 'question', 'complaint', 'other'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(categoryFilter === cat ? 'all' : cat)}
            className={`p-4 bg-white border rounded-xl text-center transition-colors ${
              categoryFilter === cat ? 'border-gray-900' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-center mb-2">{getCategoryIcon(cat)}</div>
            <p className="text-2xl font-semibold text-gray-900">{categoryCounts[cat] || 0}</p>
            <p className="text-xs text-gray-500 capitalize">{cat}</p>
          </button>
        ))}
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'open', 'in_progress', 'resolved', 'closed'] as StatusFilter[]).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
              statusFilter === status
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.replace('_', ' ')}
            {counts[status] !== undefined && status !== 'all' && (
              <span className="ml-1 opacity-70">({counts[status]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No feedback tickets found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(ticket.category)}
                      <span className="font-medium text-gray-900">{ticket.subject}</span>
                      {getStatusBadge(ticket.status)}
                      {ticket.priority === 'high' && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
                          High Priority
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-1 mb-2">{ticket.message}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {ticket.user && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {ticket.user.displayName || ticket.userEmail}
                        </span>
                      )}
                      <span>{formatDate(ticket.createdAt)}</span>
                      {ticket.responses.length > 0 && (
                        <span className="text-blue-500">{ticket.responses.length} replies</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {ticket.status === 'open' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(ticket.id, 'resolve');
                        }}
                        disabled={actionLoading === ticket.id}
                        className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(selectedTicket.category)}
                    <h3 className="text-lg font-semibold text-gray-900">{selectedTicket.subject}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedTicket.status)}
                    <span className="text-sm text-gray-500">{formatDate(selectedTicket.createdAt)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* User info */}
              {selectedTicket.user && (
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  {selectedTicket.user.photoURL ? (
                    <img
                      src={selectedTicket.user.photoURL}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedTicket.user.displayName || 'Unknown User'}
                    </p>
                    <p className="text-sm text-gray-500">{selectedTicket.userEmail}</p>
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="mb-4">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedTicket.message}</p>
              </div>

              {/* Device info */}
              {(selectedTicket.deviceInfo || selectedTicket.appVersion) && (
                <div className="text-sm text-gray-500 mb-4 p-3 bg-gray-50 rounded-lg">
                  {selectedTicket.appVersion && <p>App Version: {selectedTicket.appVersion}</p>}
                  {selectedTicket.deviceInfo && <p>Device: {selectedTicket.deviceInfo}</p>}
                </div>
              )}

              {/* Responses */}
              {selectedTicket.responses.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Responses</h4>
                  <div className="space-y-2">
                    {selectedTicket.responses.map((response, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          response.isAdmin ? 'bg-blue-50 ml-4' : 'bg-gray-50'
                        }`}
                      >
                        <p className="text-gray-900">{response.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {response.respondedBy} - {formatDate(response.respondedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply */}
              <div className="border-t border-gray-200 pt-4">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20 resize-none mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={sendReply}
                    disabled={actionLoading === selectedTicket.id || !replyMessage.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    Send Reply
                  </button>
                  {selectedTicket.status !== 'resolved' && (
                    <button
                      onClick={() => handleAction(selectedTicket.id, 'resolve')}
                      disabled={actionLoading === selectedTicket.id}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Mark Resolved
                    </button>
                  )}
                  {selectedTicket.status !== 'closed' && (
                    <button
                      onClick={() => handleAction(selectedTicket.id, 'close')}
                      disabled={actionLoading === selectedTicket.id}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
