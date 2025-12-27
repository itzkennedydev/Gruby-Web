'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Search,
  RefreshCw,
  Loader2,
  ChefHat,
  Shield,
  User,
  Mail,
  Calendar,
  Ban,
  CheckCircle,
  MoreVertical,
  Eye,
  UserX,
  UserCheck,
  ChevronDown,
  Trash2,
  KeyRound,
  Copy,
  Check,
} from 'lucide-react';

interface UserProfile {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  role?: string;
  isChef?: boolean;
  isBanned?: boolean;
  banReason?: string;
  createdAt?: string;
  lastActiveAt?: string;
}

interface UsersResponse {
  success: boolean;
  data: {
    users: UserProfile[];
    pagination: {
      limit: number;
      hasMore: boolean;
      nextCursor: string | null;
    };
    counts: {
      total: number;
      chefs: number;
      admins: number;
    };
  };
}

type RoleFilter = 'all' | 'user' | 'chef' | 'admin';

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [counts, setCounts] = useState({ total: 0, chefs: 0, admins: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<UserProfile | null>(null);
  const [resetLinkModal, setResetLinkModal] = useState<{ user: UserProfile; link: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchUsers = useCallback(async (append = false) => {
    if (!append) setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '25' });
      if (roleFilter === 'chef') params.set('isChef', 'true');
      if (roleFilter === 'admin') params.set('role', 'admin');
      if (searchQuery) params.set('search', searchQuery);
      if (append && cursor) params.set('startAfter', cursor);

      const res = await fetch(`/api/admin/users?${params}`);
      const data: UsersResponse = await res.json();

      if (data.success) {
        setUsers(prev => append ? [...prev, ...data.data.users] : data.data.users);
        setCounts(data.data.counts);
        setHasMore(data.data.pagination.hasMore);
        setCursor(data.data.pagination.nextCursor);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, [roleFilter, searchQuery, cursor]);

  useEffect(() => {
    setCursor(null);
    fetchUsers(false);
  }, [roleFilter, searchQuery]);

  const updateUser = async (userId: string, updates: Partial<UserProfile>) => {
    setActionLoading(userId);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, updates }),
      });

      if (res.ok) {
        setUsers(prev =>
          prev.map(u => (u.id === userId ? { ...u, ...updates } : u))
        );
        setSelectedUser(null);
        setShowActionMenu(null);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const toggleChef = (user: UserProfile) => {
    const newIsChef = !user.isChef;
    updateUser(user.id, {
      isChef: newIsChef,
      role: newIsChef ? 'chef' : 'user',
    });
  };

  const toggleBan = (user: UserProfile) => {
    if (user.isBanned) {
      updateUser(user.id, { isBanned: false, banReason: '' });
    } else {
      const reason = prompt('Enter ban reason:');
      if (reason !== null) {
        updateUser(user.id, { isBanned: true, banReason: reason });
      }
    }
  };

  const deleteUser = async (user: UserProfile) => {
    setActionLoading(user.id);
    try {
      const res = await fetch(`/api/admin/users?userId=${user.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== user.id));
        setDeleteConfirm(null);
        setSelectedUser(null);
        setShowActionMenu(null);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const sendPasswordReset = async (user: UserProfile) => {
    if (!user.email) {
      alert('User has no email address');
      return;
    }

    setActionLoading(user.id);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendPasswordReset',
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (res.ok && data.data?.resetLink) {
        setResetLinkModal({ user, link: data.data.resetLink });
        setShowActionMenu(null);
      } else {
        alert('Failed to generate password reset link');
      }
    } catch (error) {
      console.error('Failed to send password reset:', error);
      alert('Failed to send password reset');
    } finally {
      setActionLoading(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRoleBadge = (user: UserProfile) => {
    if (user.role === 'admin') {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-900 text-white flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Admin
        </span>
      );
    }
    if (user.isChef) {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 flex items-center gap-1">
          <ChefHat className="w-3 h-3" />
          Creator
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
        <User className="w-3 h-3" />
        User
      </span>
    );
  };

  if (loading && users.length === 0) {
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
          <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
          <p className="text-gray-500 mt-1">
            {counts.total.toLocaleString()} total users, {counts.chefs} creators, {counts.admins} admins
          </p>
        </div>
        <button
          onClick={() => {
            setCursor(null);
            fetchUsers(false);
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
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'user', 'chef', 'admin'] as RoleFilter[]).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                roleFilter === role
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {role === 'all' ? 'All' : role === 'chef' ? 'Creators' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName || ''}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.displayName || 'No name'}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email || 'No email'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.isBanned ? (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 flex items-center gap-1 w-fit">
                            <Ban className="w-3 h-3" />
                            Banned
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="relative">
                          <button
                            onClick={() => setShowActionMenu(showActionMenu === user.id ? null : user.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>

                          {showActionMenu === user.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                              <button
                                onClick={() => setSelectedUser(user)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                              {user.role !== 'admin' && (
                                <>
                                  <button
                                    onClick={() => toggleChef(user)}
                                    disabled={actionLoading === user.id}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <ChefHat className="w-4 h-4" />
                                    {user.isChef ? 'Remove Creator' : 'Make Creator'}
                                  </button>
                                  <button
                                    onClick={() => toggleBan(user)}
                                    disabled={actionLoading === user.id}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                    style={{ color: user.isBanned ? '#16a34a' : '#dc2626' }}
                                  >
                                    {user.isBanned ? (
                                      <>
                                        <UserCheck className="w-4 h-4" />
                                        Unban User
                                      </>
                                    ) : (
                                      <>
                                        <UserX className="w-4 h-4" />
                                        Ban User
                                      </>
                                    )}
                                  </button>
                                  <div className="border-t border-gray-100 my-1" />
                                  <button
                                    onClick={() => sendPasswordReset(user)}
                                    disabled={actionLoading === user.id || !user.email}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                                  >
                                    <KeyRound className="w-4 h-4" />
                                    Send Password Reset
                                  </button>
                                  <button
                                    onClick={() => {
                                      setDeleteConfirm(user);
                                      setShowActionMenu(null);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete User
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
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
                  onClick={() => fetchUsers(true)}
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

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {selectedUser.photoURL ? (
                  <img
                    src={selectedUser.photoURL}
                    alt={selectedUser.displayName || ''}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedUser.displayName || 'No name'}
                  </h3>
                  {getRoleBadge(selectedUser)}
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{selectedUser.email || 'Not set'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="text-xs font-mono text-gray-600 break-all">{selectedUser.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-gray-900">{formatDate(selectedUser.createdAt)}</p>
              </div>

              {selectedUser.lastActiveAt && (
                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="text-gray-900">{formatDate(selectedUser.lastActiveAt)}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">Status</p>
                {selectedUser.isBanned ? (
                  <div>
                    <span className="text-red-600 font-medium">Banned</span>
                    {selectedUser.banReason && (
                      <p className="text-sm text-gray-500 mt-1">Reason: {selectedUser.banReason}</p>
                    )}
                  </div>
                ) : (
                  <span className="text-green-600 font-medium">Active</span>
                )}
              </div>
            </div>

            {selectedUser.role !== 'admin' && (
              <div className="space-y-3 mt-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleChef(selectedUser)}
                    disabled={actionLoading === selectedUser.id}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {selectedUser.isChef ? 'Remove Creator' : 'Make Creator'}
                  </button>
                  <button
                    onClick={() => toggleBan(selectedUser)}
                    disabled={actionLoading === selectedUser.id}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                      selectedUser.isBanned
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {selectedUser.isBanned ? 'Unban' : 'Ban User'}
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => sendPasswordReset(selectedUser)}
                    disabled={actionLoading === selectedUser.id || !selectedUser.email}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    Password Reset
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(null);
                      setDeleteConfirm(selectedUser);
                    }}
                    className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close action menu */}
      {showActionMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowActionMenu(null)}
        />
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
                <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {deleteConfirm.photoURL ? (
                  <img
                    src={deleteConfirm.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{deleteConfirm.displayName || 'No name'}</p>
                  <p className="text-sm text-gray-500">{deleteConfirm.email || 'No email'}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              This will permanently delete the user account and remove them from Firebase Authentication.
              All their data will be lost.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(deleteConfirm)}
                disabled={actionLoading === deleteConfirm.id}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading === deleteConfirm.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Link Modal */}
      {resetLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Password Reset Link</h3>
                <p className="text-sm text-gray-500">Generated for {resetLinkModal.user.email}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Share this link with the user to reset their password. The link expires after 1 hour.
            </p>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={resetLinkModal.link}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-600 truncate"
              />
              <button
                onClick={() => copyToClipboard(resetLinkModal.link)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  copiedLink
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setResetLinkModal(null)}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
