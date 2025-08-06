// scripts/test-audit-api.ts
// Use the global fetch (available in Node.js 18+)

const API_URL = process.env.VITE_API_URL || 'http://localhost:8889';
const ADMIN_USER_ID = '688dc486a823dd5e2720760b';

async function testAuditAPI() {
  console.log('Testing audit logs API...\n');
  
  // Test 1: Get all audit logs for admin user
  console.log('Test 1: Fetching audit logs for admin user');
  try {
    const response = await fetch(`${API_URL}/api/admin-audit-logs?userId=${ADMIN_USER_ID}&limit=10`, {
      headers: {
        'Content-Type': 'application/json',
        // Note: In a real scenario, you'd need proper authentication headers
      }
    });
    
    if (!response.ok) {
      console.error(`API returned status ${response.status}`);
      const text = await response.text();
      console.error('Response:', text);
      return;
    }
    
    const data = await response.json();
    console.log(`Found ${data.logs.length} logs`);
    console.log(`Total count: ${data.pagination.totalCount}`);
    console.log(`Pages: ${data.pagination.totalPages}`);
    
    // Show first few logs
    console.log('\nFirst few logs:');
    data.logs.slice(0, 3).forEach((log: any) => {
      console.log(`- ${log.action} at ${new Date(log.createdAt).toLocaleString()}`);
      if (log.details) {
        console.log(`  Details: ${JSON.stringify(log.details)}`);
      }
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
  }
  
  // Test 2: Filter by action
  console.log('\n\nTest 2: Filtering by action type (login)');
  try {
    const response = await fetch(`${API_URL}/api/admin-audit-logs?userId=${ADMIN_USER_ID}&action=login`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`Found ${data.pagination.totalCount} login events`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Test 3: Test pagination
  console.log('\n\nTest 3: Testing pagination (page 2)');
  try {
    const response = await fetch(`${API_URL}/api/admin-audit-logs?userId=${ADMIN_USER_ID}&page=2&limit=20`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`Page 2 of ${data.pagination.totalPages}, showing ${data.logs.length} logs`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the test
testAuditAPI().catch(console.error);