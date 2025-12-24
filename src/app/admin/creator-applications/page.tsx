import { Suspense } from 'react';
import { getCreatorApplications } from '@/lib/creator-applications';
import type { CreatorApplicationStatus } from '@/types/creator-application';
import { ApplicationsList } from './applications-list';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Creator Applications</h1>
          <p className="text-gray-500 mt-1">
            Review and manage creator applications
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                status === tab.value
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Applications List */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        }
      >
        {applications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ClipboardList className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No applications found
              </h3>
              <p className="text-gray-500">
                {status === 'pending'
                  ? 'All pending applications have been reviewed!'
                  : `No ${status || ''} applications to display.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          <ApplicationsList applications={applications} />
        )}
      </Suspense>
    </div>
  );
}
