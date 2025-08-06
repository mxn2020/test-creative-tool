import { useState } from 'react';
import { Container } from '../lib/dev-container';
import { useSessions } from '../hooks/useSessionQueries';
import { SessionsLoadingState } from '../components/sessions/SessionsLoadingState';
import { SessionsHeader } from '../components/sessions/SessionsHeader';
import { SessionsErrorAlert } from '../components/sessions/SessionsErrorAlert';
import { SessionSecurityStatus } from '../components/sessions/SessionSecurityStatus';
import { RevokeAllConfirmDialog } from '../components/sessions/RevokeAllConfirmDialog';
import { CurrentSessionSection } from '../components/sessions/CurrentSessionSection';
import { OtherSessionsSection } from '../components/sessions/OtherSessionsSection';
import { NoSessionsEmptyState } from '../components/sessions/NoSessionsEmptyState';

export function SessionsPage() {
  const [showRevokeAllConfirm, setShowRevokeAllConfirm] = useState(false);
  const {
    activeSessions,
    currentSession,
    isLoading,
    error,
    revokeSession,
    isRevokingSession,
    revokingSessionId,
    revokeAllOtherSessions,
    isRevokingAll,
  } = useSessions();

  const handleRevokeSession = (sessionId: string) => {
    revokeSession(sessionId);
  };

  const handleRevokeAllOthers = () => {
    revokeAllOtherSessions(undefined, {
      onSuccess: () => {
        setShowRevokeAllConfirm(false);
      },
    });
  };

  if (isLoading) {
    return <SessionsLoadingState />;
  }

  return (
    <Container componentId="sessions-page" className="space-y-6 max-w-4xl mx-auto p-6">
      <SessionsHeader />
      
      {error && <SessionsErrorAlert error={error} />}

      <SessionSecurityStatus
        activeSessionsCount={activeSessions.length}
        onRevokeAll={() => setShowRevokeAllConfirm(true)}
        isRevokingAll={isRevokingAll}
      />

      {showRevokeAllConfirm && (
        <RevokeAllConfirmDialog
          onCancel={() => setShowRevokeAllConfirm(false)}
          onConfirm={handleRevokeAllOthers}
          isRevoking={isRevokingAll}
        />
      )}

      <CurrentSessionSection currentSession={currentSession} />

      <OtherSessionsSection
        sessions={activeSessions}
        onRevoke={handleRevokeSession}
        isRevoking={isRevokingSession}
        revokingSessionId={revokingSessionId}
      />

      <NoSessionsEmptyState 
        hasOtherSessions={activeSessions.filter(s => !s.current).length > 0} 
      />
    </Container>
  );
}