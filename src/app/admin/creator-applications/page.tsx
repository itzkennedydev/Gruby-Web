import { Suspense } from 'react';
import { getCreatorApplications } from '@/lib/creator-applications';
import type { CreatorApplicationStatus } from '@/types/creator-application';
import { ApplicationsList } from './applications-list';
import { ClipboardList, Loader2 } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ status?: CreatorApplicationStatus }>;
}

export default async function CreatorApplicationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status;
  const applications = await getCreatorApplications(status);

  const tabs = [
    { label: 'All', value: undefined, href: '/admin/creator-applications' },
    { label: 'Pending', value: 'pending', href: '/admin/creator-applications?status=pending' },
    { label: 'Approved', value: 'approved', href: '/admin/creator-applications?status=approved' },
    { label: 'Rejected', value: 'rejected', href: '/admin/creator-applications?status=rejected' },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Creator Applications</h2>
        <p className="text-gray-500 mt-1">
          Review and manage creator applications
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => {
          const isActive = status === tab.value;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Applications List */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        }
      >
        {applications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No applications found
            </h3>
            <p className="text-gray-500">
              {status === 'pending'
                ? 'All pending applications have been reviewed!'
                : `No ${status || ''} applications to display.`}
            </p>
          </div>
        ) : (
          <ApplicationsList applications={applications} />
        )}
      </Suspense>
    </div>
  );
}
