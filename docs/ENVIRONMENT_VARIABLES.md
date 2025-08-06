# Environment Variables Documentation

This document provides detailed information about all environment variables used in the application.

## Overview

Environment variables are used to configure the application for different environments (development, staging, production) without changing code. They contain sensitive information like API keys and should never be committed to version control.

## Environment Files

- `.env.local` - Local development environment (git-ignored)
- `.env.development` - Development environment defaults
- `.env.production` - Production environment (git-ignored)
- `.env.example` - Example file with all variables (committed to repo)

## Required Variables

### Database Configuration

#### `DATABASE_URL`
- **Type**: String
- **Required**: Yes
- **Format**: MongoDB connection string
- **Example**: 
  ```
  mongodb://localhost:27017/geenius-dev
  mongodb+srv://user:pass@cluster.mongodb.net/db-name?retryWrites=true&w=majority
  ```
- **Description**: MongoDB connection string including authentication, host, port, and database name
- **Security**: Contains database credentials - keep secure

### Authentication

#### `BETTER_AUTH_SECRET`
- **Type**: String
- **Required**: Yes
- **Minimum Length**: 32 characters
- **Example**: `your-super-secret-key-that-is-at-least-32-chars`
- **Description**: Secret key used for signing JWT tokens and session encryption
- **Generation**: 
  ```bash
  openssl rand -base64 32
  ```
- **Security**: Critical for security - must be unique per environment

#### `BETTER_AUTH_URL`
- **Type**: String (URL)
- **Required**: Yes
- **Example**: 
  - Development: `http://localhost:5176`
  - Production: `https://yourdomain.com`
- **Description**: Base URL of your application, used for callbacks and redirects
- **Note**: Must match the actual URL where your app is hosted

### Email Service

