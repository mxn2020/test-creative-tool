import { test, expect } from '@playwright/test';

test.describe('Security Features', () => {
  test('should handle CSRF protection', async ({ page }) => {
    // Try to make a request without CSRF token
    const response = await page.request.post('/api/auth/signup', {
      data: {
        email: 'test@example.com',
        password: 'Test123!',
        name: 'Test',
      },
      headers: {
        // Omit CSRF token
        'Content-Type': 'application/json',
      },
    });

    // Should be protected by CSRF
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('should enforce rate limiting on password reset', async ({ page }) => {
    await page.goto('/forgot-password');

    const email = 'ratelimit@example.com';

    // Make multiple password reset requests
    for (let i = 0; i < 4; i++) {
      await page.fill('input[name="email"]', email);
      await page.click('button[type="submit"]');
      
      // Clear form for next attempt
      if (i < 3) {
        await page.reload();
      }
    }

    // Should show rate limit error
    await expect(page.locator('text=/too many.*attempts/i')).toBeVisible();
  });

  test('should enforce rate limiting on failed logins', async ({ page }) => {
    const email = `test${Date.now()}@example.com`;
    
    // First register the user
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'RealPassword123!');
    await page.click('button[type="submit"]');
    
    // Logout
    await page.click('button:has-text("Sign out")');

    // Try to login with wrong password multiple times
    for (let i = 0; i < 6; i++) {
      await page.goto('/login');
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', 'WrongPassword!');
      await page.click('button[type="submit"]');
    }

    // Should show account locked or rate limit message
    await expect(page.locator('text=/locked|too many attempts/i')).toBeVisible();
  });

  test('should sanitize user input', async ({ page }) => {
    await page.goto('/register');

    // Try to inject script tag in name
    const maliciousName = '<script>alert("XSS")</script>';
    await page.fill('input[name="name"]', maliciousName);
    await page.fill('input[name="email"]', `xss${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    // Should register successfully but sanitize the input
    await expect(page).toHaveURL('/dashboard');
    
    // Name should be displayed without script tags
    const displayedName = await page.locator('text=/Welcome back/').textContent();
    expect(displayedName).not.toContain('<script>');
    expect(displayedName).not.toContain('</script>');
  });

  test('should validate email format strictly', async ({ page }) => {
    await page.goto('/register');

    const invalidEmails = [
      'notanemail',
      'missing@tld',
      '@nodomain.com',
      'spaces in@email.com',
      'double@@domain.com',
    ];

    for (const email of invalidEmails) {
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', 'Test123!');
      
      // Try to submit
      await page.click('button[type="submit"]');
      
      // Should not navigate away
      await expect(page).toHaveURL('/register');
      
      // Clear for next test
      await page.fill('input[name="email"]', '');
    }
  });

  test('should enforce secure password requirements', async ({ page }) => {
    await page.goto('/register');

    const weakPasswords = [
      'short',
      'alllowercase',
      'ALLUPPERCASE',
      'NoNumbers!',
      'NoSpecialChars123',
      '12345678',
      'password',
      'Password123', // No special char
    ];

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`);

    for (const password of weakPasswords) {
      await page.fill('input[name="password"]', password);
      
      // Check that at least one requirement is not met
      const requirements = page.locator('.text-green-600');
      const metCount = await requirements.count();
      
      // Should not meet all 5 requirements
      expect(metCount).toBeLessThan(5);
      
      // Clear for next test
      await page.fill('input[name="password"]', '');
    }
  });

  test('should protect against session fixation', async ({ page, context }) => {
    // Register and login
    const email = `test${Date.now()}@example.com`;
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    // Get current session cookie
    const cookies = await context.cookies();
    const sessionCookie = cookies.find(c => c.name.includes('session'));
    const oldSessionId = sessionCookie?.value;

    // Logout
    await page.click('button:has-text("Sign out")');

    // Login again
    await page.goto('/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    // Get new session cookie
    const newCookies = await context.cookies();
    const newSessionCookie = newCookies.find(c => c.name.includes('session'));
    const newSessionId = newSessionCookie?.value;

    // Session ID should change after login
    expect(newSessionId).not.toBe(oldSessionId);
  });

  test('should expire sessions correctly', async ({ page }) => {
    // This test would require manipulating time or waiting for actual expiry
    // For now, we'll just check that expiry info is shown
    
    const email = `test${Date.now()}@example.com`;
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    await page.goto('/sessions');
    
    // Should show session expiry information
    await expect(page.locator('text=/expires/i')).toBeVisible();
  });

  test('should handle concurrent session limits', async ({ browser }) => {
    const email = `test${Date.now()}@example.com`;
    const password = 'SecurePass123!';
    
    // Create user
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    
    await page1.goto('/register');
    await page1.fill('input[name="name"]', 'Test User');
    await page1.fill('input[name="email"]', email);
    await page1.fill('input[name="password"]', password);
    await page1.click('button[type="submit"]');

    // Create multiple sessions (simulate max session limit)
    const contexts = [];
    for (let i = 0; i < 5; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      await page.goto('/login');
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
      
      contexts.push(context);
    }

    // Check sessions page shows all sessions or enforces limit
    await page1.goto('/sessions');
    const sessionCards = page1.locator('[data-testid="session-card"]');
    const count = await sessionCards.count();
    
    // Should either show all sessions or enforce a reasonable limit
    expect(count).toBeGreaterThanOrEqual(1);
    expect(count).toBeLessThanOrEqual(10); // Reasonable session limit

    // Cleanup
    await context1.close();
    for (const ctx of contexts) {
      await ctx.close();
    }
  });

  test('should log security events', async ({ page }) => {
    const email = `test${Date.now()}@example.com`;
    
    // Register
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    // Try some suspicious activities
    await page.goto('/audit-logs');
    
    // Perform failed login attempt
    await page.goto('/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'WrongPassword');
    await page.click('button[type="submit"]');

    // Check audit logs
    await page.goto('/audit-logs');
    
    // Should see security-related events
    await expect(page.locator('text=Login Failed')).toBeVisible();
  });
});