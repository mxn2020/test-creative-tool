import { test, expect } from '@playwright/test';

test.describe('Session Management', () => {
  let userEmail: string;
  let userPassword: string;

  test.beforeEach(async ({ page }) => {
    // Create and login user
    userEmail = `test${Date.now()}@example.com`;
    userPassword = 'SecurePass123!';

    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', userEmail);
    await page.fill('input[name="password"]', userPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
  });

  test('should view active sessions', async ({ page }) => {
    await page.click('a:has-text("View Sessions")');
    await expect(page).toHaveURL('/sessions');

    // Should see active sessions page
    await expect(page.locator('h1:has-text("Active Sessions")')).toBeVisible();
    
    // Should see current session
    await expect(page.locator('text=Current session')).toBeVisible();
    
    // Should see device info
    await expect(page.locator('text=Chrome')).toBeVisible();
  });

  test('should create multiple sessions', async ({ page, context }) => {
    // Create second session in new browser context
    const page2 = await context.newPage();
    await page2.goto('/login');
    await page2.fill('input[name="email"]', userEmail);
    await page2.fill('input[name="password"]', userPassword);
    await page2.click('button[type="submit"]');
    await expect(page2).toHaveURL('/dashboard');

    // Go back to first page and check sessions
    await page.goto('/sessions');
    
    // Should see multiple sessions
    const sessionCards = page.locator('[data-testid="session-card"]');
    await expect(sessionCards).toHaveCount(2, { timeout: 10000 });

    await page2.close();
  });

  test('should revoke other session', async ({ page, context }) => {
    // Create second session
    const page2 = await context.newPage();
    await page2.goto('/login');
    await page2.fill('input[name="email"]', userEmail);
    await page2.fill('input[name="password"]', userPassword);
    await page2.click('button[type="submit"]');
    await expect(page2).toHaveURL('/dashboard');

    // Go to sessions page
    await page.goto('/sessions');
    
    // Find non-current session and revoke it
    const otherSessionRevoke = page.locator('[data-testid="session-card"]:not(:has-text("Current session")) button:has-text("Revoke")');
    await otherSessionRevoke.click();

    // Should show success message
    await expect(page.locator('text=Session revoked successfully')).toBeVisible();

    // Second page should be logged out
    await page2.reload();
    await expect(page2).toHaveURL('/login');

    await page2.close();
  });

  test('should revoke all other sessions', async ({ page, context }) => {
    // Create multiple sessions
    for (let i = 0; i < 3; i++) {
      const newPage = await context.newPage();
      await newPage.goto('/login');
      await newPage.fill('input[name="email"]', userEmail);
      await newPage.fill('input[name="password"]', userPassword);
      await newPage.click('button[type="submit"]');
      await newPage.close();
    }

    // Go to sessions page
    await page.goto('/sessions');
    
    // Should see multiple sessions
    const sessionCards = page.locator('[data-testid="session-card"]');
    await expect(sessionCards).toHaveCount(4, { timeout: 10000 });

    // Revoke all other sessions
    await page.click('button:has-text("Revoke all other sessions")');
    
    // Confirm action
    await page.click('button:has-text("Confirm")');

    // Should show success message
    await expect(page.locator('text=All other sessions revoked')).toBeVisible();

    // Should only see current session
    await expect(sessionCards).toHaveCount(1);
  });

  test('should show session location warning', async ({ page }) => {
    // Note: This test assumes the app detects unusual locations
    // In a real scenario, you might need to mock IP addresses
    
    await page.goto('/sessions');
    
    // Look for any security warnings
    const warnings = page.locator('[data-testid="security-warning"]');
    
    // If warnings exist, they should be visible
    if (await warnings.count() > 0) {
      await expect(warnings.first()).toBeVisible();
      await expect(warnings.first()).toContainText(/unusual location|different device/i);
    }
  });

  test('should show session expiry time', async ({ page }) => {
    await page.goto('/sessions');
    
    // Should show expiry information
    await expect(page.locator('text=/Expires in/i')).toBeVisible();
  });

  test('should handle session pagination', async ({ page, context }) => {
    // Create many sessions (more than default page size)
    for (let i = 0; i < 12; i++) {
      const newPage = await context.newPage();
      await newPage.goto('/login');
      await newPage.fill('input[name="email"]', userEmail);
      await newPage.fill('input[name="password"]', userPassword);
      await newPage.click('button[type="submit"]');
      await newPage.close();
    }

    await page.goto('/sessions');
    
    // Should see pagination controls if more than 10 sessions
    const sessionCards = page.locator('[data-testid="session-card"]');
    const count = await sessionCards.count();
    
    if (count === 10) {
      // Should have pagination
      await expect(page.locator('button:has-text("Next")')).toBeVisible();
      
      // Go to next page
      await page.click('button:has-text("Next")');
      
      // Should see remaining sessions
      await expect(sessionCards.first()).toBeVisible();
    }
  });

  test('should not allow revoking current session', async ({ page }) => {
    await page.goto('/sessions');
    
    // Current session card should not have revoke button
    const currentSessionCard = page.locator('[data-testid="session-card"]:has-text("Current session")');
    const revokeButton = currentSessionCard.locator('button:has-text("Revoke")');
    
    await expect(revokeButton).toHaveCount(0);
  });

  test('should refresh sessions list after revocation', async ({ page, context }) => {
    // Create second session
    const page2 = await context.newPage();
    await page2.goto('/login');
    await page2.fill('input[name="email"]', userEmail);
    await page2.fill('input[name="password"]', userPassword);
    await page2.click('button[type="submit"]');

    // Go to sessions page
    await page.goto('/sessions');
    
    // Count initial sessions
    let sessionCards = page.locator('[data-testid="session-card"]');
    const initialCount = await sessionCards.count();
    expect(initialCount).toBe(2);

    // Revoke other session
    const otherSessionRevoke = page.locator('[data-testid="session-card"]:not(:has-text("Current session")) button:has-text("Revoke")');
    await otherSessionRevoke.click();

    // Wait for list to refresh
    await page.waitForTimeout(1000);

    // Should now see only one session
    sessionCards = page.locator('[data-testid="session-card"]');
    await expect(sessionCards).toHaveCount(1);

    await page2.close();
  });

  test('should show device icons based on user agent', async ({ page, browserName }) => {
    await page.goto('/sessions');
    
    // Should show appropriate device icon
    const sessionCard = page.locator('[data-testid="session-card"]:has-text("Current session")');
    
    // Check for device type indicator
    if (browserName === 'chromium') {
      await expect(sessionCard).toContainText('Chrome');
    } else if (browserName === 'firefox') {
      await expect(sessionCard).toContainText('Firefox');
    } else if (browserName === 'webkit') {
      await expect(sessionCard).toContainText('Safari');
    }
  });
});