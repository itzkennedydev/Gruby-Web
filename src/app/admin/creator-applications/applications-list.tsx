'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Check,
  X,
  Clock,
  ExternalLink,
  ChefHat,
  Loader2,
} from 'lucide-react';
import { handleApprove, handleReject } from './actions';
import type { CreatorApplication } from '@/types/creator-application';
import {
  EXPERIENCE_LEVEL_LABELS,
  CUISINE_SPECIALTY_LABELS,
} from '@/types/creator-application';

interface ApplicationsListProps {
  applications: CreatorApplication[];
}

export function ApplicationsList({ applications }: ApplicationsListProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<CreatorApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const onApprove = async (app: CreatorApplication) => {
    setProcessingId(app.id);
    try {
      const result = await handleApprove(app.id);
      if (!result.success) {
        alert(`Error: ${result.error}`);
      }
    } finally {
      setProcessingId(null);
    }
  };

  const openRejectModal = (app: CreatorApplication) => {
    setSelectedApp(app);
    setRejectionReason('');
    setRejectModalOpen(true);
  };

  const onReject = async () => {
    if (!selectedApp || !rejectionReason.trim()) return;

    setProcessingId(selectedApp.id);
    try {
      const result = await handleReject(selectedApp.id, rejectionReason);
      if (result.success) {
        setRejectModalOpen(false);
        setSelectedApp(null);
        setRejectionReason('');
      } else {
        alert(`Error: ${result.error}`);
      }
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900 text-white">
            <Check className="w-3 h-3" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
            <X className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {app.userPhotoURL ? (
                  <img
                    src={app.userPhotoURL}
                    alt={app.userDisplayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">
                      {getInitials(app.userDisplayName)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900">
                    {app.userDisplayName}
                  </h3>
                  <p className="text-sm text-gray-500">{app.userEmail}</p>
                </div>
              </div>
              {getStatusBadge(app.status)}
            </div>

            {/* Content */}
            <div className="space-y-4">
              {/* Experience */}
              <div className="flex items-center gap-2 text-sm">
                <ChefHat className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {EXPERIENCE_LEVEL_LABELS[app.experience]}
                </span>
              </div>

              {/* Reason */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Why they want to be a creator:
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {app.reason}
                </p>
              </div>

              {/* Specialties */}
              {app.specialties.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Specialties:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {app.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {CUISINE_SPECIALTY_LABELS[specialty]}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {app.socialLinks && app.socialLinks.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Social Links:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {app.socialLinks
                      .filter((link) => link.trim())
                      .map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {new URL(link).hostname}
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="text-xs text-gray-400 pt-3 border-t border-gray-100">
                Applied: {new Date(app.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {app.reviewedAt && (
                  <>
                    {' • '}
                    Reviewed: {new Date(app.reviewedAt).toLocaleDateString()}
                    {app.reviewerName && ` by ${app.reviewerName}`}
                  </>
                )}
              </div>

              {/* Rejection Reason (if rejected) */}
              {app.status === 'rejected' && app.rejectionReason && (
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Rejection Reason:
                  </p>
                  <p className="text-sm text-gray-600">{app.rejectionReason}</p>
                </div>
              )}

              {/* Action Buttons (only for pending) */}
              {app.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => openRejectModal(app)}
                    disabled={processingId === app.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => onApprove(app)}
                    disabled={processingId === app.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {processingId === app.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rejection Modal */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedApp?.userDisplayName}&apos;s
              application. This will be shown to the user.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectModalOpen(false)}
              disabled={processingId !== null}
            >
              Cancel
            </Button>
            <Button
              onClick={onReject}
              disabled={!rejectionReason.trim() || processingId !== null}
              className="bg-gray-900 hover:bg-gray-800"
            >
              {processingId !== null ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <X className="w-4 h-4 mr-2" />
              )}
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
