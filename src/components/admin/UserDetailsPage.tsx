import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUser, useUserDetails, useUpdateUser, useDeleteUser } from '../../hooks/useUserQueries';
import { Container, Button, Card, Badge, Alert, Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/dev-container';
import { ArrowLeft, Mail, Shield, Trash2, AlertCircle } from 'lucide-react';

export function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // React Query hooks
  const { data: user, isLoading, error, isError } = useUser(userId);
  const { data: userDetails, isLoading: detailsLoading } = useUserDetails(userId);
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // Debug logging
  console.log('UserDetailsPage Debug:', {
    userId,
    user,
    userDetails,
    isLoading,
    detailsLoading,
    error,
    isError
  });

  const handleRoleChange = async (newRole: 'user' | 'admin') => {
    if (!user) return;
    
    console.log('Changing role to:', newRole);
    updateUserMutation.mutate(
      { userId: user.id, data: { role: newRole } },
      {
        onSuccess: (data) => {
          console.log('Role change success:', data);
        },
        onError: (error) => {
          console.error('Error updating user role:', error);
        },
      }
    );
  };

  const handleDelete = async () => {
    if (!user) return;
    
    deleteUserMutation.mutate(user.id, {
      onSuccess: () => {
        navigate('/admin/users');
      },
      onError: (error) => {
        console.error('Error deleting user:', error);
        setShowDeleteConfirm(false);
      },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Container componentId="user-details-loading" className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </Container>
    );
  }

  if (error && !user) {
    return (
      <Container componentId="user-details-error" className="p-8">
        <Card devId="error-card" className="bg-red-50 border-red-200 p-6">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <p>{error instanceof Error ? error.message : 'Failed to load user details'}</p>
          </div>
          <Button
            devId="back-button"
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/admin/users')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Card>
      </Container>
    );
  }

  if (!user) return null;

  // Get error states from mutations
  const mutationError = updateUserMutation.error || deleteUserMutation.error;

  return (
    <Container componentId="user-details-page" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/users">
            <Button devId="back-link" variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
            <p className="text-gray-600 mt-1">View and manage user information</p>
          </div>
        </div>
        <Button
          devId="delete-button"
          variant="destructive"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={deleteUserMutation.isPending}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete User
        </Button>
      </div>

      {/* Error Alert */}
      {mutationError && (
        <Alert devId="error-alert" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span className="ml-2">
            {mutationError instanceof Error ? mutationError.message : 'An error occurred'}
          </span>
        </Alert>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Alert devId="delete-confirm-alert" variant="destructive">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Are you sure you want to delete this user?</p>
              <p className="text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-2">
              <Button
                devId="cancel-delete"
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteUserMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                devId="confirm-delete"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleteUserMutation.isPending}
              >
                {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </Alert>
      )}

      {/* User Info Card */}
      <Card devId="user-info-card" className="p-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-600">
              {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user.name || user.email}</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-1" />
                <span>{user.email}</span>
              </div>
              <Badge devId="role-badge" variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                {user.role || 'user'}
              </Badge>
              {user.emailVerified && (
                <Badge devId="verified-badge" variant="outline" className="text-green-700 border-green-300">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs devId="user-tabs" defaultValue="details" className="w-full">
        <TabsList devId="tabs-list">
          <TabsTrigger devId="details-tab" value="details">Details</TabsTrigger>
          <TabsTrigger devId="activity-tab" value="activity">Activity</TabsTrigger>
          <TabsTrigger devId="sessions-tab" value="sessions">Sessions</TabsTrigger>
          <TabsTrigger devId="permissions-tab" value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent devId="details-content" value="details">
          <Card devId="details-card" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">User ID</label>
                <p className="mt-1 text-sm font-mono bg-gray-50 p-2 rounded">{user.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="mt-1 text-sm">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Active</label>
                  <p className="mt-1 text-sm">{formatDate(user.lastActive)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">User Preferences</label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Theme</span>
                    <span className="font-medium">{user.preferences?.theme || 'Light'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Language</span>
                    <span className="font-medium">{user.preferences?.language || 'English'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Email Notifications</span>
                    <span className="font-medium">{user.preferences?.emailNotifications ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent devId="activity-content" value="activity">
          <Card devId="activity-card" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            {detailsLoading ? (
              <p className="text-gray-600">Loading activity...</p>
            ) : userDetails?.recentActivity && userDetails.recentActivity.length > 0 ? (
              <div className="space-y-3">
                {userDetails.recentActivity.map((activity) => {
                  // Format activity details
                  const getActivityDescription = (action: string, details: any) => {
                    // If details is a string, return it as-is
                    if (typeof details === 'string') return details;
                    
                    // Format based on action type
                    switch (action) {
                      case 'login':
                        return details.success ? 'Successfully logged in' : `Login failed: ${details.error || 'Invalid credentials'}`;
                      case 'logout':
                        return `Logged out after ${details.sessionDuration || 'unknown duration'}`;
                      case 'profile_update':
                        return `Updated ${details.fieldsUpdated?.join(', ') || 'profile'}`;
                      case 'password_change':
                        return details.success ? 'Password changed successfully' : 'Password change failed';
                      case 'post_created':
                        return `Created post: ${details.postTitle || details.postId || 'Untitled'}`;
                      case 'post_updated':
                        return `Updated post: ${details.postTitle || details.postId || 'Unknown'}`;
                      case 'post_deleted':
                        return `Deleted post: ${details.postTitle || details.postId || 'Unknown'}`;
                      case 'comment_created':
                        return `Commented on post ${details.postId || 'unknown'}`;
                      case 'comment_deleted':
                        return `Deleted comment ${details.commentId || 'unknown'}`;
                      case 'permission_granted':
                        return `Granted ${details.permission || 'permission'} to ${details.targetUser || 'user'}`;
                      case 'permission_revoked':
                        return `Revoked ${details.permission || 'permission'} from ${details.targetUser || 'user'}`;
                      case 'role_change':
                        return `Role changed from ${details.oldRole || 'unknown'} to ${details.newRole || 'unknown'}`;
                      case 'user_created':
                        return 'Account created';
                      case 'user_updated':
                        return `Updated user: ${details.targetUserId || 'unknown'}`;
                      case 'user_deleted':
                        return `Deleted user: ${details.targetUserId || 'unknown'}`;
                      case 'data_export':
                        return `Exported ${details.dataTypes?.join(', ') || 'user data'}`;
                      case 'api_access':
                        return `API ${details.method || 'request'} to ${details.endpoint || 'unknown endpoint'}`;
                      case 'settings_update':
                        return `Updated ${details.settings?.join(', ') || 'settings'}`;
                      default:
                        return JSON.stringify(details);
                    }
                  };
                  
                  const description = getActivityDescription(activity.action, activity.details);
                  
                  return (
                    <div key={activity.id} className="border-l-2 border-gray-200 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm capitalize">{activity.action.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-gray-600">{description}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">IP: {activity.ip}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600">No recent activity recorded.</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent devId="sessions-content" value="sessions">
          <Card devId="sessions-card" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
            {detailsLoading ? (
              <p className="text-gray-600">Loading sessions...</p>
            ) : userDetails?.sessions && userDetails.sessions.length > 0 ? (
              <div className="space-y-3">
                {userDetails.sessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${session.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="font-medium text-sm">
                            {session.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{session.userAgent}</p>
                        <p className="text-xs text-gray-500">IP: {session.ip}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p>Created: {new Date(session.createdAt).toLocaleString()}</p>
                        <p>Expires: {new Date(session.expiresAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No active sessions found.</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent devId="permissions-content" value="permissions">
          <Card devId="permissions-card" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Role & Permissions</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Current Role</label>
                <div className="mt-2 flex items-center gap-4">
                  <Badge devId="current-role-badge" variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Button
                    devId="change-role-button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoleChange(user.role === 'admin' ? 'user' : 'admin')}
                    disabled={updateUserMutation.isPending}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    {updateUserMutation.isPending ? 'Saving...' : `Change to ${user.role === 'admin' ? 'User' : 'Admin'}`}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Permissions</label>
                <div className="mt-2 space-y-2 text-sm">
                  {user.role === 'admin' ? (
                    <>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> Full system access
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> User management
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> System configuration
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> Audit log access
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> Basic user access
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> Profile management
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>✗</span> Admin features
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
}