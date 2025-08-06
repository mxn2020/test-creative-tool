// src/components/auth/register/RegisterSocialButtons.tsx

import React from 'react';
import { Mail, Github } from 'lucide-react';
import { Button, Container, Div } from '@/lib/dev-container';

interface RegisterSocialButtonsProps {
  onGoogleRegister: () => void;
  onGithubRegister: () => void;
  isLoading: boolean;
  providers: {
    github: boolean;
    google: boolean;
  };
}

export const RegisterSocialButtons: React.FC<RegisterSocialButtonsProps> = ({
  onGoogleRegister,
  onGithubRegister,
  isLoading,
  providers,
}) => {
  return (
    <Container componentId="social-register-buttons">
      <Div devId="social-register-grid" className="grid grid-cols-2 gap-3">
        <Button
          devId="google-register-button"
          variant="outline"
          onClick={onGoogleRegister}
          disabled={isLoading || !providers.google}
          className="w-full"
        >
          <Mail className="h-4 w-4 mr-2" />
          Google
        </Button>
        <Button
          devId="github-register-button"
          variant="outline"
          onClick={onGithubRegister}
          disabled={isLoading || !providers.github}
          className="w-full"
        >
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Button>
      </Div>
    </Container>
  );
};