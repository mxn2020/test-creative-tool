# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB running locally or MongoDB Atlas account
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Push database schema
pnpm run db:push

# Start development server
pnpm run dev:netlify
```

## Development Commands

### Starting the Dev Server

We recommend using Netlify Dev for local development as it provides:
- Netlify Functions support (for auth endpoints)
- Proper routing for SPA
- Environment variable handling

```bash
# Recommended - automatically cleans dist folder
pnpm run dev:netlify

# Alternative - manual clean
pnpm run dev:clean

# Vite only (no auth functions)
pnpm run dev
```

### Common Issues

#### "Failed to parse source for import analysis" Error

This error occurs when:
1. You've run `pnpm build` which creates a `dist` folder
2. Then run `pnpm dev:netlify` without cleaning

**Solution**: The `dev:netlify` script now automatically removes the dist folder. If you still see issues:

```bash
# Manually remove dist and start
rm -rf dist
pnpm run dev:netlify

# Or use the clean script
pnpm run dev:clean
```

#### Port Conflicts

The app uses these ports:
- **5176**: Vite dev server
- **8889**: Netlify Dev proxy
- **27017**: MongoDB default

Always access the app at `http://localhost:8889` when using Netlify Dev.

## Build Process

```bash
# Type check and build
pnpm run build

# Preview production build
pnpm run preview
```

## Database Management

```bash
# Generate Prisma client
pnpm run db:generate

# Push schema to database
pnpm run db:push

# Open Prisma Studio
pnpm run db:studio

# Test MongoDB connection
pnpm run db:test
```

## Authentication

The app uses Better Auth with MongoDB. Auth endpoints are served via Netlify Functions at `/api/auth/*`.

### Testing Auth Locally

1. Make sure MongoDB is running
2. Use `pnpm run dev:netlify` (not just `pnpm run dev`)
3. Access the app at `http://localhost:8889`

### Creating Admin Users

See [Admin Guide](./ADMIN_GUIDE.md) for details on creating admin accounts.

## Environment Variables

Required variables:
- `DATABASE_URL` or `MONGODB_URI` - MongoDB connection string
- `BETTER_AUTH_SECRET` - Min 32 characters for auth

Optional:
- `RESEND_API_KEY` - For email service
- OAuth provider credentials

## Project Structure

```
src/
├── components/      # React components
│   ├── admin/      # Admin panel components
│   ├── auth/       # Authentication components
│   └── ui/         # Shadcn UI components
├── lib/            # Utilities and services
│   ├── plugins/    # External service integrations
│   ├── services/   # Business logic services
│   └── dev-container/ # Development feedback system
├── pages/          # Page components
├── registry/       # Component registry system
└── App.tsx         # Main application component
```

## Tips

1. **Always use Netlify Dev** for full functionality
2. **Check MongoDB is running** before starting the app
3. **Use the admin scripts** to create test admin accounts
4. **Component IDs** are type-checked - run `pnpm run generate-types` after adding new ones