// src/components/auth/login/LoginSocialButtons.tsx

import React from 'react';
import { Mail, Github } from 'lucide-react';
import { Button, Container, Div } from '@/lib/dev-container';

interface LoginSocialButtonsProps {
  onGoogleLogin: () => void;
  onGithubLogin: () => void;
  isLoading: boolean;
  providers: {
    github: boolean;
    google: boolean;
  };
}

export const LoginSocialButtons: React.FC<LoginSocialButtonsProps> = ({
  onGoogleLogin,
  onGithubLogin,
  isLoading,
  providers,
}) => {
  return (
    <Container componentId="social-login-buttons">
      <Div devId="social-login-grid" className="grid grid-cols-2 gap-3">
        <Button
          devId="google-login-button"
          variant="outline"
          onClick={onGoogleLogin}
          disabled={isLoading || !providers.google}
          className="w-full"
        >
          <Mail className="h-4 w-4 mr-2" />
          Google
        </Button>
        <Button
          devId="github-login-button"
          variant="outline"
          onClick={onGithubLogin}
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