'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="w-3 h-3 mr-1" /> Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="w-3 h-3 mr-1" /> Rejected
          </Badge>
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
          <Card key={app.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={app.userPhotoURL} />
                    <AvatarFallback className="bg-orange-100 text-orange-600">
                      {getInitials(app.userDisplayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {app.userDisplayName}
                    </h3>
                    <p className="text-sm text-gray-500">{app.userEmail}</p>
                  </div>
                </div>
                {getStatusBadge(app.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
                      <Badge key={specialty} variant="secondary">
                        {CUISINE_SPECIALTY_LABELS[specialty]}
                      </Badge>
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
                  <div className="flex flex-wrap gap-2">
                    {app.socialLinks
                      .filter((link) => link.trim())
                      .map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {new URL(link).hostname}
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="text-xs text-gray-400 pt-2 border-t">
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
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <p className="text-sm font-medium text-red-700 mb-1">
                    Rejection Reason:
                  </p>
                  <p className="text-sm text-red-600">{app.rejectionReason}</p>
                </div>
              )}

              {/* Action Buttons (only for pending) */}
              {app.status === 'pending' && (
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => openRejectModal(app)}
                    disabled={processingId === app.id}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => onApprove(app)}
                    disabled={processingId === app.id}
                  >
                    {processingId === app.id ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Approve
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
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
              variant="destructive"
              onClick={onReject}
              disabled={!rejectionReason.trim() || processingId !== null}
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
