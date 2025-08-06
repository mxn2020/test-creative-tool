# Environment Variables

This document describes all environment variables required for the application.

## Required Variables

### Database
- `DATABASE_URL` or `MONGODB_URI` - MongoDB connection string (e.g., `mongodb://localhost:27017/your-database`)
  - Used for: Prisma ORM and Better Auth database connection
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### Authentication
- `BETTER_AUTH_SECRET` - Secret key for Better Auth session signing (minimum 32 characters)
  - Used for: Encrypting session tokens and ensuring security
  - Example: `your-super-secret-key-that-is-at-least-32-chars-long`

- `BETTER_AUTH_URL` - Base URL for Better Auth (should match your app URL)
  - Used for: OAuth callbacks and email links
  - Example: `http://localhost:8889` (development) or `https://yourdomain.com` (production)

### Email Service
- `RESEND_API_KEY` - API key from Resend for sending emails
  - Used for: Password reset emails, verification emails
  - Get one at: https://resend.com/api-keys
  - Example: `re_xxxxxxxxxxxx`

### Application URLs
- `VITE_API_URL` - API endpoint URL for frontend
  - Used for: Making API calls from the React app
  - Example: `http://localhost:8889/api` (development)

- `VITE_APP_URL` - Application base URL
  - Used for: Generating links in the app
  - Example: `http://localhost:8889` (development)

## Optional Variables

- `VITE_APP_VERSION` - Application version (defaults to package.json version)
- `VITE_GEENIUS_API_URL` - Geenius API URL if using external services
- `VITE_REPOSITORY_URL` - GitHub repository URL for the app
- `VITE_BASE_BRANCH` - Base branch for GitHub links (defaults to 'main')

## Development Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required values:
   ```env
   # Database
   DATABASE_URL=mongodb://localhost:27017/geenius-template
   
   # Auth
   BETTER_AUTH_SECRET=your-32-character-minimum-secret-key-here
   BETTER_AUTH_URL=http://localhost:8889
   
   # Email
   RESEND_API_KEY=re_your_api_key_here
   
   # URLs
   VITE_API_URL=http://localhost:8889/api
   VITE_APP_URL=http://localhost:8889
   ```

## Production Deployment

For production, ensure you:
1. Use strong, unique values for `BETTER_AUTH_SECRET`
2. Set proper HTTPS URLs for `BETTER_AUTH_URL` and `VITE_APP_URL`
3. Use a production MongoDB instance with proper security
4. Keep `RESEND_API_KEY` secure and don't commit it to version control

## Netlify Deployment

When deploying to Netlify, add these environment variables in the Netlify UI:
1. Go to Site Settings > Environment Variables
2. Add each required variable
3. Deploy or redeploy your site

Note: Netlify automatically provides some variables like `URL` which you can reference in other variables.