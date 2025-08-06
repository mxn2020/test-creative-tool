// Type declarations for resend package
declare module 'resend' {
  export interface EmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    replyTo?: string;
    bcc?: string | string[];
    cc?: string | string[];
    attachments?: Array<{
      filename: string;
      content: string | Buffer;
    }>;
  }

  export interface SendEmailResponse {
    id: string;
  }

  export class Resend {
    constructor(apiKey: string);
    
    emails: {
      send(options: EmailOptions): Promise<SendEmailResponse>;
    };
  }
}