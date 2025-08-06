// scripts/create-admin.ts
// Create admin account using Better Auth's registration API
// Run with: npx tsx scripts/create-admin.ts

import { auth } from '../src/lib/auth';
import { MongoClient } from 'mongodb';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123456';
const ADMIN_NAME = 'Admin User';

async function createAdmin() {
  console.log('Creating admin account using Better Auth...\n');
  
  try {
    // First, clean up any existing admin
    const client = new MongoClient('mongodb://localhost:27017/geenius-template');
    await client.connect();
    const db = client.db();
    
    console.log('1. Cleaning up existing admin accounts...');
    await db.collection('user').deleteMany({ email: ADMIN_EMAIL });
    await db.collection('account').deleteMany({ accountId: ADMIN_EMAIL });
    console.log('   ✅ Cleanup complete');
    
    // Register via Better Auth API
    console.log('\n2. Registering admin user...');
    const signupUrl = new URL('http://localhost:8889/api/auth/sign-up/email');
    const signupBody = JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    });

    const signupRequest = new Request(signupUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8889',
      },
      body: signupBody,
    });

    const signupResponse = await auth.handler(signupRequest);
    const responseData = await signupResponse.text();
    
    if (signupResponse.status !== 200) {
      console.error('   ❌ Registration failed:', signupResponse.status);
      console.error('   Response:', responseData);
      return;
    }
    
    console.log('   ✅ Admin user registered');
    
    // Get the user ID
    const user = await db.collection('user').findOne({ email: ADMIN_EMAIL });
    if (!user) {
      console.error('   ❌ User not found after registration');
      return;
    }
    
    const userId = user.id || user._id.toString();
    console.log('   User ID:', userId);
    
    // Set admin role
    console.log('\n3. Setting admin role...');
    await db.collection('UserPreference').updateOne(
      { userId },
      { 
        $set: { 
          role: 'admin',
          updatedAt: new Date()
        },
        $setOnInsert: {
          theme: 'light',
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC',
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
    
    console.log('   ✅ Admin role set');
    
    // Verify the account
    console.log('\n4. Verifying admin login...');
    const signinUrl = new URL('http://localhost:8889/api/auth/sign-in/email');
    const signinBody = JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const signinRequest = new Request(signinUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8889',
      },
      body: signinBody,
    });

    const signinResponse = await auth.handler(signinRequest);
    
    if (signinResponse.status === 200) {
      console.log('   ✅ Admin login verified');
    } else {
      console.log('   ⚠️  Admin login test failed:', signinResponse.status);
    }
    
    await client.close();
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin account created successfully!');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error: any) {
    console.error('Error:', error.message);
    console.error(error.stack);
  }
}

createAdmin();