#### `RESEND_API_KEY`
- **Type**: String
- **Required**: Yes (if using email features)
- **Format**: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Example**: `re_123456789abcdef`
- **Description**: API key from Resend for sending emails
- **How to get**: 
  1. Sign up at [resend.com](https://resend.com)
  2. Go to API Keys section
  3. Create a new API key

#### `EMAIL_FROM`
- **Type**: String (Email)
- **Required**: Yes (if using email features)
- **Example**: `noreply@yourdomain.com`
- **Description**: Default "from" email address for system emails
- **Note**: Domain must be verified in Resend

## Optional Variables

### Frontend Configuration

#### `VITE_API_URL`
- **Type**: String (URL)
- **Required**: No (defaults to current origin)
- **Example**: `https://api.yourdomain.com`
- **Description**: API endpoint URL if different from frontend URL
- **Note**: Exposed to frontend code

### OAuth Providers

#### Google OAuth

##### `GOOGLE_CLIENT_ID`
- **Type**: String
- **Required**: Only if using Google login
- **Example**: `123456789012-abcdefghijklmnop.apps.googleusercontent.com`
- **Description**: OAuth 2.0 client ID from Google Cloud Console

##### `GOOGLE_CLIENT_SECRET`
- **Type**: String
- **Required**: Only if using Google login
- **Example**: `GOCSPX-1234567890abcdefghijk`
- **Description**: OAuth 2.0 client secret from Google Cloud Console
- **Security**: Keep secret, never expose to frontend

#### GitHub OAuth

##### `GITHUB_CLIENT_ID`
- **Type**: String
- **Required**: Only if using GitHub login
- **Example**: `Iv1.1234567890abcdef`
- **Description**: OAuth App client ID from GitHub

##### `GITHUB_CLIENT_SECRET`
- **Type**: String
- **Required**: Only if using GitHub login
- **Example**: `1234567890abcdefghijklmnopqrstuvwxyz1234`
- **Description**: OAuth App client secret from GitHub
- **Security**: Keep secret, never expose to frontend

### Application Settings

#### `NODE_ENV`
- **Type**: String
- **Required**: No (auto-set by most platforms)
- **Values**: `development`, `production`, `test`
- **Default**: `development`
- **Description**: Determines app behavior and optimizations

#### `PORT`
- **Type**: Number
- **Required**: No
- **Default**: `5176`
- **Example**: `3000`
- **Description**: Port for local development server

#### `ADMIN_REGISTRATION_SECRET`
- **Type**: String
- **Required**: No (recommended for production)
- **Example**: `super-secret-admin-key`
- **Description**: Secret key required to register admin users via API
- **Usage**: Prevents unauthorized admin account creation

### Feature Flags

#### `ENABLE_RATE_LIMITING`
- **Type**: Boolean
- **Required**: No
- **Default**: `true`
- **Values**: `true`, `false`
- **Description**: Enable/disable rate limiting on auth endpoints

#### `ENABLE_AUDIT_LOGS`
- **Type**: Boolean
- **Required**: No
- **Default**: `true`
- **Values**: `true`, `false`
- **Description**: Enable/disable audit logging

#### `SESSION_TIMEOUT`
- **Type**: Number (minutes)
- **Required**: No
- **Default**: `1440` (24 hours)
- **Example**: `60` (1 hour)
- **Description**: Session timeout duration in minutes

## Environment-Specific Configuration

### Development Environment

```env
# .env.local
DATABASE_URL=mongodb://localhost:27017/geenius-dev
BETTER_AUTH_SECRET=dev-secret-key-for-local-testing-only
BETTER_AUTH_URL=http://localhost:5176
RESEND_API_KEY=re_test_xxxxxxxxxx
EMAIL_FROM=dev@localhost.com
NODE_ENV=development
```

### Production Environment

```env
# .env.production
DATABASE_URL=mongodb+srv://prod-user:strong-password@cluster.mongodb.net/geenius-prod?retryWrites=true&w=majority
BETTER_AUTH_SECRET=generate-a-secure-random-string-here
BETTER_AUTH_URL=https://app.yourdomain.com
RESEND_API_KEY=re_live_xxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
NODE_ENV=production
ENABLE_RATE_LIMITING=true
ENABLE_AUDIT_LOGS=true
```

## Security Best Practices

1. **Never commit `.env` files** containing real values to version control
2. **Use different values** for each environment (dev, staging, prod)
3. **Rotate secrets regularly**, especially if exposed
4. **Use strong, random values** for secrets and keys
5. **Limit access** to production environment variables
6. **Use secret management tools** in production (e.g., AWS Secrets Manager, Vault)

## Validation

The application validates environment variables on startup. Missing required variables will prevent the application from starting with clear error messages.

### Validation Example

```typescript
// The app checks for required variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

if (!process.env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET.length < 32) {
  throw new Error('BETTER_AUTH_SECRET must be at least 32 characters');
}
```

## Troubleshooting

### Common Issues

1. **"DATABASE_URL is not defined"**
   - Ensure `.env.local` exists
   - Check that variable name is exact (case-sensitive)
   - Restart the development server

2. **"Invalid BETTER_AUTH_SECRET"**
   - Secret must be at least 32 characters
   - Generate new one: `openssl rand -base64 32`

3. **Email not sending**
   - Verify RESEND_API_KEY is correct
   - Check EMAIL_FROM domain is verified
   - Review Resend dashboard for errors

4. **OAuth login not working**
   - Verify CLIENT_ID and CLIENT_SECRET
   - Check redirect URLs in provider console
   - Ensure BETTER_AUTH_URL matches callback URL

### Loading Environment Variables

Variables are loaded in this order (later overrides earlier):
1. System environment
2. `.env` file
3. `.env.local` file
4. `.env.[NODE_ENV]` file
5. `.env.[NODE_ENV].local` file
6. Command line environment variables

## Adding New Variables

When adding new environment variables:

1. **Update `.env.example`** with the new variable and example value
2. **Document it** in this file
3. **Add validation** in the application code
4. **Update deployment docs** if required for production
5. **Notify team members** about the new requirement

## Platform-Specific Notes

### Netlify
- Set variables in Site settings → Environment variables
- Variables are available in both build and functions
- Use Netlify CLI for local development: `netlify dev`

### Vercel
- Set in Project Settings → Environment Variables
- Separate variables for Production, Preview, Development

### Docker
- Use `docker-compose.yml` for development
- Pass via `docker run -e` for production
- Consider using `.env` file with `env_file` directive

## References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Better Auth Configuration](https://better-auth.com/docs/configuration)
- [MongoDB Connection Strings](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [Resend API Documentation](https://resend.com/docs)