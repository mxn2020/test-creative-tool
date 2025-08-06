// scripts/register-admin.ts
// Run with: npx tsx scripts/register-admin.ts

import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configuration
const API_URL = process.env.BETTER_AUTH_URL || 'http://localhost:8889';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User';

async function registerAdmin() {
  console.log('🚀 Registering admin account via API...');
  console.log('API URL:', API_URL);
  console.log('Email:', ADMIN_EMAIL);
  console.log('Name:', ADMIN_NAME);

  try {
    // Step 1: Register the user via Better Auth API
    console.log('\n📝 Registering user...');
    const registerResponse = await fetch(`${API_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_NAME,
      }),
    });

    const registerResult = await registerResponse.json();

    if (!registerResponse.ok) {
      if (registerResult.error?.code === 'USER_ALREADY_EXISTS') {
        console.log('⚠️  User already exists, attempting to sign in...');
        
        // Try to sign in to get the user ID
        const signInResponse = await fetch(`${API_URL}/api/auth/sign-in/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
          }),
        });

        const signInResult = await signInResponse.json();
        
        if (!signInResponse.ok) {
          throw new Error(`Sign in failed: ${JSON.stringify(signInResult)}`);
        }

        if (signInResult.user?.id) {
          await grantAdminRole(signInResult.user.id);
        } else {
          throw new Error('Could not get user ID from sign in response');
        }
        return;
      }
      
      throw new Error(`Registration failed: ${JSON.stringify(registerResult)}`);
    }

    console.log('✅ User registered successfully');

    // Step 2: Grant admin role
    if (registerResult.user?.id) {
      await grantAdminRole(registerResult.user.id);
    } else {
      console.warn('⚠️  Could not get user ID from registration response');
      console.log('Response:', registerResult);
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function grantAdminRole(userId: string) {
  console.log('\n🔑 Granting admin role...');
  console.log('User ID:', userId);

  try {
    // Create or update user preferences with admin role
    const userPref = await prisma.userPreference.upsert({
      where: { userId },
      update: { role: 'admin' },
      create: {
        userId,
        role: 'admin',
        theme: 'light',
        emailNotifications: true,
        language: 'en',
        timezone: 'UTC',
      },
    });

    console.log('✅ Admin role granted successfully');

    // Create audit log entry
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'admin_account_created',
        details: { 
          email: ADMIN_EMAIL,
          createdBy: 'api_script',
        },
        success: true,
      },
    });

    console.log('✅ Audit log entry created');

    console.log('\n🎉 Admin account setup complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('User ID:', userId);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYou can now log in at:', `${API_URL}/login`);

  } catch (error) {
    console.error('❌ Error granting admin role:', error);
    throw error;
  }
}

// Show usage if help flag is provided
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Admin Registration Script (API Version)
======================================

This script registers an admin account using the Better Auth API.
This method works in both development and production environments.

Usage:
  npx tsx scripts/register-admin.ts

Environment Variables (optional):
  BETTER_AUTH_URL - API URL (default: http://localhost:8889)
  ADMIN_EMAIL     - Email for the admin account (default: admin@example.com)
  ADMIN_PASSWORD  - Password for the admin account (default: admin123456)
  ADMIN_NAME      - Name for the admin account (default: Admin User)

Examples:
  # Create with defaults (local development)
  npx tsx scripts/register-admin.ts

  # Create for production
  BETTER_AUTH_URL=https://myapp.netlify.app ADMIN_EMAIL=admin@myapp.com npx tsx scripts/register-admin.ts

Note: Make sure the API server is running before executing this script.
`);
  process.exit(0);
}

// Check if we need to install node-fetch
import { execSync } from 'child_process';
try {
  require.resolve('node-fetch');
} catch (e) {
  console.log('Installing node-fetch...');
  execSync('npm install --no-save node-fetch@2', { stdio: 'inherit' });
}

registerAdmin();