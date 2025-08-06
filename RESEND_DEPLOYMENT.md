# Resend Email Service Deployment Guide

This guide covers setting up Resend for email functionality in production.

## Setting Up Resend

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for an account
3. Verify your email address

### 2. Get Your API Key

1. Navigate to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Production", "Staging")
4. Copy the API key (starts with `re_`)
5. Store it securely - you won't be able to see it again!

### 3. Verify Your Domain

For production use, you need to verify your sending domain:

1. Go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records provided by Resend to your domain:
   - SPF record
   - DKIM records
   - Optional: DMARC record
5. Click "Verify DNS Records"
6. Wait for verification (usually takes a few minutes)

### 4. Configure Your Application

Add the API key to your environment variables:

```env
RESEND_API_KEY=re_your_api_key_here
```

## Email Templates

The application uses the following email templates:

### Password Reset Email
- Triggered when user requests password reset
- Contains a secure link with reset token
- Link expires after 1 hour

### Welcome Email (Optional)
- Sent when new user registers
- Can be enabled/disabled in auth configuration

### Email Verification (Optional)
- Sent when email verification is required
- Contains verification link

## Testing Emails

### Development Testing

In development, you can use Resend's test mode:
1. Use the test API key (starts with `re_test_`)
2. Emails won't actually be sent but will show in Resend dashboard

### Production Testing

1. Send a test email to yourself first
2. Check spam folder if not received
3. Verify "From" address matches your verified domain

## Monitoring & Analytics

### Resend Dashboard

Monitor your email performance:
1. Go to [Resend Dashboard](https://resend.com/emails)
2. View sent emails, bounces, and errors
3. Check email delivery status

### Email Logs

The application logs email events:
- Successful sends
- Failed attempts
- Bounce notifications

Check application logs for email-related issues.

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Ensure `RESEND_API_KEY` is set correctly
2. **Verify Domain**: Domain must be verified for production
3. **Check Logs**: Look for error messages in application logs
4. **Rate Limits**: Free tier has limits (100 emails/day)

### Emails Going to Spam

1. **Verify Domain**: Always use a verified domain
2. **SPF/DKIM**: Ensure DNS records are properly configured
3. **Content**: Avoid spam trigger words
4. **From Address**: Use an address from your verified domain

### Common Errors

- `401 Unauthorized`: Invalid API key
- `403 Forbidden`: Domain not verified
- `429 Too Many Requests`: Rate limit exceeded
- `500 Server Error`: Resend service issue

## Production Checklist

- [ ] Resend account created and verified
- [ ] Production API key generated
- [ ] Domain verified with proper DNS records
- [ ] Environment variable `RESEND_API_KEY` set
- [ ] Test email sent successfully
- [ ] Email templates reviewed and tested
- [ ] Monitoring set up for failed emails
- [ ] Backup email service considered (optional)

## Cost Considerations

### Free Tier
- 100 emails/day
- 3,000 emails/month
- Single domain

### Paid Plans
- Higher sending limits
- Multiple domains
- Priority support
- Advanced analytics

Choose a plan based on your expected email volume.

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for API keys
3. **Rotate API keys** periodically
4. **Monitor for unusual activity** in Resend dashboard
5. **Implement rate limiting** in your application
6. **Validate email addresses** before sending

## Support Resources

- [Resend Documentation](https://resend.com/docs)
- [API Reference](https://resend.com/docs/api-reference)
- [Status Page](https://status.resend.com)
- [Support](https://resend.com/support)