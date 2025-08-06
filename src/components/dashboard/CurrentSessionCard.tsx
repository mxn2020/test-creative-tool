// src/components/dashboard/CurrentSessionCard.tsx

import React from 'react';
import { Container, Card, CardContent, CardHeader, CardTitle, Div, Span, Separator } from '@/lib/dev-container';
import { Monitor, Globe, Clock } from 'lucide-react';
import type { Session } from '@/lib/api/sessions';

interface CurrentSessionCardProps {
  currentSession: Session | null;
  getTimeRemaining: (expiresAt: string) => string;
}

export const CurrentSessionCard: React.FC<CurrentSessionCardProps> = ({ currentSession, getTimeRemaining }) => {
  if (!currentSession) return null;

  return (
    <Container componentId="current-session-card">
      <Card devId="current-session-card">
        <CardHeader devId="current-session-header">
          <CardTitle devId="current-session-title" className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Current Session
          </CardTitle>
        </CardHeader>
        <CardContent devId="current-session-content">
          <Div devId="session-details" className="space-y-3">
            <Div devId="device-info" className="flex justify-between items-center">
              <Span devId="device-label" className="text-sm text-muted-foreground">Device</Span>
              <Span devId="device-value" className="text-sm font-medium">
                {currentSession.device} - {currentSession.browser}
              </Span>
            </Div>
            <Div devId="ip-info" className="flex justify-between items-center">
              <Span devId="ip-label" className="text-sm text-muted-foreground">IP Address</Span>
              <Span devId="ip-value" className="text-sm font-medium flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {currentSession.ipAddress}
              </Span>
            </Div>
            <Div devId="expiry-info" className="flex justify-between items-center">
              <Span devId="expiry-label" className="text-sm text-muted-foreground">Session expires in</Span>
              <Span devId="expiry-value" className="text-sm font-medium flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getTimeRemaining(currentSession.expiresAt)}
              </Span>
            </Div>
            <Separator devId="session-separator" />
            <Div devId="signin-time" className="text-xs text-muted-foreground">
              Signed in {new Date(currentSession.createdAt).toLocaleString()}
            </Div>
          </Div>
        </CardContent>
      </Card>
    </Container>
  );
};