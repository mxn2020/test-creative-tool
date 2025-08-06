# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev            # Start Vite dev server (port 5176)
npm run dev:netlify    # Start Netlify dev with functions (port 8889)

# Building & Linting
npm run build          # TypeScript compile + Vite build
npm run lint           # ESLint with TypeScript support
npm run preview        # Preview production build

# Database (MongoDB + Prisma)
npm run db:test        # Test MongoDB connection
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to MongoDB
npm run db:studio      # Open Prisma Studio
```

## Architecture Overview

This is a full-stack React template with:

- **Frontend**: Vite + React 19 + TypeScript + Tailwind CSS
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Better Auth with MongoDB adapter
- **UI Components**: Radix UI primitives + custom shadcn/ui components
- **Deployment**: Netlify Functions + Static hosting

### Key Architectural Components

**Dev Container System**: The codebase includes a sophisticated development feedback system located in `src/lib/dev-container/`. This wraps UI components with development-time metadata and provides live editing capabilities. All UI components are wrapped with the dev-container system.

**Component Registry**: Located in `src/registry/componentRegistry.ts`, this maps component instances to their definitions and provides metadata for the dev-container system.

**Better Auth Integration**: Authentication is handled by Better Auth, which manages its own user/session models. Application data models in `prisma/schema.prisma` reference Better Auth user IDs via string fields (not Prisma relations).

**Wrapped Components**: The project exports wrapped versions of both shadcn/ui components (`src/lib/dev-container/shadcn/`) and semantic HTML elements (`src/lib/dev-container/geenius/`) that include dev-container functionality.

## Project Structure

```
src/
├── components/auth/        # Authentication components
├── pages/                 # Page components (Landing, etc.)
├── lib/dev-container/     # Dev feedback system
│   ├── components/        # Dev-container core components
│   ├── shadcn/           # Wrapped shadcn/ui components
│   ├── geenius/          # Wrapped semantic HTML components
│   ├── hooks/            # Dev-container hooks
│   └── utils/            # Dev-container utilities
├── registry/             # Component registry and library
└── App.tsx              # Main app with DevModeApp wrapper
```

## Database Schema

Prisma schema uses MongoDB with the following key models:
- `Post` - Blog posts with authorId referencing Better Auth users
- `Comment` - Comments linked to posts
- `Category` - Content categories
- `UserPreference` - User settings linked via Better Auth userId
- `AppSetting` - Application-wide settings

Note: Better Auth handles User/Session models separately.

## Environment Setup

Required variables:
- `DATABASE_URL` - MongoDB connection string
- `VITE_API_URL` - API base URL for frontend

## Development Notes

- Always use the wrapped components from `src/lib/dev-container/` instead of importing shadcn/ui directly
- The dev-container system requires all components to have a `componentId` prop
- Authentication state is managed by Better Auth, not Prisma User models
- Use `npm run lint` before committing to ensure TypeScript compliance