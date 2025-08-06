# Better Auth + Vite + Netlify Functions Complete TypeScript Guide

A comprehensive guide to implementing type-safe authentication in a Vite React TypeScript app using Better Auth with Netlify Functions for backend API routes.

## Table of Contents

1. [Project Setup](#project-setup)
2. [TypeScript Configuration](#typescript-configuration)
3. [Database Configuration](#database-configuration)
4. [Better Auth Server Setup](#better-auth-server-setup)
5. [Netlify Functions Setup](#netlify-functions-setup)
6. [Client Configuration](#client-configuration)
7. [Type Definitions](#type-definitions)
8. [Authentication Pages](#authentication-pages)
9. [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
10. [Protected Routes](#protected-routes)
11. [Protected API Routes](#protected-api-routes)
12. [Deployment](#deployment)
13. [Additional Features](#additional-features)

## Project Setup

### 1. Create Vite React TypeScript App

```bash
npm create vite@latest my-auth-app -- --template react-ts
cd my-auth-app
npm install
```

### 2. Install Dependencies

```bash
# Core dependencies
npm install better-auth

# Database adapters (choose one)
npm install pg @types/pg              # PostgreSQL
npm install mysql2                    # MySQL
npm install mongodb                   # MongoDB
npm install @libsql/client           # Turso/SQLite

# Client-side routing
npm install react-router-dom
npm install @types/react-router-dom

# UI (optional)
npm install @radix-ui/react-dialog @radix-ui/react-button
# or any UI library of your choice
```

## TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "src",
    "netlify/functions/**/*"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Environment Variables Types

```typescript
// src/types/env.d.ts
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly DEV: boolean
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// For Node.js environment (Netlify functions)
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Database
      DATABASE_URL: string
      MONGODB_URI?: string
      
      // Better Auth
      BETTER_AUTH_SECRET: string
      BETTER_AUTH_URL: string
      
      // OAuth Providers
      GOOGLE_CLIENT_ID?: string
      GOOGLE_CLIENT_SECRET?: string
      GITHUB_CLIENT_ID?: string
      GITHUB_CLIENT_SECRET?: string
    }
  }
}

export {}
```

### 3. Project Structure

```
my-auth-app/
├── netlify/
│   └── functions/
│       ├── auth.ts
│       └── api/
│           ├── admin.ts
│           └── user-profile.ts
├── src/
│   ├── lib/
│   │   ├── auth-server.ts
│   │   ├── auth-client.ts
│   │   ├── auth-types.ts
│   │   ├── permissions.ts
│   │   ├── middleware.ts
│   │   └── admin-utils.ts
│   ├── components/
│   │   ├── ProtectedRoute.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── Navbar.tsx
│   │   └── admin/
│   │       └── UserManagement.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AdminPanel.tsx
│   │   └── Profile.tsx
│   ├── types/
│   │   ├── env.d.ts
│   │   ├── auth.ts
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
├── .env
├── netlify.toml
├── tsconfig.json
└── vite.config.ts
```

## Database Configuration

### Environment Variables (.env)

```env
# Database - Choose one option below

# Option 1: PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Option 2: MySQL
DATABASE_URL=mysql://user:password@localhost:3306/myapp

# Option 3: MongoDB
MONGODB_URI=mongodb://localhost:27017/myapp
# or for MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp

# Option 4: Turso/SQLite
# DATABASE_URL=libsql://your-turso-db.turso.io

# Better Auth
BETTER_AUTH_SECRET=your-super-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:5173

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Type Definitions

### src/types/auth.ts

```typescript
import type { auth } from '@/lib/auth-server'

// Core Better Auth types
export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user

// Custom user roles
export type UserRole = 'user' | 'moderator' | 'admin' | 'super-admin'

// Extended user type with role
export interface ExtendedUser extends User {
  role: UserRole
}

// Auth context types
export interface AuthUser {
  id: string
  email: string
  name: string | null
  role: UserRole
  image?: string | null
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthSession {
  session: {
    id: string
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string | null
    userAgent?: string | null
  }
  user: AuthUser
}

// Permission types for RBAC
export interface Permission {
  resource: string
  actions: string[]
}

export interface RolePermissions {
  [resource: string]: string[]
}

// Admin operations types
export interface CreateUserData {
  name: string
  email: string
  password: string
  role?: UserRole
  additionalData?: Record<string, any>
}

export interface UpdateUserData {
  name?: string
  email?: string
  role?: UserRole
  image?: string
}

export interface ListUsersOptions {
  limit?: number
  offset?: number
  sortBy?: 'createdAt' | 'email' | 'name'
  sortDirection?: 'asc' | 'desc'
  role?: UserRole
}

export interface BanUserData {
  userId: string
  reason?: string
  expiresIn?: number // seconds
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
```

### src/types/api.ts

```typescript
import type { NetlifyHandlerEvent, NetlifyHandlerContext } from '@netlify/functions'

// Netlify function types
export interface AuthenticatedEvent extends NetlifyHandlerEvent {
  user?: {
    id: string
    email: string
    role: string
  }
}

export interface NetlifyFunctionResponse {
  statusCode: number
  headers?: Record<string, string>
  body: string
}

export interface AuthMiddlewareResult {
  statusCode?: number
  body?: string
  user?: {
    id: string
    email: string
    role: string
  }
  session?: any
}

// API endpoint types
export interface UserProfileResponse {
  user: {
    id: string
    email: string
    name: string | null
    role: string
    createdAt: string
  }
}

export interface AdminUserListResponse {
  users: Array<{
    id: string
    email: string
    name: string | null
    role: string
    banned: boolean
    createdAt: string
  }>
  total: number
}
```

## Better Auth Server Setup

### lib/auth-server.ts

```typescript
import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import type { UserRole } from "@/types/auth"

// Database configuration - choose one option below

// Option 1: PostgreSQL
import { Pool } from "pg"
const database = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Option 2: MySQL
// import mysql from "mysql2/promise"
// const database = mysql.createConnection(process.env.DATABASE_URL)

// Option 3: MongoDB
// import { MongoClient } from "mongodb"
// import { mongodbAdapter } from "better-auth/adapters/mongodb"
// const client = new MongoClient(process.env.MONGODB_URI!)
// await client.connect()
// const database = mongodbAdapter(client.db())

// Option 4: Turso/SQLite
// import { createClient } from "@libsql/client"
// const database = createClient({
//   url: process.env.DATABASE_URL!,
//   authToken: process.env.DATABASE_AUTH_TOKEN
// })

export const auth = betterAuth({
  database,
  
  // Basic configuration
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
    autoSignIn: true,
  },
  
  // User schema with role field
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user" as UserRole,
        input: false, // Don't allow user to set role during signup
      },
    },
  },
  
  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  
  // Social providers (optional)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  
  // Plugins
  plugins: [
    admin({
      defaultRole: "user" as UserRole,
      adminRoles: ["admin", "super-admin"] as UserRole[],
      // Optional: specific user IDs that should be considered admins
      // adminUserIds: ["user-id-1", "user-id-2"],
    })
  ],
  
  // Advanced configuration
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    generateId: () => crypto.randomUUID(),
  },
  
  // Hooks for custom logic
  hooks: {
    after: [
      {
        matcher: (context) => context.path === "/sign-up/email",
        handler: async (context) => {
          // Custom logic after user registration
          console.log("New user registered:", context.user?.email)
          
          // Example: Set admin role for specific email domains
          if (context.user?.email?.endsWith("@admin.com")) {
            console.log("Admin user detected")
          }
        }
      }
    ]
  }
})

// Export auth type for client inference
export type AuthType = typeof auth
```

### MongoDB-specific Configuration

If you're using MongoDB, here's the complete setup:

```typescript
// lib/auth-server.ts - MongoDB Version
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { admin } from "better-auth/plugins"
import type { UserRole } from "@/types/auth"

// MongoDB connection setup
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the value
  // across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI!)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(process.env.MONGODB_URI!)
  clientPromise = client.connect()
}

// Get database instance
const getDatabase = async () => {
  const client = await clientPromise
  return client.db()
}

export const auth = betterAuth({
  database: mongodbAdapter(await getDatabase()),
  
  // Basic configuration
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  
  // User schema with role field
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user" as UserRole,
        input: false, // Don't allow user to set role during signup
      },
    },
  },
  
  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  
  // Social providers (optional)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  
  // Plugins
  plugins: [
    admin({
      defaultRole: "user" as UserRole,
      adminRoles: ["admin", "super-admin"] as UserRole[],
    })
  ],
  
  // Advanced configuration
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    // MongoDB uses ObjectId by default, so we can let it generate IDs
    generateId: false, // Let MongoDB handle ID generation
  },
  
  // Hooks for custom logic
  hooks: {
    after: [
      {
        matcher: (context) => context.path === "/sign-up/email",
        handler: async (context) => {
          console.log("New user registered:", context.user?.email)
          // Assign default role if not set
          if (!context.user?.role) {
            // Set default role logic here if needed
          }
        }
      }
    ]
  }
})

export type AuthType = typeof auth

// Global TypeScript declaration for MongoDB client
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}
```
```

## Netlify Functions Setup

### netlify/functions/auth.ts

```typescript
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { auth } from "../../src/lib/auth-server"

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    // Better Auth expects the request object
    const request = new Request(
      `${process.env.BETTER_AUTH_URL || 'http://localhost:5173'}${event.path}`,
      {
        method: event.httpMethod,
        headers: event.headers as HeadersInit,
        body: event.body,
      }
    )

    // Handle auth requests
    const response = await auth.handler(request)
    
    // Convert Response to Netlify function format
    const body = await response.text()
    const headers: Record<string, string> = {}
    
    response.headers.forEach((value, key) => {
      headers[key] = value
    })

    return {
      statusCode: response.status,
      headers,
      body,
    }
  } catch (error) {
    console.error("Auth handler error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}
```

### lib/middleware.ts

```typescript
import type { HandlerEvent } from '@netlify/functions'
import type { AuthMiddlewareResult, UserRole } from '@/types/auth'
import { auth } from "./auth-server"

export async function requireAuth(event: HandlerEvent): Promise<AuthMiddlewareResult> {
  try {
    // Extract session token from cookies or headers
    const authCookie = event.headers.cookie
      ?.split(';')
      .find(c => c.trim().startsWith('better-auth.session_token='))
      ?.split('=')[1]

    if (!authCookie) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "No session token" })
      }
    }

    // Verify session with Better Auth
    const session = await auth.api.getSession({
      headers: {
        cookie: event.headers.cookie || ""
      }
    })

    if (!session) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid session" })
      }
    }

    return { 
      user: session.user as any, 
      session: session.session 
    }
  } catch (error) {
    console.error("Auth middleware error:", error)
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Authentication failed" })
    }
  }
}

export async function requireRole(
  event: HandlerEvent, 
  requiredRole: UserRole
): Promise<AuthMiddlewareResult> {
  const authResult = await requireAuth(event)
  
  if (authResult.statusCode) {
    return authResult
  }

  const { user } = authResult
  
  // Check user role - supports both single role and multiple roles
  const userRoles = typeof user?.role === 'string' 
    ? user.role.split(',').map((r: string) => r.trim())
    : Array.isArray(user?.role) 
    ? user.role 
    : [user?.role || 'user']
  
  if (!userRoles.includes(requiredRole)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ 
        error: "Insufficient permissions",
        required: requiredRole,
        current: userRoles
      })
    }
  }

  return authResult
}

export async function requireAdmin(event: HandlerEvent): Promise<AuthMiddlewareResult> {
  const authResult = await requireAuth(event)
  
  if (authResult.statusCode) {
    return authResult
  }

  const { user } = authResult
  
  // Check if user has admin role using Better Auth's admin system
  try {
    const hasAdminPermission = await auth.api.userHasPermission({
      body: {
        userId: user?.id,
        permissions: {
          user: ["create", "delete"] // Admin should have user management permissions
        }
      }
    })

    if (!hasAdminPermission) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Admin access required" })
      }
    }

    return authResult
  } catch (error) {
    // Fallback to role-based check
    return requireRole(event, 'admin')
  }
}

export async function requirePermission(
  event: HandlerEvent, 
  permissions: Record<string, string[]>
): Promise<AuthMiddlewareResult> {
  const authResult = await requireAuth(event)
  
  if (authResult.statusCode) {
    return authResult
  }

  const { user } = authResult

  try {
    const hasPermission = await auth.api.userHasPermission({
      body: {
        userId: user?.id,
        permissions
      }
    })

    if (!hasPermission) {
      return {
        statusCode: 403,
        body: JSON.stringify({ 
          error: "Insufficient permissions",
          required: permissions
        })
      }
    }

    return authResult
  } catch (error) {
    console.error("Permission check error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Permission check failed" })
    }
  }
}
```

### netlify/functions/api/admin.ts

```typescript
import type { Handler } from '@netlify/functions'
import type { AdminUserListResponse, ApiResponse } from '@/types/api'
import { requireRole } from "../../../src/lib/middleware"

export const handler: Handler = async (event, context) => {
  // Protect admin route
  const authResult = await requireRole(event, 'admin')
  
  if (authResult.statusCode) {
    return {
      statusCode: authResult.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: authResult.body || JSON.stringify({ error: "Unauthorized" })
    }
  }

  const { user } = authResult

  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        const adminResponse: ApiResponse<AdminUserListResponse> = {
          success: true,
          message: "Admin dashboard data",
          data: {
            users: [], // Your user fetching logic here
            total: 0
          }
        }
        
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminResponse)
        }
      
      case 'POST':
        const data = JSON.parse(event.body || '{}')
        const postResponse: ApiResponse = {
          success: true,
          data,
          message: "Admin operation completed"
        }
        
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postResponse)
        }
      
      default:
        return {
          statusCode: 405,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            success: false, 
            error: "Method not allowed" 
          })
        }
    }
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: "Internal server error"
    }
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorResponse)
    }
  }
}
```

### netlify/functions/api/user-profile.ts

```typescript
import type { Handler } from '@netlify/functions'
import type { UserProfileResponse, ApiResponse } from '@/types/api'
import { requireAuth } from "../../../src/lib/middleware"

export const handler: Handler = async (event, context) => {
  const authResult = await requireAuth(event)
  
  if (authResult.statusCode) {
    return {
      statusCode: authResult.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: authResult.body || JSON.stringify({ error: "Unauthorized" })
    }
  }

  const { user } = authResult

  switch (event.httpMethod) {
    case 'GET':
      const getResponse: ApiResponse<UserProfileResponse> = {
        success: true,
        data: {
          user: {
            id: user?.id || "",
            email: user?.email || "",
            name: user?.name || null,
            role: user?.role || "user",
            createdAt: user?.createdAt?.toISOString() || new Date().toISOString(),
          }
        }
      }
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getResponse)
      }
    
    case 'PUT':
      const updates = JSON.parse(event.body || '{}')
      const putResponse: ApiResponse = {
        success: true,
        message: "Profile updated",
        data: { 
          user: { ...user, ...updates }
        }
      }
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putResponse)
      }
    
    default:
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          success: false, 
          error: "Method not allowed" 
        })
      }
  }
}
```

## Client Configuration

### lib/auth-client.ts

```typescript
import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { AuthType } from "./auth-server"

export const authClient = createAuthClient({
  baseURL: import.meta.env.DEV 
    ? "http://localhost:8888/.netlify/functions/auth"  // Local development
    : "/.netlify/functions/auth",  // Production
  
  plugins: [
    adminClient(),
    inferAdditionalFields<AuthType>()
  ]
})

// Export hooks for easy use with proper typing
export const { 
  useSession, 
  signIn, 
  signUp, 
  signOut,
  getSession 
} = authClient

// Export the client itself
export { authClient }

// Export types inferred from the client
export type Session = typeof authClient.$Infer.Session
export type User = typeof authClient.$Infer.Session.user
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
    },
  },
})
```

## Authentication Pages

### components/LoginForm.tsx

```tsx
import { useState } from 'react'
import { signIn } from '../lib/auth-client'
import { useNavigate } from 'react-router-dom'
import type { FormEvent, ChangeEvent } from 'react'

interface LoginFormState {
  email: string
  password: string
  loading: boolean
  error: string
}

export function LoginForm(): JSX.Element {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    loading: false,
    error: ''
  })
  
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value,
      error: '' // Clear error when user starts typing
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setFormState(prev => ({ ...prev, loading: true, error: '' }))

    try {
      await signIn.email(
        { 
          email: formState.email, 
          password: formState.password 
        },
        {
          onSuccess: () => {
            navigate('/dashboard')
          },
          onError: (error: any) => {
            setFormState(prev => ({
              ...prev,
              error: error.message || 'Login failed',
              loading: false
            }))
          }
        }
      )
    } catch (err) {
      setFormState(prev => ({
        ...prev,
        error: 'Login failed',
        loading: false
      }))
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github'): Promise<void> => {
    try {
      await signIn.social({ provider })
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        error: `${provider} login failed`
      }))
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {formState.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {formState.error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={formState.loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {formState.loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6">
        <div className="text-center text-gray-500 mb-4">Or continue with</div>
        
        <div className="space-y-2">
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Continue with Google
          </button>
          
          <button
            onClick={() => handleSocialLogin('github')}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
          >
            Continue with GitHub
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  )
}
```

### components/RegisterForm.tsx

```tsx
import { useState } from 'react'
import { signUp } from '../lib/auth-client'
import { useNavigate } from 'react-router-dom'
import type { FormEvent, ChangeEvent } from 'react'

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterFormState extends RegisterFormData {
  loading: boolean
  error: string
}

export function RegisterForm(): JSX.Element {
  const [formState, setFormState] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: ''
  })
  
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value,
      error: '' // Clear error when user starts typing
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setFormState(prev => ({ ...prev, loading: true, error: '' }))

    if (formState.password !== formState.confirmPassword) {
      setFormState(prev => ({
        ...prev,
        error: 'Passwords do not match',
        loading: false
      }))
      return
    }

    try {
      await signUp.email(
        {
          email: formState.email,
          password: formState.password,
          name: formState.name
        },
        {
          onSuccess: () => {
            navigate('/dashboard')
          },
          onError: (error: any) => {
            setFormState(prev => ({
              ...prev,
              error: error.message || 'Registration failed',
              loading: false
            }))
          }
        }
      )
    } catch (err) {
      setFormState(prev => ({
        ...prev,
        error: 'Registration failed',
        loading: false
      }))
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      
      {formState.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {formState.error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={formState.loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {formState.loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  )
}
```

### Enhanced Navbar with Role Display

```tsx
// components/Navbar.tsx
import { useSession, signOut } from '../lib/auth-client'
import { Link, useNavigate } from 'react-router-dom'
import { WithRole, WithPermission } from './ProtectedRoute'
import type { UserRole } from '../types/auth'

export function Navbar(): JSX.Element {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

  const handleSignOut = async (): Promise<void> => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate('/login')
        }
      }
    })
  }

  const getRoleBadgeColor = (role: UserRole): string => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'super-admin': return 'bg-purple-100 text-purple-800'
      case 'moderator': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              My App
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isPending ? (
              <div className="text-gray-500">Loading...</div>
            ) : session ? (
              <>
                {/* Role-based navigation */}
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                
                <WithPermission permissions={{ analytics: ["view"] }}>
                  <Link 
                    to="/analytics" 
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Analytics
                  </Link>
                </WithPermission>
                
                <WithRole role="moderator">
                  <Link 
                    to="/moderate" 
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Moderate
                  </Link>
                </WithRole>
                
                <WithRole role="admin">
                  <Link 
                    to="/admin" 
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Admin
                  </Link>
                </WithRole>
                
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  Profile
                </Link>
                
                {/* User info with role badge */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">
                    {session.user.name || session.user.email}
                  </span>
                  {session.user.role && (
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(session.user.role as UserRole)}`}>
                      {session.user.role}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

## Role-Based Access Control (RBAC)

Better Auth provides a comprehensive role and permission system through the admin plugin. This section covers how to set up and manage user roles with full TypeScript support.

### Basic Role Setup

The admin plugin automatically adds a `role` field to your user table and provides role management functionality.

### Advanced Role & Permission System

For more complex permission systems, you can define custom roles and permissions:

#### lib/permissions.ts

```typescript
import { createAccessControl } from "better-auth/plugins/access"
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access"
import type { UserRole, RolePermissions } from "@/types/auth"

// Define your permission statements
export const statement = {
  ...defaultStatements, // Include default Better Auth permissions
  // Custom resources and permissions
  project: ["create", "read", "update", "delete", "share"],
  analytics: ["view", "export"],
  billing: ["view", "manage"],
  settings: ["view", "update"],
} as const

// Create access controller
export const ac = createAccessControl(statement)

// Define roles with specific permissions
export const user = ac.newRole({
  project: ["create", "read", "update"], // Users can manage their own projects
  analytics: ["view"], // Users can view analytics
})

export const moderator = ac.newRole({
  project: ["create", "read", "update", "delete"], // Moderators can delete projects
  analytics: ["view", "export"], // Moderators can export analytics
  ...adminAc.statements, // Include some admin permissions
})

export const admin = ac.newRole({
  project: ["create", "read", "update", "delete", "share"], // Full project access
  analytics: ["view", "export"], // Full analytics access
  billing: ["view", "manage"], // Full billing access
  settings: ["view", "update"], // Full settings access
  ...adminAc.statements, // Include all admin permissions
})

export const superAdmin = ac.newRole({
  project: ["create", "read", "update", "delete", "share"],
  analytics: ["view", "export"],
  billing: ["view", "manage"],
  settings: ["view", "update"],
  user: ["create", "read", "update", "delete", "ban", "impersonate"], // Full user management
  ...adminAc.statements,
})

// Type-safe role permissions mapping
export const rolePermissions: Record<UserRole, RolePermissions> = {
  user: {
    project: ["create", "read", "update"],
    analytics: ["view"],
  },
  moderator: {
    project: ["create", "read", "update", "delete"],
    analytics: ["view", "export"],
  },
  admin: {
    project: ["create", "read", "update", "delete", "share"],
    analytics: ["view", "export"],
    billing: ["view", "manage"],
    settings: ["view", "update"],
  },
  "super-admin": {
    project: ["create", "read", "update", "delete", "share"],
    analytics: ["view", "export"],
    billing: ["view", "manage"],
    settings: ["view", "update"],
    user: ["create", "read", "update", "delete", "ban", "impersonate"],
  },
}
```

#### Updated Server Configuration

```typescript
// lib/auth-server.ts - With custom permissions
import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { ac, user, moderator, admin as adminRole, superAdmin } from "./permissions"
import type { UserRole } from "@/types/auth"

export const auth = betterAuth({
  // ... database and other config
  
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user" as UserRole,
        input: false,
      },
    },
  },
  
  plugins: [
    admin({
      ac, // Pass the access controller
      roles: {
        user,
        moderator,
        admin: adminRole,
        "super-admin": superAdmin,
      },
      defaultRole: "user" as UserRole,
      adminRoles: ["admin", "super-admin"] as UserRole[],
    })
  ],
  
  // ... rest of config
})

export type AuthType = typeof auth
```

#### Updated Client Configuration

```typescript
// lib/auth-client.ts - With custom permissions
import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { ac, user, moderator, admin, superAdmin } from "./permissions"
import type { AuthType } from "./auth-server"

export const authClient = createAuthClient({
  baseURL: import.meta.env.DEV 
    ? "http://localhost:8888/.netlify/functions/auth"
    : "/.netlify/functions/auth",
  
  plugins: [
    adminClient({
      ac,
      roles: {
        user,
        moderator,
        admin,
        "super-admin": superAdmin,
      }
    }),
    inferAdditionalFields<AuthType>()
  ]
})

// Export everything with proper types
export const { 
  useSession, 
  signIn, 
  signUp, 
  signOut,
  getSession 
} = authClient

export { authClient }

// Type-safe exports
export type Session = typeof authClient.$Infer.Session
export type User = typeof authClient.$Infer.Session.user
```

### Role Management Functions

#### Admin Functions for User Management

```typescript
// lib/admin-utils.ts
import { authClient } from "./auth-client"
import type { 
  CreateUserData, 
  UpdateUserData, 
  ListUsersOptions, 
  BanUserData,
  UserRole,
  ApiResponse,
  PaginatedResponse
} from "@/types/auth"

export const adminUtils = {
  // Create a new user with specific role
  async createUser(userData: CreateUserData): Promise<ApiResponse> {
    return await authClient.admin.createUser({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "user",
      data: userData.additionalData || {}
    })
  },

  // List all users with pagination
  async listUsers(options: ListUsersOptions = {}): Promise<PaginatedResponse<any>> {
    return await authClient.admin.listUsers({
      limit: options.limit || 10,
      offset: options.offset || 0,
      sortBy: options.sortBy || "createdAt",
      sortDirection: options.sortDirection || "desc"
    })
  },

  // Update user role
  async setUserRole(userId: string, role: UserRole): Promise<ApiResponse> {
    return await authClient.admin.setUserRole({
      userId,
      role
    })
  },

  // Ban/unban user
  async banUser(userId: string, reason?: string, expiresIn?: number): Promise<ApiResponse> {
    return await authClient.admin.banUser({
      userId,
      reason: reason || "Violated terms of service",
      expiresIn: expiresIn || 60 * 60 * 24 * 7 // 1 week
    })
  },

  async unbanUser(userId: string): Promise<ApiResponse> {
    return await authClient.admin.unbanUser({ userId })
  },

  // Impersonate user (for debugging/support)
  async impersonateUser(userId: string): Promise<ApiResponse> {
    return await authClient.admin.impersonateUser({ userId })
  },

  async stopImpersonating(): Promise<ApiResponse> {
    return await authClient.admin.stopImpersonating()
  },

  // Check permissions
  async hasPermission(permissions: Record<string, string[]>): Promise<boolean> {
    const result = await authClient.admin.hasPermission({ permissions })
    return result.data || false
  },

  // Check role permissions (client-side)
  checkRolePermission(permissions: Record<string, string[]>, role: UserRole): boolean {
    return authClient.admin.checkRolePermission({ permissions, role })
  }
}

// Type-safe permission checker
export function hasPermission(
  userRole: UserRole, 
  resource: string, 
  action: string
): boolean {
  return authClient.admin.checkRolePermission({
    permissions: { [resource]: [action] },
    role: userRole
  })
}

// Type-safe role checker
export function hasRole(userRoles: UserRole | UserRole[], requiredRole: UserRole): boolean {
  const roles = Array.isArray(userRoles) ? userRoles : [userRoles]
  return roles.includes(requiredRole)
}

// Type-safe admin checker
export function isAdmin(userRole: UserRole): boolean {
  return ["admin", "super-admin"].includes(userRole)
}
```

### Permission-Based Route Protection

#### Enhanced Protected Route Component

```tsx
// components/ProtectedRoute.tsx
import { useSession } from '../lib/auth-client'
import { Navigate, useLocation } from 'react-router-dom'
import { authClient } from '../lib/auth-client'
import type { UserRole, RolePermissions } from '../types/auth'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: UserRole
  requiredPermissions?: RolePermissions
  fallback?: ReactNode
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermissions,
  fallback 
}: ProtectedRouteProps) {
  const { data: session, isPending } = useSession()
  const location = useLocation()

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role if required
  if (requiredRole) {
    const userRoles = typeof session.user.role === 'string' 
      ? session.user.role.split(',').map(r => r.trim()) as UserRole[]
      : [session.user.role as UserRole || 'user']

    if (!userRoles.includes(requiredRole)) {
      return fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">
            Access denied. Required role: {requiredRole}
          </div>
        </div>
      )
    }
  }

  // Check permissions if required
  if (requiredPermissions) {
    const hasPermission = authClient.admin.checkRolePermission({
      permissions: requiredPermissions,
      role: session.user.role as UserRole
    })

    if (!hasPermission) {
      return fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">
            Access denied. Insufficient permissions.
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}

// Permission-based wrapper component
interface WithPermissionProps {
  permissions: RolePermissions
  children: ReactNode
  fallback?: ReactNode
  role?: UserRole
}

export function WithPermission({ 
  permissions, 
  children, 
  fallback = null,
  role 
}: WithPermissionProps) {
  const { data: session } = useSession()
  
  if (!session) return <>{fallback}</>

  const userRole = role || session.user.role as UserRole
  const hasPermission = authClient.admin.checkRolePermission({
    permissions,
    role: userRole
  })

  return hasPermission ? <>{children}</> : <>{fallback}</>
}

// Role-based wrapper component
interface WithRoleProps {
  role: UserRole
  children: ReactNode
  fallback?: ReactNode
}

export function WithRole({ 
  role, 
  children, 
  fallback = null 
}: WithRoleProps) {
  const { data: session } = useSession()
  
  if (!session) return <>{fallback}</>

  const userRoles = typeof session.user.role === 'string' 
    ? session.user.role.split(',').map(r => r.trim()) as UserRole[]
    : [session.user.role as UserRole || 'user']

  return userRoles.includes(role) ? <>{children}</> : <>{fallback}</>
}

// Higher-order components
export function withRoleProtection<P extends object>(
  Component: React.ComponentType<P>, 
  requiredRole: UserRole
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}

export function withPermissionProtection<P extends object>(
  Component: React.ComponentType<P>, 
  requiredPermissions: RolePermissions
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute requiredPermissions={requiredPermissions}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}
```

### Admin Dashboard Components

#### User Management Component

```tsx
// components/admin/UserManagement.tsx
import { useState, useEffect } from 'react'
import { adminUtils } from '../../lib/admin-utils'
import { WithPermission } from '../ProtectedRoute'
import type { UserRole, ApiResponse } from '../../types/auth'

interface User {
  id: string
  name: string | null
  email: string
  role: UserRole
  banned: boolean
  createdAt: string
}

interface UserManagementState {
  users: User[]
  loading: boolean
  error: string | null
}

export function UserManagement(): JSX.Element {
  const [state, setState] = useState<UserManagementState>({
    users: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const result = await adminUtils.listUsers({ limit: 50 })
      setState(prev => ({
        ...prev,
        users: result.data || [],
        loading: false
      }))
    } catch (error) {
      console.error('Failed to load users:', error)
      setState(prev => ({
        ...prev,
        error: 'Failed to load users',
        loading: false
      }))
    }
  }

  const handleRoleChange = async (userId: string, newRole: UserRole): Promise<void> => {
    try {
      await adminUtils.setUserRole(userId, newRole)
      await loadUsers() // Reload users
    } catch (error) {
      console.error('Failed to update role:', error)
    }
  }

  const handleBanUser = async (userId: string): Promise<void> => {
    try {
      await adminUtils.banUser(userId, "Banned by admin")
      await loadUsers()
    } catch (error) {
      console.error('Failed to ban user:', error)
    }
  }

  if (state.loading) {
    return <div className="flex justify-center p-8">Loading users...</div>
  }

  if (state.error) {
    return <div className="text-red-600 p-4">{state.error}</div>
  }

  return (
    <WithPermission 
      permissions={{ user: ["read", "update"] }}
      fallback={<div className="text-red-600 p-4">Access denied</div>}
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {state.users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name || 'No name'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      user.banned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.banned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <WithPermission permissions={{ user: ["ban"] }}>
                      <button
                        onClick={() => handleBanUser(user.id)}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        disabled={user.banned}
                      >
                        {user.banned ? 'Banned' : 'Ban'}
                      </button>
                    </WithPermission>
                    
                    <WithPermission permissions={{ user: ["impersonate"] }}>
                      <button
                        onClick={() => adminUtils.impersonateUser(user.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Impersonate
                      </button>
                    </WithPermission>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WithPermission>
  )
}
```

### API Route Protection Examples

#### Admin-Only API Route

```javascript
// netlify/functions/api/admin-users.js
import { requirePermission } from "../../../src/lib/middleware.js"

export async function handler(event, context) {
  // Require specific permissions for user management
  const authResult = await requirePermission(event, {
    user: ["read", "update"]
  })
  
  if (authResult.statusCode) {
    return authResult
  }

  const { user } = authResult

  try {
    switch (event.httpMethod) {
      case 'GET':
        // Get all users - admin only
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: "User list",
            requestedBy: user.id,
            users: [] // Your user fetching logic here
          })
        }
      
      case 'POST':
        // Create user - admin only
        const newUserData = JSON.parse(event.body)
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            success: true, 
            message: "User created",
            data: newUserData 
          })
        }
      
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: "Method not allowed" })
        }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" })
    }
  }
}
```

#### Role-Based API Route

```javascript
// netlify/functions/api/projects.js
import { requireAuth, requireRole } from "../../../src/lib/middleware.js"

export async function handler(event, context) {
  const authResult = await requireAuth(event)
  
  if (authResult.statusCode) {
    return authResult
  }

  const { user } = authResult

  try {
    switch (event.httpMethod) {
      case 'GET':
        // All authenticated users can view projects
        return {
          statusCode: 200,
          body: JSON.stringify({ projects: [] })
        }
      
      case 'POST':
        // Only moderators and admins can create projects
        const createAuthResult = await requireRole(event, 'moderator')
        if (createAuthResult.statusCode) {
          return createAuthResult
        }
        
        const projectData = JSON.parse(event.body)
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            success: true, 
            project: projectData 
          })
        }
      
      case 'DELETE':
        // Only admins can delete projects
        const deleteAuthResult = await requireRole(event, 'admin')
        if (deleteAuthResult.statusCode) {
          return deleteAuthResult
        }
        
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true })
        }
      
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: "Method not allowed" })
        }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" })
    }
  }
}
```

## Protected Pages

### components/ProtectedRoute.jsx

```jsx
import { useSession } from '../lib/auth-client'
import { Navigate, useLocation } from 'react-router-dom'

export function ProtectedRoute({ children, requiredRole = null }) {
  const { data: session, isPending } = useSession()
  const location = useLocation()

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role if required
  if (requiredRole && session.user.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">
          Access denied. Insufficient permissions.
        </div>
      </div>
    )
  }

  return children
}

// Higher-order component for role-based protection
export function withRoleProtection(Component, requiredRole) {
  return function ProtectedComponent(props) {
    return (
      <ProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}
```

### pages/Dashboard.jsx

```jsx
import { useState, useEffect } from 'react'
import { useSession } from '../lib/auth-client'

export function Dashboard() {
  const { data: session } = useSession()
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/.netlify/functions/api/user-profile', {
          credentials: 'include' // Include cookies
        })
        
        if (response.ok) {
          const data = await response.json()
          setUserProfile(data.user)
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  if (loading) {
    return <div className="p-8">Loading profile...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <p><strong>Name:</strong> {session?.user.name}</p>
          <p><strong>Email:</strong> {session?.user.email}</p>
          <p><strong>Member since:</strong> {
            new Date(userProfile?.createdAt).toLocaleDateString()
          }</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Update Profile
            </button>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### App.tsx - With Role-Based Routing

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { Dashboard } from './pages/Dashboard'
import { AdminPanel } from './pages/AdminPanel'
import { UserManagement } from './components/admin/UserManagement'
import { ProtectedRoute, WithRole, WithPermission } from './components/ProtectedRoute'

function App(): JSX.Element {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to My App
              </h1>
              <p className="text-xl text-gray-600">
                A secure app with Better Auth authentication and RBAC
              </p>
              
              {/* Role-based content on homepage */}
              <div className="mt-8 space-y-4">
                <WithRole role="admin" fallback={null}>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-blue-800">👋 Welcome back, Admin!</p>
                  </div>
                </WithRole>
                
                <WithPermission 
                  permissions={{ project: ["create"] }}
                  fallback={null}
                >
                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-green-800">You can create projects!</p>
                  </div>
                </WithPermission>
              </div>
            </div>
          } />
          
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Protected user routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin-only routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/users" element={
            <ProtectedRoute requiredPermissions={{ user: ["read", "update"] }}>
              <UserManagement />
            </ProtectedRoute>
          } />
          
          {/* Moderator and above routes */}
          <Route path="/moderate" element={
            <ProtectedRoute requiredRole="moderator">
              <div className="p-8">
                <h1 className="text-2xl font-bold">Moderation Panel</h1>
                <p>Only moderators and admins can see this.</p>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Permission-based routes */}
          <Route path="/analytics" element={
            <ProtectedRoute requiredPermissions={{ analytics: ["view"] }}>
              <div className="p-8">
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p>Users with analytics view permission can see this.</p>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
```

## Protected API Routes

### Creating Type-Safe API Utilities

```typescript
// lib/api.ts
import type { ApiResponse, PaginatedResponse } from '@/types/api'

export async function apiCall<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(`/.netlify/functions/api/${endpoint}`, {
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API call failed' }))
    throw new Error(error.message || 'API call failed')
  }

  return response.json()
}

// Usage examples with proper typing
export const userAPI = {
  getProfile: (): Promise<ApiResponse<{ user: any }>> => 
    apiCall('user-profile'),
    
  updateProfile: (data: Record<string, any>): Promise<ApiResponse> => 
    apiCall('user-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
}

export const adminAPI = {
  getDashboard: (): Promise<ApiResponse> => 
    apiCall('admin'),
    
  createUser: (userData: Record<string, any>): Promise<ApiResponse> => 
    apiCall('admin', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    
  getUsers: (): Promise<PaginatedResponse<any>> => 
    apiCall('admin/users'),
}

// Generic API hook for React components
import { useState, useEffect } from 'react'
import { useSession } from './auth-client'

export function useApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
} {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  const fetchData = async (): Promise<void> => {
    if (!session) return

    try {
      setLoading(true)
      setError(null)
      const response = await apiCall<T>(endpoint, options)
      setData(response.data || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'API call failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint, session])

  return { data, loading, error, refetch: fetchData }
}
```

### Role-Based API Route Examples

#### Admin-Only API Route

```typescript
// netlify/functions/api/admin-users.ts
import type { Handler } from '@netlify/functions'
import { requirePermission } from "../../../src/lib/middleware"
import type { ApiResponse, AdminUserListResponse } from '@/types/api'

export const handler: Handler = async (event, context) => {
  // Require specific permissions for user management
  const authResult = await requirePermission(event, {
    user: ["read", "update"]
  })
  
  if (authResult.statusCode) {
    return {
      statusCode: authResult.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: authResult.body || JSON.stringify({ 
        success: false, 
        error: "Unauthorized" 
      })
    }
  }

  const { user } = authResult

  try {
    switch (event.httpMethod) {
      case 'GET':
        // Get all users - admin only
        const getUsersResponse: ApiResponse<AdminUserListResponse> = {
          success: true,
          message: "User list retrieved",
          data: {
            users: [], // Your user fetching logic here
            total: 0
          }
        }
        
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getUsersResponse)
        }
      
      case 'POST':
        // Create user - admin only
        const newUserData = JSON.parse(event.body || '{}')
        const createUserResponse: ApiResponse = {
          success: true, 
          message: "User created",
          data: newUserData 
        }
        
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createUserResponse)
        }
      
      default:
        return {
          statusCode: 405,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            success: false, 
            error: "Method not allowed" 
          })
        }
    }
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: "Internal server error"
    }
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorResponse)
    }
  }
}
```

#### Role-Based Projects API Route

```typescript
// netlify/functions/api/projects.ts
import type { Handler } from '@netlify/functions'
import { requireAuth, requireRole } from "../../../src/lib/middleware"
import type { ApiResponse } from '@/types/api'

export const handler: Handler = async (event, context) => {
  const authResult = await requireAuth(event)
  
  if (authResult.statusCode) {
    return {
      statusCode: authResult.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: authResult.body || JSON.stringify({ error: "Unauthorized" })
    }
  }

  const { user } = authResult

  try {
    switch (event.httpMethod) {
      case 'GET':
        // All authenticated users can view projects
        const getProjectsResponse: ApiResponse = {
          success: true,
          data: { projects: [] }
        }
        
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getProjectsResponse)
        }
      
      case 'POST':
        // Only moderators and admins can create projects
        const createAuthResult = await requireRole(event, 'moderator')
        if (createAuthResult.statusCode) {
          return {
            statusCode: createAuthResult.statusCode,
            headers: { 'Content-Type': 'application/json' },
            body: createAuthResult.body || JSON.stringify({ error: "Insufficient permissions" })
          }
        }
        
        const projectData = JSON.parse(event.body || '{}')
        const createProjectResponse: ApiResponse = {
          success: true, 
          data: { project: projectData }
        }
        
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createProjectResponse)
        }
      
      case 'DELETE':
        // Only admins can delete projects
        const deleteAuthResult = await requireRole(event, 'admin')
        if (deleteAuthResult.statusCode) {
          return {
            statusCode: deleteAuthResult.statusCode,
            headers: { 'Content-Type': 'application/json' },
            body: deleteAuthResult.body || JSON.stringify({ error: "Admin access required" })
          }
        }
        
        const deleteResponse: ApiResponse = {
          success: true,
          message: "Project deleted"
        }
        
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(deleteResponse)
        }
      
      default:
        return {
          statusCode: 405,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            success: false, 
            error: "Method not allowed" 
          })
        }
    }
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: "Internal server error"
    }
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorResponse)
    }
  }
}
```message || 'API call failed')
  }

  return response.json()
}

