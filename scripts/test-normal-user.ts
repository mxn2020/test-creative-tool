// scripts/test-normal-user.ts
// Test creating and logging in a normal user
// Run with: npx tsx scripts/test-normal-user.ts

import { auth } from '../src/lib/auth';

async function testNormalUser() {
  console.log('🧪 Testing normal user registration and login...\n');

  const email = 'test@example.com';
  const password = 'test123456';
  const name = 'Test User';

  try {
    // First, try to sign up
    console.log('1. Attempting to register new user...');
    const signupUrl = new URL('http://localhost:8889/api/auth/sign-up/email');
    const signupBody = JSON.stringify({
      email,
      password,
      name,
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
    console.log('   Registration status:', signupResponse.status);
    
    const signupData = await signupResponse.text();
    if (signupResponse.status === 200) {
      console.log('   ✅ Registration successful');
    } else {
      console.log('   Registration response:', signupData);
    }

    // Now try to sign in
    console.log('\n2. Attempting to sign in...');
    const signinUrl = new URL('http://localhost:8889/api/auth/sign-in/email');
    const signinBody = JSON.stringify({
      email,
      password,
      callbackURL: 'http://localhost:8889/dashboard',
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
    console.log('   Sign in status:', signinResponse.status);
    
    const signinData = await signinResponse.text();
    if (signinResponse.status === 200) {
      console.log('   ✅ Sign in successful');
      const data = JSON.parse(signinData);
      console.log('   User:', data.user?.email);
    } else {
      console.log('   Sign in response:', signinData);
    }

    // Test admin login again for comparison
    console.log('\n3. Testing admin login for comparison...');
    const adminUrl = new URL('http://localhost:8889/api/auth/sign-in/email');
    const adminBody = JSON.stringify({
      email: 'admin@example.com',
      password: 'admin123456',
      callbackURL: 'http://localhost:8889/dashboard',
    });

    const adminRequest = new Request(adminUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8889',
      },
      body: adminBody,
    });

    const adminResponse = await auth.handler(adminRequest);
    console.log('   Admin sign in status:', adminResponse.status);
    
    const adminData = await adminResponse.text();
    if (adminResponse.status === 200) {
      console.log('   ✅ Admin sign in successful');
    } else {
      console.log('   Admin sign in response:', adminData);
    }

  } catch (error: any) {
    console.error('\n💥 Test failed:', error.message);
    console.error(error.stack);
  }

  process.exit(0);
}

testNormalUser();