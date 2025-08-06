import { check } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { Options } from 'k6/options';

const errorRate = new Rate('errors');

export const options: Options = {
  stages: [
    { duration: '2m', target: 200 }, // Rapidly scale to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 400 }, // Scale up to 400 users
    { duration: '5m', target: 400 }, // Stay at 400 users
    { duration: '2m', target: 0 }, // Scale down
  ],
  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 2s
    errors: ['rate<0.2'], // Error rate must be below 20%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5176';

export default function () {
  const userId = Math.floor(Math.random() * 10000);
  
  // 1. High-frequency login attempts (rate limiting test)
  const loginRes = http.post(
    `${BASE_URL}/api/auth/signin`,
    JSON.stringify({
      email: `stress${userId}@test.com`,
      password: 'WrongPassword!',
    }),
    { 
      headers: { 'Content-Type': 'application/json' },
      timeout: '10s',
    }
  );

  const isError = loginRes.status >= 400;
  errorRate.add(isError);

  // 2. Password reset bombardment (rate limiting)
  if (Math.random() < 0.3) {
    const resetRes = http.post(
      `${BASE_URL}/api/auth/forget-password`,
      JSON.stringify({
        email: `stress${userId}@test.com`,
        redirectTo: '/reset-password',
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );

    check(resetRes, {
      'password reset handled': (r) => r.status < 500,
    });
  }

  // 3. Concurrent session creation
  if (Math.random() < 0.2) {
    // Try to create many sessions for same user
    for (let i = 0; i < 5; i++) {
      http.post(
        `${BASE_URL}/api/auth/signin`,
        JSON.stringify({
          email: `concurrent@test.com`,
          password: 'Test123!',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 4. Large payload requests (testing input validation)
  if (Math.random() < 0.1) {
    const largePayload = {
      email: 'a'.repeat(1000) + '@test.com',
      password: 'p'.repeat(1000),
      name: 'n'.repeat(10000),
    };

    const largeRes = http.post(
      `${BASE_URL}/api/auth/signup`,
      JSON.stringify(largePayload),
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: '30s',
      }
    );

    check(largeRes, {
      'large payload handled': (r) => r.status === 400 || r.status === 413,
    });
  }

  // 5. Rapid-fire audit log queries
  if (Math.random() < 0.4) {
    const token = 'test-token-' + userId;
    
    for (let i = 0; i < 3; i++) {
      http.get(`${BASE_URL}/api/audit-logs?page=${i}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        timeout: '5s',
      });
    }
  }
}

export function handleSummary(data: any) {
  const errorCount = data.metrics.errors.values.count;
  const totalRequests = data.metrics.http_reqs.values.count;
  const errorPercentage = (errorCount / totalRequests * 100).toFixed(2);

  console.log('\n=== Stress Test Summary ===');
  console.log(`Total Requests: ${totalRequests}`);
  console.log(`Errors: ${errorCount} (${errorPercentage}%)`);
  console.log(`Average Response Time: ${data.metrics.http_req_duration.values.avg.toFixed(0)}ms`);
  console.log(`99th Percentile Response Time: ${data.metrics.http_req_duration.values['p(99)'].toFixed(0)}ms`);

  // Check if system remained stable
  const systemStable = parseFloat(errorPercentage) < 20 && 
                      data.metrics.http_req_duration.values['p(99)'] < 2000;

  console.log(`\nSystem Stability: ${systemStable ? 'PASSED ✓' : 'FAILED ✗'}`);

  return {
    'stress-test-summary.json': JSON.stringify(data, null, 2),
  };
}