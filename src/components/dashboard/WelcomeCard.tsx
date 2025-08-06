// src/components/dashboard/WelcomeCard.tsx

import React from 'react';
import { Container, Card, CardContent, CardHeader, CardTitle, Div, P } from '@/lib/dev-container';

interface WelcomeCardProps {
  userName: string | undefined;
  daysSinceMember: number;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName, daysSinceMember }) => {
  return (
    <Container componentId="welcome-card">
      <Card devId="welcome-card">
        <CardHeader devId="welcome-card-header">
          <CardTitle devId="welcome-card-title">Welcome back, {userName?.split(' ')[0] || 'User'}!</CardTitle>
        </CardHeader>
        <CardContent devId="welcome-card-content">
          <P devId="welcome-message" className="text-muted-foreground mb-4">
            You're successfully logged in to your account. This is your personal dashboard 
            where you can manage your profile and account settings.
          </P>
          <Div devId="welcome-stats" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card devId="days-member-card">
              <CardContent devId="days-member-content" className="pt-6">
                <Div devId="days-member-wrapper" className="text-center">
                  <Div devId="days-member-value" className="text-2xl font-bold text-primary">
                    {daysSinceMember}
                  </Div>
                  <P devId="days-member-label" className="text-sm text-muted-foreground">Days as member</P>
                </Div>
              </CardContent>
            </Card>
            <Card devId="session-status-card">
              <CardContent devId="session-status-content" className="pt-6">
                <Div devId="session-status-wrapper" className="text-center">
                  <Div devId="session-status-value" className="text-2xl font-bold text-primary">
                    Active
                  </Div>
                  <P devId="session-status-label" className="text-sm text-muted-foreground">Session status</P>
                </Div>
              </CardContent>
            </Card>
          </Div>
        </CardContent>
      </Card>
    </Container>
  );
};