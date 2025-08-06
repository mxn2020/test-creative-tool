# Deployment Guide

This guide covers deploying the Geenius Template Vite React MongoDB application to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Email Service Setup](#email-service-setup)
- [Deployment to Netlify](#deployment-to-netlify)
- [Post-Deployment Setup](#post-deployment-setup)
- [Security Checklist](#security-checklist)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

Before deploying, ensure you have:

1. **MongoDB Database**: A production MongoDB instance (MongoDB Atlas recommended)
2. **Resend Account**: For email services (or alternative email provider)
3. **Netlify Account**: For hosting (or alternative hosting provider)
4. **Domain Name**: (Optional) For custom domain

## Environment Configuration

### Required Environment Variables

Create a `.env.production` file with the following variables:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority"

# Authentication
BETTER_AUTH_SECRET="your-secure-random-secret-at-least-32-chars"
BETTER_AUTH_URL="https://your-domain.com"

# Email Service
RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"

# Application
VITE_API_URL="https://your-domain.com"
NODE_ENV="production"

# Optional: Social OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Generating Secure Secrets

Generate a secure auth secret:
```bash
openssl rand -base64 32
```

## Database Setup

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new project

2. **Create a Cluster**
   - Choose your cloud provider and region
   - Select cluster tier (M0 Free tier available)
   - Configure security settings

3. **Database Access**
   - Create database user with read/write permissions
   - Note the username and password

4. **Network Access**
   - Add IP whitelist entries
   - For Netlify: Add `0.0.0.0/0` (allows all IPs)
   - For enhanced security: Use Netlify's static IPs

5. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### Database Initialization

1. **Run Prisma Migrations**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **Create Indexes** (Important for performance)
   ```bash
   npm run db:indexes
   ```

3. **Seed Initial Data** (Optional)
   ```bash
   npm run db:seed
   ```

## Email Service Setup

### Resend Configuration

1. **Create Resend Account**
   - Sign up at [Resend](https://resend.com)
   - Verify your domain

2. **Generate API Key**
   - Go to API Keys section
   - Create a new API key with send permissions
   - Copy the key to `RESEND_API_KEY`

3. **Configure Email Templates**
   - Templates are already included in the codebase
   - Customize as needed in `src/lib/email-templates/`

### Alternative Email Providers

If using SendGrid, Mailgun, or others:
1. Update `src/lib/plugins/email.ts`
2. Modify email sending logic accordingly

## Deployment to Netlify

### Method 1: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the Application**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Method 2: Git Integration

1. **Connect Repository**
   - Log in to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

3. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add all required environment variables

### Method 3: Drag and Drop

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Drag the `dist` folder to Netlify dashboard

### Netlify Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[functions]
  node_bundler = "esbuild"
```

## Post-Deployment Setup

### 1. Create Admin User

Run the admin creation script:
```bash
npm run admin:create -- --email admin@yourdomain.com
```

Or use the admin registration endpoint:
```bash
curl -X POST https://your-domain.com/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourdomain.com",
    "password": "SecureAdminPassword123!",
    "name": "Admin User",
    "adminSecret": "your-admin-registration-secret"
  }'
```

### 2. Configure Custom Domain

1. In Netlify dashboard → Domain settings
2. Add custom domain
3. Configure DNS settings
4. Enable HTTPS (automatic with Netlify)

### 3. Set Up Monitoring

1. **Error Tracking** (Sentry)
   ```bash
   npm install @sentry/react
   ```
   Configure in `src/main.tsx`

2. **Analytics** (Optional)
   - Google Analytics
   - Plausible
   - Umami

3. **Uptime Monitoring**
   - Better Uptime
   - Pingdom
   - UptimeRobot

## Security Checklist

### Pre-Deployment

- [ ] All environment variables are set correctly
- [ ] Database connection uses SSL
- [ ] Strong passwords for all accounts
- [ ] BETTER_AUTH_SECRET is unique and secure
- [ ] Email domain is verified
- [ ] No sensitive data in code repository

### Post-Deployment

- [ ] HTTPS is enabled
- [ ] Security headers are configured
- [ ] Rate limiting is active
- [ ] Admin account created with strong password
- [ ] Database backups configured
- [ ] Monitoring alerts set up

### Ongoing Security

- [ ] Regular dependency updates
- [ ] Security audit logs reviewed
- [ ] Database backups tested
- [ ] SSL certificates auto-renew
- [ ] Access logs monitored

## Monitoring & Maintenance

### Application Monitoring

1. **Performance Monitoring**
   - Monitor response times
   - Track error rates
   - Watch database query performance

2. **User Activity**
   - Review audit logs regularly
   - Monitor failed login attempts
   - Track user registrations

3. **System Health**
   - Database connection stability
   - Email delivery success rate
   - Function execution times

### Maintenance Tasks

#### Daily
- Check error logs
- Monitor active sessions
- Review security alerts

#### Weekly
- Review audit logs
- Check database performance
- Update dependencies (security patches)

#### Monthly
- Full security audit
- Performance optimization review
- Backup restoration test
- Review and rotate API keys

### Troubleshooting

#### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify network access settings
   - Ensure database is running

2. **Email Not Sending**
   - Verify RESEND_API_KEY
   - Check email domain verification
   - Review email logs in Resend dashboard

3. **Authentication Issues**
   - Verify BETTER_AUTH_SECRET matches
   - Check BETTER_AUTH_URL is correct
   - Clear browser cookies/cache

4. **Performance Issues**
   - Check database indexes
   - Review function cold starts
   - Optimize database queries
   - Consider caching strategies

### Scaling Considerations

As your application grows:

1. **Database Scaling**
   - Upgrade MongoDB cluster tier
   - Implement read replicas
   - Consider sharding for large datasets

2. **Function Optimization**
   - Minimize cold starts
   - Optimize bundle size
   - Consider edge functions

3. **Caching Strategy**
   - Implement Redis for session storage
   - Cache frequently accessed data
   - Use CDN for static assets

## Backup and Recovery

### Database Backups

1. **MongoDB Atlas Backups**
   - Enable automated backups
   - Configure retention period
   - Test restore process

2. **Manual Backups**
   ```bash
   mongodump --uri="your-connection-string" --out=backup/
   ```

3. **Restore Process**
   ```bash
   mongorestore --uri="your-connection-string" backup/
   ```

### Application Backups

1. **Code Repository**
   - Use Git tags for releases
   - Maintain multiple deployment branches
   - Document deployment versions

2. **Environment Configuration**
   - Backup .env files securely
   - Document all configuration changes
   - Use secret management tools

## Support and Resources

- [Netlify Documentation](https://docs.netlify.com)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Better Auth Documentation](https://better-auth.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

For template-specific issues:
- Check the [GitHub Issues](https://github.com/your-repo/issues)
- Review the [CLAUDE.md](./CLAUDE.md) file
- Consult the [README.md](./README.md)