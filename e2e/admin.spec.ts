import { test, expect } from '@playwright/test';

test.describe('Admin Features', () => {
  let adminEmail: string;
  let adminPassword: string;
  let userEmail: string;
  let userPassword: string;

  test.beforeAll(async ({ request }) => {
    // Create admin and regular user via API
    adminEmail = `admin${Date.now()}@example.com`;
    adminPassword = 'AdminPass123!';
    userEmail = `user${Date.now()}@example.com`;
    userPassword = 'UserPass123!';

    // Register admin
    await request.post('/api/auth/signup', {
      data: {
        email: adminEmail,
        password: adminPassword,
        name: 'Admin User',
      },
    });

    // Register regular user
    await request.post('/api/auth/signup', {
      data: {
        email: userEmail,
        password: userPassword,
        name: 'Regular User',
      },
    });

    // Note: In a real scenario, you'd need to update the admin user's role
    // This might require direct database access or an API endpoint
  });

  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/login');
    await page.fill('input[name="email"]', adminEmail);
    await page.fill('input[name="password"]', adminPassword);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/admin');
  });

  test('admin should see admin dashboard', async ({ page }) => {
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible();
    
    // Check for admin-specific elements
    await expect(page.locator('text=Total Users')).toBeVisible();
    await expect(page.locator('text=Active Sessions')).toBeVisible();
    await expect(page.locator('text=Failed Logins')).toBeVisible();
    await expect(page.locator('text=Recent Activity')).toBeVisible();
  });

  test('admin should view users list', async ({ page }) => {
    await page.click('a:has-text("Users")');
    await expect(page).toHaveURL('/admin-users');

    // Should see users table
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
    await expect(page.locator('th:has-text("Email")')).toBeVisible();
    await expect(page.locator('th:has-text("Role")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();

    // Should see at least two users (admin and regular user)
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(2, { timeout: 10000 });
  });

  test('admin should search users', async ({ page }) => {
    await page.goto('/admin-users');

    // Search for user
    await page.fill('input[placeholder*="Search"]', userEmail);

    // Should filter results
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText(userEmail);
  });

  test('admin should view user details', async ({ page }) => {
    await page.goto('/admin-users');

    // Click on a user row
    await page.click(`tr:has-text("${userEmail}")`);

    // Should navigate to user details
    expect(page.url()).toContain('/admin-users/');

    // Check tabs are visible
    await expect(page.locator('button[role="tab"]:has-text("Details")')).toBeVisible();
    await expect(page.locator('button[role="tab"]:has-text("Activity")')).toBeVisible();
    await expect(page.locator('button[role="tab"]:has-text("Sessions")')).toBeVisible();
    await expect(page.locator('button[role="tab"]:has-text("Permissions")')).toBeVisible();
  });

  test('admin should update user role', async ({ page }) => {
    await page.goto('/admin-users');
    await page.click(`tr:has-text("${userEmail}")`);

    // Go to permissions tab
    await page.click('button[role="tab"]:has-text("Permissions")');

    // Change role
    await page.click('button:has-text("Change Role")');
    await page.click('button:has-text("Make Admin")');

    // Confirm action
    await page.click('button:has-text("Confirm")');

    // Should show success message
    await expect(page.locator('text=Role updated successfully')).toBeVisible();
  });

  test('admin should view audit logs', async ({ page }) => {
    await page.click('a:has-text("Audit Logs")');
    await expect(page).toHaveURL('/admin-audit-logs');

    // Should see audit log entries
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('th:has-text("Action")')).toBeVisible();
    await expect(page.locator('th:has-text("User")')).toBeVisible();
    await expect(page.locator('th:has-text("Time")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();
  });

  test('admin should filter audit logs', async ({ page }) => {
    await page.goto('/admin-audit-logs');

    // Filter by action
    await page.selectOption('select[name="action"]', 'login');

    // Should update results
    const rows = page.locator('tbody tr');
    const count = await rows.count();
    
    for (let i = 0; i < count; i++) {
      const text = await rows.nth(i).textContent();
      expect(text?.toLowerCase()).toContain('login');
    }
  });

  test('admin should export audit logs', async ({ page }) => {
    await page.goto('/admin-audit-logs');

    // Start download promise before clicking
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Export CSV")');
    
    const download = await downloadPromise;
    
    // Verify download
    expect(download.suggestedFilename()).toContain('audit-logs');
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('admin should manage sessions', async ({ page }) => {
    await page.goto('/admin-users');
    await page.click(`tr:has-text("${userEmail}")`);

    // Go to sessions tab
    await page.click('button[role="tab"]:has-text("Sessions")');

    // Should see session information
    await expect(page.locator('text=Active Sessions')).toBeVisible();
    
    // If user has sessions, revoke button should be visible
    const revokeButtons = page.locator('button:has-text("Revoke")');
    if (await revokeButtons.count() > 0) {
      await revokeButtons.first().click();
      await expect(page.locator('text=Session revoked')).toBeVisible();
    }
  });

  test('admin should not delete themselves', async ({ page }) => {
    await page.goto('/admin-users');
    await page.click(`tr:has-text("${adminEmail}")`);

    // Delete button should be disabled for own account
    const deleteButton = page.locator('button:has-text("Delete User")');
    await expect(deleteButton).toBeDisabled();
  });

  test('regular user should not access admin pages', async ({ page }) => {
    // Logout admin
    await page.click('button:has-text("Sign out")');

    // Login as regular user
    await page.goto('/login');
    await page.fill('input[name="email"]', userEmail);
    await page.fill('input[name="password"]', userPassword);
    await page.click('button[type="submit"]');

    // Try to access admin dashboard
    await page.goto('/admin');

    // Should redirect to user dashboard or show forbidden
    await expect(page).not.toHaveURL('/admin');
  });

  test('admin dashboard should auto-refresh stats', async ({ page }) => {
    await page.goto('/admin');

    // Get initial user count
    const userCountElement = page.locator('[data-testid="total-users-count"]');
    const initialCount = await userCountElement.textContent();

    // Create a new user in another tab/request
    const newUserEmail = `newuser${Date.now()}@example.com`;
    await page.request.post('/api/auth/signup', {
      data: {
        email: newUserEmail,
        password: 'NewUser123!',
        name: 'New User',
      },
    });

    // Wait for auto-refresh (usually 30 seconds, but we'll check after a shorter time)
    await page.waitForTimeout(5000);

    // Count should have increased
    const newCount = await userCountElement.textContent();
    expect(parseInt(newCount || '0')).toBeGreaterThan(parseInt(initialCount || '0'));
  });
});