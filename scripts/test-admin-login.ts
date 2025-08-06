// scripts/test-admin-login.ts
// Test admin login directly with Better Auth
// Run with: npx tsx scripts/test-admin-login.ts

import { auth } from '../src/lib/auth';

async function testAdminLogin() {
  console.log('🔍 Testing admin login...\n');

  const email = 'admin@example.com';
  const password = 'admin123456';

  console.log('📧 Email:', email);
  console.log('🔑 Password:', password);
  console.log('');

  try {
    // Create a mock request for Better Auth
    const url = new URL('http://localhost:8889/api/auth/sign-in/email');
    const body = JSON.stringify({
      email,
      password,
      callbackURL: 'http://localhost:8889/dashboard',
    });

    const request = new Request(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8889',
      },
      body,
    });

    console.log('📤 Sending request to Better Auth...');
    const response = await auth.handler(request);
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseBody = await response.text();
    console.log('📥 Response body:', responseBody);

    if (response.status === 200) {
      console.log('\n✅ Login successful!');
      const data = JSON.parse(responseBody);
      console.log('User:', data.user);
      console.log('Session:', data.session);
    } else {
      console.log('\n❌ Login failed!');
      try {
        const error = JSON.parse(responseBody);
        console.log('Error:', error);
      } catch {
        console.log('Raw response:', responseBody);
      }
    }

  } catch (error: any) {
    console.error('\n💥 Test failed:', error.message);
    console.error(error.stack);
  }

  process.exit(0);
}

testAdminLogin();