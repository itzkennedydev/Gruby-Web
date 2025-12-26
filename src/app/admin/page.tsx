import Link from 'next/link';
import { getApplicationStats } from '@/lib/creator-applications';
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  ArrowRight,
  TrendingUp,
  Activity,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await getApplicationStats();

  const statCards = [
    {
      label: 'Pending Review',
      value: stats.pending,
      description: 'Awaiting review',
      icon: Clock,
      highlight: stats.pending > 0,
    },
    {
      label: 'Approved',
      value: stats.approved,
      description: 'Active creators',
      icon: CheckCircle,
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      description: 'Not approved',
      icon: XCircle,
    },
    {
      label: 'Total',
      value: stats.total,
      description: 'All applications',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">
          Overview of creator applications and platform activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-white border rounded-xl p-5 transition-colors ${
                stat.highlight
                  ? 'border-gray-900 ring-1 ring-gray-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  stat.highlight ? 'bg-gray-900' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-4 h-4 ${stat.highlight ? 'text-white' : 'text-gray-600'}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/creator-applications?status=pending"
            className="group flex items-center justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-900 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                <ClipboardList className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Review Applications</h4>
                <p className="text-sm text-gray-500">
                  {stats.pending > 0
                    ? `${stats.pending} pending application${stats.pending > 1 ? 's' : ''}`
                    : 'All caught up!'}
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/creator-applications"
            className="group flex items-center justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-900 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                <Users className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">All Applications</h4>
                <p className="text-sm text-gray-500">
                  View and manage all {stats.total} applications
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Activity Overview */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Platform Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Approval Rate</h4>
                <p className="text-sm text-gray-500">Creator applications</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
              </span>
              <span className="text-sm text-gray-400 mb-1">
                ({stats.approved} of {stats.total})
              </span>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full transition-all"
                style={{
                  width: `${stats.total > 0 ? (stats.approved / stats.total) * 100 : 0}%`
                }}
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Application Status</h4>
                <p className="text-sm text-gray-500">Breakdown by status</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-gray-900">{stats.pending}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Approved</span>
                <span className="text-sm font-medium text-gray-900">{stats.approved}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rejected</span>
                <span className="text-sm font-medium text-gray-900">{stats.rejected}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
