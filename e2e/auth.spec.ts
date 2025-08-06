import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies and localStorage before each test
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });

  test('should register a new user', async ({ page }) => {
    await page.goto('/register');

    // Fill registration form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'SecurePass123!');

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome back, Test User!')).toBeVisible();
  });

  test('should login with existing user', async ({ page }) => {
    const email = `test${Date.now()}@example.com`;
    const password = 'SecurePass123!';

    // First register
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');

    // Logout
    await page.click('button:has-text("Sign out")');
    await expect(page).toHaveURL('/');

    // Login
    await page.goto('/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Should be logged in
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome back, Test User!')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'nonexistent@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('should handle forgot password flow', async ({ page }) => {
    await page.goto('/login');
    await page.click('a:has-text("Forgot password?")');

    await expect(page).toHaveURL('/forgot-password');

    // Submit forgot password form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');

    // Should show success message
    await expect(page.locator('text=Check your email')).toBeVisible();
  });

  test('should enforce password requirements on registration', async ({ page }) => {
    await page.goto('/register');

    // Fill form with weak password
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'weak');

    // Submit should fail client-side validation
    await page.click('button[type="submit"]');

    // Password field should show validation error
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('should persist session across page reloads', async ({ page }) => {
    const email = `test${Date.now()}@example.com`;

    // Register and login
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');

    // Reload page
    await page.reload();

    // Should still be logged in
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome back, Test User!')).toBeVisible();
  });

  test('should redirect to login when accessing protected routes', async ({ page }) => {
    // Try to access dashboard without login
    await page.goto('/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test('should handle social login buttons', async ({ page }) => {
    await page.goto('/login');

    // Check social login buttons are present
    await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
    await expect(page.locator('button:has-text("Continue with GitHub")')).toBeVisible();

    // Click Google button (will redirect to Google OAuth)
    await page.click('button:has-text("Continue with Google")');
    
    // Should redirect to Google OAuth (check URL contains google)
    await expect(page.url()).toContain('accounts.google.com');
  });

  test('should show password strength indicator', async ({ page }) => {
    await page.goto('/register');

    const passwordInput = page.locator('input[name="password"]');
    
    // Initially all checks should be gray
    const lengthCheck = page.locator('text=At least 8 characters');
    await expect(lengthCheck).toHaveClass(/text-gray-500/);

    // Type a strong password
    await passwordInput.fill('StrongP@ss123');

    // All checks should turn green
    await expect(page.locator('text=At least 8 characters')).toHaveClass(/text-green-600/);
    await expect(page.locator('text=One uppercase letter')).toHaveClass(/text-green-600/);
    await expect(page.locator('text=One lowercase letter')).toHaveClass(/text-green-600/);
    await expect(page.locator('text=One number')).toHaveClass(/text-green-600/);
    await expect(page.locator('text=One special character')).toHaveClass(/text-green-600/);
  });

  test('should handle logout correctly', async ({ page }) => {
    const email = `test${Date.now()}@example.com`;

    // Register and login
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');

    // Logout
    await page.click('button:has-text("Sign out")');

    // Should redirect to home
    await expect(page).toHaveURL('/');

    // Try to access dashboard
    await page.goto('/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });
});