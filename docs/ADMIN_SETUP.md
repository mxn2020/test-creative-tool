# Admin User Setup Guide

This guide explains how to create and manage admin users in the application.

## Table of Contents
- [Overview](#overview)
- [Initial Admin Setup](#initial-admin-setup)
- [Managing Admin Users](#managing-admin-users)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Overview

The application uses a role-based access control (RBAC) system with two primary roles:
- **User**: Standard user with access to their own data
- **Admin**: Administrative user with full system access

Admin users can:
- View and manage all users
- Access system-wide audit logs
- View dashboard statistics
- Manage user roles
- Revoke user sessions
- Delete user accounts

## Initial Admin Setup

There are three ways to create the first admin user:

### Method 1: Using the CLI Script (Recommended for Development)

1. **Ensure the application is running**
   ```bash
   npm run dev
   ```

2. **Run the admin creation script**
   ```bash
   npm run admin:create
   ```

3. **Follow the interactive prompts**
   ```
   ? Admin email: admin@example.com
   ? Admin password: [hidden]
   ? Admin name: System Administrator
   ```

4. **Verify creation**
   - Login with the admin credentials at `/login`
   - You should be redirected to `/admin` dashboard

### Method 2: Using the Admin Registration Script

1. **Create a `.env.local` file with admin secret**
   ```env
   ADMIN_REGISTRATION_SECRET=your-secure-admin-registration-secret
   ```

2. **Run the registration script**
   ```bash
   npm run admin:register -- \
     --email admin@example.com \
     --password "SecureAdminPass123!" \
     --name "Admin User" \
     --secret "your-secure-admin-registration-secret"
   ```

### Method 3: Direct Database Update (Production)

1. **Create a regular user account** through the normal registration flow

2. **Connect to your MongoDB database**
   ```bash
   mongosh "your-connection-string"
   ```

3. **Update the user's role**
   ```javascript
   // Find the user
   use your-database-name
   const user = db.user.findOne({ email: "admin@example.com" })
   
   // Create admin role entry
   db.UserRole.insertOne({
     userId: user.id,
     role: "admin",
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

4. **Using Prisma Studio** (Alternative)
   ```bash
   npm run db:studio
   ```
   - Navigate to UserRole table
   - Create new record with userId and role="admin"

## Managing Admin Users

### Creating Additional Admins

Once you have an admin account, you can create more admins through the UI:

1. **Login as admin** at `/login`
2. **Navigate to Users** at `/admin/users`
3. **Find the user** you want to promote
4. **Click on the user** to view details
5. **Go to Permissions tab**
6. **Click "Change Role"** and select "Admin"
7. **Confirm the change**

### Revoking Admin Access

To revoke admin privileges:

1. **Go to user details** in `/admin/users`
2. **Navigate to Permissions tab**
3. **Change role** from "Admin" to "User"
4. **Confirm the change**

**Note**: You cannot revoke your own admin access to prevent lockout.

### Monitoring Admin Activity

All admin actions are logged in the audit system:

1. **View admin audit logs** at `/admin/audit-logs`
2. **Filter by action type**:
   - `role_updated` - Role changes
   - `user_deleted` - User deletions
   - `admin_session_revoked` - Session revocations
3. **Export logs** for compliance or review

## Security Considerations

### Best Practices

1. **Limit Admin Accounts**
   - Only create admin accounts for users who need them
   - Regularly review admin list
   - Remove admin access when no longer needed

2. **Strong Passwords**
   - Enforce strong passwords for admin accounts
   - Recommend using password managers
   - Consider implementing 2FA (not included by default)

3. **Session Security**
   - Admin sessions should timeout after inactivity
   - Regularly review active sessions
   - Revoke suspicious sessions immediately

4. **Audit Logging**
   - Monitor admin actions regularly
   - Set up alerts for sensitive operations
   - Export and archive logs periodically

### Environment Security

1. **Protect Admin Registration Secret**
   ```env
   ADMIN_REGISTRATION_SECRET=use-a-long-random-string
   ```
   - Never commit to version control
   - Rotate periodically
   - Use different values per environment

2. **Database Access**
   - Restrict database access to authorized personnel
   - Use read-only credentials where possible
   - Enable audit logging on database

3. **API Security**
   - Admin endpoints are protected by role checks
   - Rate limiting applies to prevent abuse
   - All actions are logged

## Admin Dashboard Features

### Overview Dashboard (`/admin`)
- Total users count
- Active users (last 24h)
- New users today
- Total sessions
- Failed login attempts
- Recent activity chart

### User Management (`/admin/users`)
- List all users with search
- View user details
- Edit user roles
- Delete users
- View user sessions
- Access user audit logs

### Audit Logs (`/admin/audit-logs`)
- System-wide audit trail
- Filter by:
  - User
  - Action type
  - Date range
  - Success/failure
- Export to CSV
- Real-time updates

### Session Management
- View all active sessions
- Revoke individual sessions
- Bulk revoke sessions
- Session details (IP, device, location)

## Troubleshooting

### Common Issues

#### "Access Denied" when accessing admin pages
- **Check role**: Ensure user has admin role in database
- **Clear cache**: Try logging out and back in
- **Verify session**: Check if session is valid

#### Admin creation script fails
- **Database connection**: Ensure DATABASE_URL is correct
- **User exists**: Check if email is already registered
- **Script permissions**: Run with proper Node.js version

#### Can't change user roles
- **Own account**: You cannot change your own role
- **Permissions**: Ensure you're logged in as admin
- **Database sync**: Check UserRole table exists

### Debugging Steps

1. **Check user role in database**
   ```javascript
   // In MongoDB shell
   db.UserRole.findOne({ userId: "user-id-here" })
   ```

2. **Verify session includes role**
   - Check browser DevTools → Application → Cookies
   - Look for session cookie
   - Decode JWT to see role claim

3. **Review audit logs**
   - Check for failed role update attempts
   - Look for permission denied events

4. **Enable debug logging**
   ```env
   DEBUG=auth:*
   ```

### Getting Help

If you encounter issues:

1. **Check logs**:
   - Application logs
   - Database logs
   - Audit logs

2. **Verify configuration**:
   - Environment variables
   - Database connection
   - Role assignments

3. **Test in isolation**:
   - Try creating admin via different method
   - Test with fresh database
   - Check in development environment

## Advanced Configuration

### Custom Admin Roles

To add more granular admin roles:

1. **Update Prisma schema**
   ```prisma
   model UserRole {
     role String // e.g., "admin", "moderator", "support"
   }
   ```

2. **Modify role checks**
   ```typescript
   const ADMIN_ROLES = ['admin', 'super_admin', 'moderator'];
   ```

3. **Update UI permissions**
   - Add role-specific checks
   - Customize dashboard per role

### Admin Notifications

Set up notifications for admin events:

1. **Email alerts** for:
   - New admin created
   - Admin role revoked
   - Suspicious admin activity

2. **Dashboard notifications** for:
   - Failed login attempts
   - New user registrations
   - System alerts

### Scheduled Admin Tasks

Consider implementing:
- Daily admin activity reports
- Weekly user growth summaries
- Monthly security audits
- Automated inactive user cleanup

## Security Checklist

Before going to production:

- [ ] First admin account created securely
- [ ] Admin registration secret is strong and unique
- [ ] All admin accounts use strong passwords
- [ ] Admin list reviewed and minimal
- [ ] Audit logging enabled and monitored
- [ ] Session timeout configured appropriately
- [ ] Database access restricted
- [ ] Admin notifications configured
- [ ] Backup admin account exists
- [ ] Admin documentation secured