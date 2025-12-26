'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Flag,
  RefreshCw,
  Loader2,
  AlertTriangle,
  User,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUp,
} from 'lucide-react';

interface Reporter {
  id: string;
  displayName?: string;
  email?: string;
}

interface Report {
  id: string;
  contentType: string;
  contentId: string;
  reason: string;
  description?: string;
  status: string;
  priority: string;
  reporter?: Reporter;
  reportedUser?: Reporter;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  resolution?: string;
}

interface ReportsResponse {
  success: boolean;
  data: {
    reports: Report[];
    counts: Record<string, number>;
  };
}

type StatusFilter = 'all' | 'pending' | 'reviewed' | 'resolved' | 'dismissed';

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [actionModal, setActionModal] = useState<{ report: Report; action: string } | null>(null);
  const [resolution, setResolution] = useState('');
  const [banUser, setBanUser] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '50' });
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/reports?${params}`);
      const data: ReportsResponse = await res.json();

      if (data.success) {
        setReports(data.data.reports);
        setCounts(data.data.counts);
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleAction = async (reportId: string, action: string, actionResolution?: string, shouldBan?: boolean) => {
    setActionLoading(reportId);
    try {
      const res = await fetch('/api/admin/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          action,
          resolution: actionResolution,
          banUser: shouldBan,
        }),
      });

      if (res.ok) {
        fetchReports();
        setActionModal(null);
        setResolution('');
        setBanUser(false);
        setSelectedReport(null);
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'reviewed':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 flex items-center gap-1 w-fit">
            <Eye className="w-3 h-3" />
            Reviewed
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
            <CheckCircle className="w-3 h-3" />
            Resolved
          </span>
        );
      case 'dismissed':
        return (
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 flex items-center gap-1 w-fit">
            <XCircle className="w-3 h-3" />
            Dismissed
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high') {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 flex items-center gap-1 w-fit">
          <ArrowUp className="w-3 h-3" />
          High
        </span>
      );
    }
    return null;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && reports.length === 0) {
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
          <h2 className="text-2xl font-semibold text-gray-900">Reports</h2>
          <p className="text-gray-500 mt-1">
            {counts.pending || 0} pending, {counts.total || 0} total reports
          </p>
        </div>
        <button
          onClick={fetchReports}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'reviewed', 'resolved', 'dismissed'] as StatusFilter[]).map((status) => (
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
            {counts[status] !== undefined && status !== 'all' && (
              <span className="ml-1 opacity-70">({counts[status]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <Flag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reports found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{report.reason}</span>
                      {getStatusBadge(report.status)}
                      {getPriorityBadge(report.priority)}
                    </div>

                    <div className="text-sm text-gray-500 mb-2">
                      <span className="capitalize">{report.contentType}</span>
                      {report.description && <span className="mx-2">-</span>}
                      {report.description && (
                        <span className="line-clamp-1">{report.description}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {report.reporter && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {report.reporter.displayName || report.reporter.email}
                        </span>
                      )}
                      <span>{formatDate(report.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {report.status === 'pending' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(report.id, 'review');
                          }}
                          disabled={actionLoading === report.id}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                        >
                          Review
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionModal({ report, action: 'resolve' });
                          }}
                          className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionModal({ report, action: 'dismiss' });
                          }}
                          className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                        >
                          Dismiss
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
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Report Details</h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="text-gray-900">{selectedReport.reason}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {getStatusBadge(selectedReport.status)}
                </div>

                <div>
                  <p className="text-sm text-gray-500">Content Type</p>
                  <p className="text-gray-900 capitalize">{selectedReport.contentType}</p>
                </div>

                {selectedReport.description && (
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-gray-900">{selectedReport.description}</p>
                  </div>
                )}

                {selectedReport.reporter && (
                  <div>
                    <p className="text-sm text-gray-500">Reported By</p>
                    <p className="text-gray-900">
                      {selectedReport.reporter.displayName || selectedReport.reporter.email}
                    </p>
                  </div>
                )}

                {selectedReport.reportedUser && (
                  <div>
                    <p className="text-sm text-gray-500">Reported User</p>
                    <p className="text-gray-900">
                      {selectedReport.reportedUser.displayName || selectedReport.reportedUser.email}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Reported At</p>
                  <p className="text-gray-900">{formatDate(selectedReport.createdAt)}</p>
                </div>

                {selectedReport.reviewedAt && (
                  <div>
                    <p className="text-sm text-gray-500">Reviewed At</p>
                    <p className="text-gray-900">{formatDate(selectedReport.reviewedAt)}</p>
                    {selectedReport.reviewedBy && (
                      <p className="text-sm text-gray-500">by {selectedReport.reviewedBy}</p>
                    )}
                  </div>
                )}

                {selectedReport.resolution && (
                  <div>
                    <p className="text-sm text-gray-500">Resolution</p>
                    <p className="text-gray-900">{selectedReport.resolution}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Report ID</p>
                  <p className="text-xs font-mono text-gray-600 break-all">{selectedReport.id}</p>
                </div>
              </div>

              {selectedReport.status === 'pending' && (
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => handleAction(selectedReport.id, 'review')}
                    disabled={actionLoading === selectedReport.id}
                    className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                  >
                    Mark Reviewed
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReport(null);
                      setActionModal({ report: selectedReport, action: 'resolve' });
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReport(null);
                      setActionModal({ report: selectedReport, action: 'dismiss' });
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {actionModal.action === 'resolve' ? 'Resolve Report' : 'Dismiss Report'}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resolution Notes
              </label>
              <textarea
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                placeholder="Enter resolution notes..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm h-20 resize-none"
              />
            </div>

            {actionModal.action === 'resolve' && actionModal.report.reportedUser && (
              <label className="flex items-center gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={banUser}
                  onChange={(e) => setBanUser(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Ban reported user</span>
              </label>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActionModal(null);
                  setResolution('');
                  setBanUser(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(actionModal.report.id, actionModal.action, resolution, banUser)}
                disabled={actionLoading === actionModal.report.id}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                  actionModal.action === 'resolve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {actionLoading === actionModal.report.id ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
