// src/components/dashboard/ProfileCard.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Container, Card, CardContent, CardHeader, CardTitle,
  Badge, Avatar, AvatarImage, AvatarFallback,
  Separator, Div, Span, Button, P
} from '@/lib/dev-container';
import { User, Mail, Calendar, Monitor, Activity } from 'lucide-react';

interface ProfileCardProps {
  user: any;
  getUserInitials: (name: string) => string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, getUserInitials }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <Container componentId="user-profile-card">
      <Card devId="profile-card" className="md:col-span-1">
        <CardHeader devId="profile-card-header">
          <CardTitle devId="profile-card-title" className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent devId="profile-card-content" className="space-y-4">
          <Div devId="profile-avatar-section" className="flex items-center space-x-4">
            <Avatar devId="profile-avatar" className="h-16 w-16">
              <AvatarImage devId="profile-avatar-image" src={user.image || undefined} alt={user.name || 'User'} />
              <AvatarFallback devId="profile-avatar-fallback" className="text-lg">
                {getUserInitials(user.name || 'U')}
              </AvatarFallback>
            </Avatar>
            <Div devId="profile-info">
              <P devId="profile-name" className="font-semibold text-lg">{user.name || 'Unknown User'}</P>
              <P devId="profile-email" className="text-sm text-muted-foreground">
                {user.email || 'No email'}
              </P>
              {isAdmin && (
                <Badge devId="admin-badge" variant="default" className="mt-1">
                  Administrator
                </Badge>
              )}
            </Div>
          </Div>
          
          <Separator devId="profile-separator-1" />
          
          <Div devId="profile-details" className="space-y-3">
            <Div devId="email-status" className="flex items-center justify-between">
              <Div devId="email-label" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Span devId="email-text" className="text-sm">Email</Span>
              </Div>
              <Badge devId="email-verification-badge" variant={user.emailVerified ? "default" : "secondary"}>
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </Div>
            
            <Div devId="member-since" className="flex items-center justify-between">
              <Div devId="member-label" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Span devId="member-text" className="text-sm">Member since</Span>
              </Div>
              <Span devId="member-date" className="text-sm text-muted-foreground">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </Span>
            </Div>
          </Div>
          
          <Separator devId="profile-separator-2" />
          
          <Div devId="profile-actions" className="pt-4 space-y-2">
            <Button
              devId="manage-sessions-button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/sessions')}
            >
              <Monitor className="h-4 w-4 mr-2" />
              Manage Sessions
            </Button>
            <Button
              devId="view-activity-button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/audit-logs')}
            >
              <Activity className="h-4 w-4 mr-2" />
              View Activity Log
            </Button>
          </Div>
        </CardContent>
      </Card>
    </Container>
  );
};