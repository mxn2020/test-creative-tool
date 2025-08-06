import { Resend } from 'resend';

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey && process.env.NODE_ENV === 'production') {
  throw new Error('RESEND_API_KEY is required in production');
}

// Create Resend instance with fallback for development
export const resend = resendApiKey 
  ? new Resend(resendApiKey)
  : null;

// Email sending wrapper with error handling
export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = 'noreply@geenius-template.com',
}: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}) {
  if (!resend) {
    console.warn('Email sending skipped: Resend not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });

    return { success: true, data: result };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message };
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to Geenius Template',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome ${name}!</h1>
        <p>Thank you for joining Geenius Template. We're excited to have you on board.</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Geenius Team</p>
      </div>
    `,
    text: `Welcome ${name}! Thank you for joining Geenius Template. We're excited to have you on board.`,
  }),

  passwordReset: (name: string, resetUrl: string) => ({
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Reset Your Password</h1>
        <p>Hi ${name},</p>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <p>Best regards,<br>The Geenius Team</p>
      </div>
    `,
    text: `Hi ${name}, You requested to reset your password. Visit this link to create a new password: ${resetUrl}. This link will expire in 1 hour.`,
  }),

  emailVerification: (name: string, verifyUrl: string) => ({
    subject: 'Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Verify Your Email</h1>
        <p>Hi ${name},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyUrl}" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
        </div>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>Best regards,<br>The Geenius Team</p>
      </div>
    `,
    text: `Hi ${name}, Please verify your email address by visiting: ${verifyUrl}`,
  }),

  loginNotification: (name: string, details: { ip?: string; device?: string; time: string }) => ({
    subject: 'New Login to Your Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">New Login Detected</h1>
        <p>Hi ${name},</p>
        <p>We detected a new login to your account:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Time:</strong> ${details.time}</li>
          ${details.ip ? `<li><strong>IP Address:</strong> ${details.ip}</li>` : ''}
          ${details.device ? `<li><strong>Device:</strong> ${details.device}</li>` : ''}
        </ul>
        <p>If this wasn't you, please reset your password immediately.</p>
        <p>Best regards,<br>The Geenius Team</p>
      </div>
    `,
    text: `Hi ${name}, We detected a new login to your account at ${details.time}. If this wasn't you, please reset your password immediately.`,
  }),
};