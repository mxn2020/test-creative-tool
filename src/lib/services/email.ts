import { sendEmail, emailTemplates } from '../plugins/resend';

export interface EmailService {
  sendWelcomeEmail: (to: string, name: string) => Promise<EmailResult>;
  sendPasswordResetEmail: (to: string, name: string, resetToken: string) => Promise<EmailResult>;
  sendEmailVerification: (to: string, name: string, verifyToken: string) => Promise<EmailResult>;
  sendLoginNotification: (to: string, name: string, details: LoginDetails) => Promise<EmailResult>;
}

export interface EmailResult {
  success: boolean;
  error?: string;
  data?: any;
}

export interface LoginDetails {
  ip?: string;
  device?: string;
  time: string;
}

class EmailServiceImpl implements EmailService {
  private baseUrl: string;

  constructor() {
    // Get base URL from environment or use default
    this.baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:8889';
  }

  async sendWelcomeEmail(to: string, name: string): Promise<EmailResult> {
    const template = emailTemplates.welcome(name);
    return await sendEmail({
      to,
      ...template,
    });
  }

  async sendPasswordResetEmail(to: string, name: string, resetToken: string): Promise<EmailResult> {
    const resetUrl = `${this.baseUrl}/reset-password?token=${resetToken}`;
    const template = emailTemplates.passwordReset(name, resetUrl);
    return await sendEmail({
      to,
      ...template,
    });
  }

  async sendEmailVerification(to: string, name: string, verifyToken: string): Promise<EmailResult> {
    const verifyUrl = `${this.baseUrl}/verify-email?token=${verifyToken}`;
    const template = emailTemplates.emailVerification(name, verifyUrl);
    return await sendEmail({
      to,
      ...template,
    });
  }

  async sendLoginNotification(to: string, name: string, details: LoginDetails): Promise<EmailResult> {
    const template = emailTemplates.loginNotification(name, details);
    return await sendEmail({
      to,
      ...template,
    });
  }
}

// Export singleton instance
export const emailService = new EmailServiceImpl();

// Export for testing or custom implementations
export { EmailServiceImpl };