// src/components/dashboard/RecentActivityCard.tsx

import React from 'react';
import { Container, Card, CardContent, CardHeader, CardTitle, Div, Span } from '@/lib/dev-container';

export const RecentActivityCard: React.FC = () => {
  return (
    <Container componentId="recent-activity-card">
      <Card devId="recent-activity-card">
        <CardHeader devId="recent-activity-header">
          <CardTitle devId="recent-activity-title">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent devId="recent-activity-content">
          <Div devId="activity-list" className="space-y-3">
            <Div devId="activity-login" className="flex items-center justify-between py-2">
              <Div devId="activity-login-info" className="flex items-center gap-3">
                <Div devId="activity-login-indicator" className="w-2 h-2 bg-green-500 rounded-full"></Div>
                <Span devId="activity-login-text" className="text-sm">Successfully logged in</Span>
              </Div>
              <Span devId="activity-login-time" className="text-sm text-muted-foreground">
                {new Date().toLocaleTimeString()}
              </Span>
            </Div>
            <Div devId="activity-profile" className="flex items-center justify-between py-2">
              <Div devId="activity-profile-info" className="flex items-center gap-3">
                <Div devId="activity-profile-indicator" className="w-2 h-2 bg-blue-500 rounded-full"></Div>
                <Span devId="activity-profile-text" className="text-sm">Profile accessed</Span>
              </Div>
              <Span devId="activity-profile-time" className="text-sm text-muted-foreground">
                {new Date().toLocaleTimeString()}
              </Span>
            </Div>
          </Div>
        </CardContent>
      </Card>
    </Container>
  );
};