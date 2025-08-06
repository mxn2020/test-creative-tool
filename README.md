# Geenius Template - Vite + React + MongoDB + Better Auth

A modern, production-ready full-stack template featuring React, MongoDB, Better Auth, and comprehensive admin functionality. This template provides a complete authentication system with role-based access control, session management, audit logging, and a fully-featured admin dashboard.

## 🚀 Key Features

### Authentication & Security
- **🔐 Better Auth Integration** - Modern authentication with email/password and social providers
- **👥 Role-Based Access Control (RBAC)** - User and Admin roles with protected routes
- **🔄 Session Management** - View and revoke active sessions with device detection
- **📧 Email Integration** - Password reset, verification emails via Resend
- **🛡️ Security Features** - Rate limiting, audit logging, CSRF protection

### Admin Dashboard
- **📊 System Overview** - Real-time statistics and activity monitoring
- **👤 User Management** - Create, edit, delete users and manage roles
- **📋 Audit Logs** - Comprehensive activity tracking with export functionality
- **🔍 Advanced Search** - Filter users and logs with pagination

### Developer Experience
- **⚡ Vite + React 19** - Lightning-fast development with latest React features
- **🎨 Tailwind CSS + shadcn/ui** - Beautiful, accessible UI components
- **📦 TypeScript** - Full type safety across the stack
- **🧪 Comprehensive Testing** - Unit, integration, E2E, and performance tests
- **🚀 One-Click Deploy** - Ready for Netlify with serverless functions

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- pnpm (recommended) or npm
- Resend account (for emails)

## 🛠️ Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd geenius-template-vite-react-mongo
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Update `.env.local` with your credentials:
```env
# Database
DATABASE_URL="mongodb://localhost:27017/geenius-dev"

# Authentication
BETTER_AUTH_SECRET="generate-32-char-secret-with-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:5176"

# Email (optional but recommended)
RESEND_API_KEY="re_xxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"
```

### 3. Database Setup

```bash
# For local MongoDB
brew install mongodb-community
brew services start mongodb-community

# Or use Docker
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Initialize database
pnpm db:generate
pnpm db:push
```

### 4. Create Admin User

```bash
# Interactive CLI
pnpm admin:create

# Or use script with parameters
pnpm admin:register -- --email admin@example.com --password "SecurePass123!" --name "Admin"
```

### 5. Start Development

```bash
# Start with Netlify Dev (recommended - includes serverless functions)
pnpm dev:netlify

# Or frontend only
pnpm dev
```

- **Frontend**: http://localhost:5176
- **Admin Dashboard**: http://localhost:5176/admin (requires admin login)
- **API**: http://localhost:8889/api

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── admin/          # Admin dashboard components
│   │   └── ui/             # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts         # Better Auth configuration
│   │   ├── services/       # Business logic services
│   │   └── plugins/        # External service integrations
│   ├── pages/              # Page components
│   └── App.tsx             # Main application
├── prisma/
│   └── schema.prisma       # Database schema
├── netlify/
│   └── functions/          # Serverless API endpoints
├── e2e/                    # End-to-end tests
└── docs/                   # Documentation
```

## 🔧 Available Scripts

### Development
```bash
pnpm dev              # Start frontend dev server
pnpm dev:netlify      # Start with Netlify functions
pnpm build            # Build for production
pnpm preview          # Preview production build
```

### Database
```bash
pnpm db:test          # Test MongoDB connection
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:studio        # Open Prisma Studio GUI
pnpm db:seed          # Seed sample data
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:unit        # Unit tests only
pnpm test:integration # Integration tests
pnpm test:e2e         # End-to-end tests
pnpm test:coverage    # Generate coverage report
```

### Admin
```bash
pnpm admin:create     # Create admin user interactively
pnpm admin:register   # Create admin via CLI args
```

## 🔐 Authentication Features

### Email/Password Authentication
- Registration with email verification
- Login with remember me option
- Forgot password flow
- Password strength requirements
- Rate limiting on auth endpoints

### Session Management
- View all active sessions
- See device and location info
- Revoke individual sessions
- "Sign out all devices" option
- Session expiry handling

### Social Login (Optional)
Configure in `.env.local`:
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-secret
```

## 👤 User Roles & Permissions

### User Role
- View own profile and data
- Manage own sessions
- View own audit logs
- Update profile information

### Admin Role
- All user permissions plus:
- Access admin dashboard
- View all users and their data
- Manage user roles
- Delete user accounts
- View system-wide audit logs
- Access system statistics

## 📊 Admin Dashboard Features

### Dashboard Overview
- Total users count
- Active users (24h)
- New registrations
- Failed login attempts
- Recent activity chart

### User Management
- Search and filter users
- View detailed user profiles
- Change user roles
- Delete users (with confirmation)
- View user sessions
- Access user audit logs

### Audit Logging
- Track all authentication events
- Monitor admin actions
- Filter by user, action, date
- Export logs as CSV
- Real-time updates

## 🚀 Deployment

### Deploy to Netlify

1. **Push to GitHub**
2. **Connect to Netlify**
   - Import project from GitHub
   - Configure build settings:
     - Build command: `pnpm build`
     - Publish directory: `dist`
     - Functions directory: `netlify/functions`

3. **Set Environment Variables** in Netlify dashboard
4. **Deploy** - Netlify will build and deploy automatically

### Deploy to Vercel

```bash
npx vercel
```

### Deploy with Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🧪 Testing

### Unit Tests
```bash
pnpm test:unit
```
- Component tests with React Testing Library
- Service layer tests
- Utility function tests

### Integration Tests
```bash
pnpm test:integration
```
- API endpoint tests
- Database integration tests
- Authentication flow tests

### E2E Tests
```bash
pnpm test:e2e
```
- Full user flows with Playwright
- Admin functionality tests
- Cross-browser testing

### Performance Tests
```bash
pnpm test:load     # Load testing with k6
pnpm test:stress   # Stress testing
```

## 📚 Documentation

- [Environment Variables](./docs/ENVIRONMENT_VARIABLES.md) - Complete env var reference
- [Admin Setup Guide](./docs/ADMIN_SETUP.md) - Creating and managing admins
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions
- [API Documentation](./docs/API.md) - API endpoint reference
- [Security Guide](./docs/SECURITY.md) - Security best practices

## 🛡️ Security Features

- **Password Requirements**: Minimum 8 chars, uppercase, lowercase, number, special char
- **Rate Limiting**: Configurable limits on auth endpoints
- **Session Security**: Secure session tokens with expiry
- **Audit Trail**: Complete activity logging
- **CSRF Protection**: Built-in with Better Auth
- **Input Validation**: Comprehensive validation on all inputs
- **SQL Injection Protection**: Parameterized queries via Prisma

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Better Auth](https://better-auth.com/) - Modern authentication for TypeScript
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - UI library
- [Prisma](https://www.prisma.io/) - Database toolkit
- [MongoDB](https://www.mongodb.com/) - Document database
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Resend](https://resend.com/) - Email service

---

Built with ❤️ for modern full-stack development