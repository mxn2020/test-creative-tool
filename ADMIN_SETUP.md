# Admin User Setup Guide

This guide explains how to set up admin users in the application.

## Initial Admin Setup

### Method 1: Database Seed (Recommended for Development)

1. Run the database seed command:
   ```bash
   npm run db:seed
   ```

2. This creates a default admin user:
   - Email: `admin@example.com`
   - Password: `admin123`
   - Role: `admin`

3. **Important**: Change the password immediately after first login!

### Method 2: Manual Database Update

1. First, create a regular user account through the registration page

2. Connect to your MongoDB database:
   ```bash
   mongosh "your-connection-string"
   ```

3. Find the user by email:
   ```javascript
   db.userPreference.findOne({ userId: db.user.findOne({ email: "user@example.com" }).id })
   ```

4. Update their role to admin:
   ```javascript
   db.userPreference.updateOne(
     { userId: "the-user-id" },
     { $set: { role: "admin" } }
   )
   ```

### Method 3: Programmatic Setup

Create a setup script `scripts/create-admin.js`:

```javascript
import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/argon2';

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  
  if (existingUser) {
    // Update to admin
    await prisma.userPreference.upsert({
      where: { userId: existingUser.id },
      update: { role: 'admin' },
      create: {
        userId: existingUser.id,
        role: 'admin'
      }
    });
    console.log('Updated existing user to admin:', email);
  } else {
    console.log('User does not exist. Please register first.');
  }
  
  await prisma.$disconnect();
}

createAdmin();
```

## Admin Capabilities

Once a user has admin role, they can:

1. **Access Admin Dashboard** at `/admin`
2. **Manage Users**:
   - View all users
   - Edit user details
   - Change user roles
   - Delete users
3. **View System Statistics**:
   - Total users
   - User growth
   - Activity metrics
4. **Access Audit Logs**:
   - View all system audit logs
   - Filter by user, action, date
   - Export logs

## Security Best Practices

1. **Strong Passwords**: Always use strong, unique passwords for admin accounts
2. **Limited Admin Users**: Only grant admin access to trusted individuals
3. **Regular Audits**: Review admin audit logs regularly
4. **Role Changes**: Document all role changes in your team

## Troubleshooting

### Admin user can't access admin panel
1. Check the userPreference record exists with role='admin'
2. Clear browser cache and cookies
3. Log out and log in again

### Role not updating
1. Ensure you're updating the `userPreference` collection, not the `user` collection
2. Check that the userId matches exactly
3. Verify MongoDB connection permissions

## Production Considerations

1. Never use default passwords in production
2. Consider implementing 2FA for admin accounts
3. Set up alerts for admin actions
4. Regularly rotate admin credentials
5. Implement IP allowlisting for admin access if possible