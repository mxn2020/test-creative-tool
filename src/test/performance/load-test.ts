import { check } from 'k6';
import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';
import { Options } from 'k6/options';

// Custom metrics
const loginErrorRate = new Rate('login_errors');
const loginDuration = new Trend('login_duration');
const sessionListDuration = new Trend('session_list_duration');
const auditLogDuration = new Trend('audit_log_duration');

export const options: Options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up to 10 users
    { duration: '5m', target: 50 }, // Stay at 50 users
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.1'], // Error rate must be below 10%
    login_errors: ['rate<0.05'], // Login error rate must be below 5%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5176';

export default function () {
  // Test user credentials
  const testUser = {
    email: `user${__VU}@loadtest.com`,
    password: 'LoadTest123!',
    name: `Load Test User ${__VU}`,
  };

  // 1. Register user (only on first iteration)
  if (__ITER === 0) {
    const signupRes = http.post(
      `${BASE_URL}/api/auth/signup`,
      JSON.stringify(testUser),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    check(signupRes, {
      'signup successful': (r) => r.status === 200,
    });
  }

  // 2. Login test
  const loginStart = Date.now();
  const loginRes = http.post(
    `${BASE_URL}/api/auth/signin`,
    JSON.stringify({
      email: testUser.email,
      password: testUser.password,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  loginDuration.add(Date.now() - loginStart);

  const loginSuccess = check(loginRes, {
    'login successful': (r) => r.status === 200,
    'login returns session': (r) => {
      const body = JSON.parse(r.body as string);
      return body.session && body.session.token;
    },
  });

  loginErrorRate.add(!loginSuccess);

  if (!loginSuccess) {
    return; // Skip further tests if login failed
  }

  const authData = JSON.parse(loginRes.body as string);
  const authToken = authData.session.token;
  const authHeaders = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };

  // 3. Get current session
  const sessionRes = http.get(`${BASE_URL}/api/auth/session`, {
    headers: authHeaders,
  });

  check(sessionRes, {
    'session fetch successful': (r) => r.status === 200,
  });

  // 4. List sessions
  const sessionListStart = Date.now();
  const sessionsRes = http.get(`${BASE_URL}/api/auth/list-sessions`, {
    headers: authHeaders,
  });
  sessionListDuration.add(Date.now() - sessionListStart);

  check(sessionsRes, {
    'sessions list successful': (r) => r.status === 200,
    'sessions list returns array': (r) => {
      const body = JSON.parse(r.body as string);
      return Array.isArray(body);
    },
  });

  // 5. Get audit logs (simulating dashboard load)
  const auditLogStart = Date.now();
  const auditRes = http.get(`${BASE_URL}/api/audit-logs`, {
    headers: authHeaders,
  });
  auditLogDuration.add(Date.now() - auditLogStart);

  check(auditRes, {
    'audit logs fetch successful': (r) => r.status === 200,
  });

  // 6. Simulate user activity pattern
  const activities = [
    () => {
      // View dashboard
      http.get(`${BASE_URL}/api/user/stats`, { headers: authHeaders });
    },
    () => {
      // Update profile
      http.put(
        `${BASE_URL}/api/user/profile`,
        JSON.stringify({ name: `Updated ${testUser.name}` }),
        { headers: authHeaders }
      );
    },
    () => {
      // Check sessions
      http.get(`${BASE_URL}/api/auth/list-sessions`, { headers: authHeaders });
    },
  ];

  // Random activity
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];
  randomActivity();

  // 7. Logout (30% chance)
  if (Math.random() < 0.3) {
    const logoutRes = http.post(
      `${BASE_URL}/api/auth/sign-out`,
      null,
      { headers: authHeaders }
    );

    check(logoutRes, {
      'logout successful': (r) => r.status === 200,
    });
  }
}

export function handleSummary(data: any) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'summary.json': JSON.stringify(data),
    'summary.html': htmlReport(data),
  };
}

// Helper to generate text summary
function textSummary(data: any, options: any) {
  const { indent = '', enableColors = false } = options;
  const lines = [];

  lines.push(`${indent}Performance Test Results`);
  lines.push(`${indent}========================`);
  lines.push('');

  // Overall stats
  lines.push(`${indent}Total Requests: ${data.metrics.http_reqs.values.count}`);
  lines.push(`${indent}Failed Requests: ${data.metrics.http_req_failed.values.passes}`);
  lines.push(`${indent}Average Duration: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms`);
  lines.push(`${indent}95th Percentile: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms`);
  lines.push('');

  // Custom metrics
  lines.push(`${indent}Login Performance:`);
  lines.push(`${indent}  Error Rate: ${(data.metrics.login_errors.values.rate * 100).toFixed(2)}%`);
  lines.push(`${indent}  Average Duration: ${data.metrics.login_duration.values.avg.toFixed(2)}ms`);
  lines.push('');

  lines.push(`${indent}Session List Performance:`);
  lines.push(`${indent}  Average Duration: ${data.metrics.session_list_duration.values.avg.toFixed(2)}ms`);
  lines.push('');

  lines.push(`${indent}Audit Log Performance:`);
  lines.push(`${indent}  Average Duration: ${data.metrics.audit_log_duration.values.avg.toFixed(2)}ms`);

  return lines.join('\n');
}

// Helper to generate HTML report
function htmlReport(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Performance Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .metric { margin: 10px 0; padding: 10px; background: #f5f5f5; }
        .pass { color: green; }
        .fail { color: red; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Performance Test Report</h1>
    <div class="metric">
        <h2>Summary</h2>
        <p>Total Requests: ${data.metrics.http_reqs.values.count}</p>
        <p>Failed Requests: ${data.metrics.http_req_failed.values.passes}</p>
        <p>Success Rate: ${((1 - data.metrics.http_req_failed.values.rate) * 100).toFixed(2)}%</p>
    </div>
    
    <div class="metric">
        <h2>Response Times</h2>
        <table>
            <tr>
                <th>Metric</th>
                <th>Value (ms)</th>
            </tr>
            <tr>
                <td>Average</td>
                <td>${data.metrics.http_req_duration.values.avg.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Median</td>
                <td>${data.metrics.http_req_duration.values.med.toFixed(2)}</td>
            </tr>
            <tr>
                <td>95th Percentile</td>
                <td>${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}</td>
            </tr>
            <tr>
                <td>99th Percentile</td>
                <td>${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}</td>
            </tr>
        </table>
    </div>
    
    <div class="metric">
        <h2>Custom Metrics</h2>
        <table>
            <tr>
                <th>Operation</th>
                <th>Average Duration (ms)</th>
                <th>Error Rate</th>
            </tr>
            <tr>
                <td>Login</td>
                <td>${data.metrics.login_duration.values.avg.toFixed(2)}</td>
                <td>${(data.metrics.login_errors.values.rate * 100).toFixed(2)}%</td>
            </tr>
            <tr>
                <td>Session List</td>
                <td>${data.metrics.session_list_duration.values.avg.toFixed(2)}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>Audit Logs</td>
                <td>${data.metrics.audit_log_duration.values.avg.toFixed(2)}</td>
                <td>-</td>
            </tr>
        </table>
    </div>
</body>
</html>
  `;
}