// Usage examples
export const userAPI = {
  getProfile: () => apiCall('user-profile'),
  updateProfile: (data) => apiCall('user-profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
}

export const adminAPI = {
  getDashboard: () => apiCall('admin'),
  createUser: (userData) => apiCall('admin', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
}
```

## Deployment

### netlify.toml

```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/auth/*"
  to = "/.netlify/functions/auth/:splat"
  status = 200

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "npm run dev"
  port = 8888
  publish = "dist"
  functions = "netlify/functions"
```

### Environment Variables Setup

1. **In Netlify Dashboard:**
   - Go to Site settings → Environment variables
   - Add all environment variables from your `.env` file
   - Make sure to use production values for database and OAuth

2. **Database-specific Production Setup:**

   **For PostgreSQL/MySQL:**
   ```env
   DATABASE_URL=postgresql://user:password@your-production-host:5432/database
   ```

   **For MongoDB:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

   **For MongoDB Atlas (recommended for production):**
   - Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
   - Get your connection string from the Atlas dashboard
   - Replace `<password>` and `<dbname>` in the connection string

3. **Database Schema Generation:**
   ```bash
   # For SQL databases only - MongoDB creates collections automatically
   npx better-auth generate
   ```

### Deployment Steps

1. **Push to Git:**
   ```bash
   git add .
   git commit -m "Initial commit with Better Auth"
   git push origin main
   ```

2. **Deploy to Netlify:**
   - Connect your repository in Netlify dashboard
   - Set environment variables
   - Deploy

## Additional Features

### Two-Factor Authentication

```javascript
// lib/auth-server.js
import { betterAuth } from "better-auth"
import { twoFactor } from "better-auth/plugins"

export const auth = betterAuth({
  // ... other config
  plugins: [
    twoFactor({
      issuer: "My App",
    })
  ]
})
```

```javascript
// lib/auth-client.js
import { createAuthClient } from "better-auth/react"
import { twoFactorClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [twoFactorClient()],
  // ... other config
})
```

### Database-specific Advanced Features

#### MongoDB with Mongoose (Alternative Setup)

If you prefer using Mongoose for additional features:

```javascript
// lib/mongoose.js
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectToDatabase
```

```javascript
// lib/auth-server-mongoose.js
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import connectToDatabase from "./mongoose.js"

// Use the same connection for both Mongoose and Better Auth
export const auth = betterAuth({
  database: mongodbAdapter(
    new MongoClient(process.env.MONGODB_URI).db()
  ),
  
  // Custom hooks to work with Mongoose models
  hooks: {
    after: [
      {
        matcher: (context) => context.path === "/sign-up/email",
        handler: async (context) => {
          // Use Mongoose models for additional operations
          await connectToDatabase()
          
          // Create related documents, send emails, etc.
          console.log("User created:", context.user)
        }
      }
    ]
  },
  
  // ... rest of config
})
```

#### PostgreSQL with Custom Connection Pool

```javascript
// lib/auth-server-pg.js
import { betterAuth } from "better-auth"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const auth = betterAuth({
  database: pool,
  // ... rest of config
})
```

#### MySQL with Connection Configuration

```javascript
// lib/auth-server-mysql.js
import { betterAuth } from "better-auth"
import mysql from "mysql2/promise"

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

export const auth = betterAuth({
  database,
  // ... rest of config
})
```

### Rate Limiting

```javascript
// netlify/functions/api/login-attempts.js
import { requireAuth } from "../../../src/lib/middleware.js"

const loginAttempts = new Map()

export async function handler(event, context) {
  const ip = event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip']
  const attempts = loginAttempts.get(ip) || 0
  
  if (attempts > 5) {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: "Too many login attempts" })
    }
  }
  
  // Process login
  // On failed login: loginAttempts.set(ip, attempts + 1)
  // On success: loginAttempts.delete(ip)
}
```

### Custom Hooks

```javascript
// hooks/useApi.js
import { useState, useEffect } from 'react'
import { useSession } from '../lib/auth-client'

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/.netlify/functions/api/${endpoint}`, {
          credentials: 'include',
          ...options,
        })
        
        if (!response.ok) throw new Error('API call failed')
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint, session])

  return { data, loading, error }
}
```

### Email Integration

```javascript
// lib/email.js (for use in Netlify functions)
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your preferred service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error('Email send failed:', error)
    throw error
  }
}
```

## Troubleshooting

### Common Issues

1. **TypeScript Compilation Errors:**
   - Ensure `strict: true` is enabled in `tsconfig.json`
   - Check that all Better Auth types are properly imported
   - Use `typeof auth.$Infer.Session` for proper type inference
   - Make sure `inferAdditionalFields<AuthType>()` is used in client

2. **CORS Errors:**
   - Make sure `baseURL` in client config matches your Netlify functions URL
   - Check that cookies are being sent with `credentials: 'include'`
   - Verify `trustedOrigins` in server config includes your frontend URL

3. **Session Not Persisting:**
   - Verify `BETTER_AUTH_SECRET` is set correctly and is at least 32 characters
   - Check cookie settings in browser dev tools
   - Ensure session configuration matches between client and server

4. **Database Connection Issues:**
   
   **PostgreSQL/MySQL:**
   - Verify `DATABASE_URL` format and connection string
   - Ensure database is accessible from Netlify
   - Check SSL settings for production
   - Test connection with provided connection test scripts
   
   **MongoDB:**
   - Verify `MONGODB_URI` format (should include protocol: `mongodb://` or `mongodb+srv://`)
   - For MongoDB Atlas, ensure IP whitelist includes Netlify's IPs (or use `0.0.0.0/0` for testing)
   - Check network access settings in Atlas dashboard
   - Verify username/password in connection string
   - Ensure global MongoDB client promise is handled correctly

5. **Functions Not Working:**
   - Check Netlify function logs in dashboard
   - Verify file extensions (`.ts` for TypeScript Netlify functions)
   - Make sure `netlify.toml` is configured correctly
   - Ensure proper TypeScript compilation for functions

6. **MongoDB-specific Issues:**
   - **"MongoClient is not connected"**: Ensure client connection is awaited before creating adapter
   - **"Collection not found"**: MongoDB creates collections automatically, ensure your connection is successful
   - **ObjectId vs UUID**: MongoDB uses ObjectId by default, set `generateId: false` in Better Auth config
   - **Type inference issues**: Use proper TypeScript global declarations

7. **Role/Permission Issues:**
   - Verify role field is added to user schema with `input: false`
   - Check that admin plugin is properly configured with roles
   - Ensure permission checking logic uses correct role format
   - Test role assignment in development environment

8. **Type Safety Issues:**
   - Import types from correct Better Auth modules
   - Use `typeof auth.$Infer.Session` for session types
   - Ensure `inferAdditionalFields<AuthType>()` is used in client
   - Check that custom type definitions match Better Auth expectations

### Database Connection Testing

**MongoDB Connection Test:**
```typescript
// test-mongo-connection.ts
import { MongoClient } from 'mongodb'

async function testConnection(): Promise<void> {
  try {
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    console.log("✅ MongoDB connected successfully")
    
    const db = client.db()
    const collections = await db.listCollections().toArray()
    console.log("Collections:", collections.map(c => c.name))
    
    await client.close()
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
  }
}

testConnection()
```

**PostgreSQL Connection Test:**
```typescript
// test-pg-connection.ts
import { Pool } from 'pg'

async function testConnection(): Promise<void> {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const client = await pool.connect()
    console.log("✅ PostgreSQL connected successfully")
    
    const result = await client.query('SELECT version()')
    console.log("Database version:", result.rows[0].version)
    
    client.release()
    await pool.end()
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error)
  }
}

testConnection()
```

**Type Checking Test:**
```typescript
// test-types.ts
import type { Session, User } from '@/lib/auth-client'
import type { UserRole } from '@/types/auth'

// Test user type
const testUser: User = {
  id: "test",
  email: "test@example.com",
  name: "Test User",
  role: "user" as UserRole,
  // Add other required fields based on your schema
}

// Test session type
const testSession: Session = {
  user: testUser,
  session: {
    id: "session-id",
    userId: "test",
    expiresAt: new Date(),
    token: "token"
  }
}

console.log("✅ TypeScript types are working correctly")
```

### Development Best Practices

1. **Type Safety:**
   - Always use proper TypeScript types for Better Auth
   - Leverage `$Infer` for automatic type inference
   - Define custom interfaces for extended user data
   - Use strict TypeScript configuration

2. **Security:**
   - Never expose `BETTER_AUTH_SECRET` in client code
   - Use environment variables for all sensitive data
   - Implement proper role-based access control
   - Validate all user inputs on the server side

3. **Performance:**
   - Use connection pooling for database connections
   - Implement proper caching strategies
   - Optimize Netlify function cold starts
   - Use efficient database queries

4. **Error Handling:**
   - Implement comprehensive error handling in all API routes
   - Provide meaningful error messages to users
   - Log errors for debugging in production
   - Handle network failures gracefully

5. **Testing:**
   - Test authentication flows thoroughly
   - Verify role-based access control
   - Test database connections
   - Validate TypeScript type safety

This comprehensive TypeScript guide provides a production-ready implementation of Better Auth with Vite and Netlify Functions, including:

- **Complete Type Safety**: Full TypeScript implementation with proper type inference
- **Robust RBAC System**: Role and permission-based access control with type safety
- **Multiple Database Support**: PostgreSQL, MySQL, MongoDB, and SQLite with proper TypeScript types
- **Production Deployment**: Complete deployment configuration with environment management
- **Advanced Features**: 2FA, email integration, custom hooks, and admin management
- **Comprehensive Error Handling**: Type-safe error handling and debugging tools

The setup leverages Better Auth's strength as "The most comprehensive authentication framework for TypeScript" with full type safety and "strict mode" support, providing "$Infer property" for automatic type inference and ensuring the entire authentication system is type-safe from database to UI components.