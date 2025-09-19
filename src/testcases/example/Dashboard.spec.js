// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../../pages/LoginPage');
const DashboardPage = require('../../../pages/DashboardPage');
const testData = require('../../../testdata/testData');
const TestUtils = require('../../../utils/testUtils');

test.describe('Dashboard Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await TestUtils.clearBrowserData(page);
  });

  test('Dashboard Loads After Successful Login', async ({ page }) => {
    // Perform login
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    // Wait for dashboard to load
    await dashboardPage.waitForDashboardLoad();
    
    // Verify dashboard elements
    expect(await dashboardPage.verifySuccessfulLogin()).toBeTruthy();
  });

  test('EMPSD Heading is Visible and Correct', async ({ page }) => {
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    await dashboardPage.waitForDashboardLoad();
    
    // Verify EMPSD heading
    expect(await dashboardPage.isEMPSDHeadingVisible()).toBeTruthy();
    
    const headingText = await dashboardPage.getEMPSDHeadingText();
    expect(headingText).toContain(testData.expectedText.dashboardHeading);
  });

  test('Dashboard Navigation Elements', async ({ page }) => {
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    await dashboardPage.waitForDashboardLoad();
    
    // Check navigation elements
    expect(await dashboardPage.isNavigationVisible()).toBeTruthy();
    expect(await dashboardPage.isMainContentVisible()).toBeTruthy();
  });

  test('Page Title Verification', async ({ page }) => {
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    await dashboardPage.waitForDashboardLoad();
    
    // Verify page title
    const pageTitle = await dashboardPage.getPageTitle();
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.length).toBeGreaterThan(0);
  });

  test('Dashboard Responsive Layout', async ({ page }) => {
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    await dashboardPage.waitForDashboardLoad();
    
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 1280, height: 720 },  // Laptop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 667 }    // Mobile
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      
      // Verify key elements are still visible
      expect(await dashboardPage.isEMPSDHeadingVisible()).toBeTruthy();
      expect(await dashboardPage.isMainContentVisible()).toBeTruthy();
    }
  });

  test('Dashboard Performance Check', async ({ page }) => {
    const startTime = Date.now();
    
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    await dashboardPage.waitForDashboardLoad();
    
    const loadTime = Date.now() - startTime;
    
    // Verify dashboard loaded within reasonable time (10 seconds)
    expect(loadTime).toBeLessThan(10000);
    
    // Verify dashboard elements are visible
    expect(await dashboardPage.verifySuccessfulLogin()).toBeTruthy();
  });

  test('Dashboard Error Handling', async ({ page }) => {
    // Try to access dashboard without login
    await page.goto(testData.urls.baseUrl);
    
    // Wait a bit to see if redirected
    await page.waitForTimeout(2000);
    
    // Should either be redirected to login or show login form
    const currentUrl = page.url();
    const isLoginPage = currentUrl.includes('login') || await loginPage.isLoginFormVisible();
    
    expect(isLoginPage).toBeTruthy();
  });

  test('Dashboard User Menu Functionality', async ({ page }) => {
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    await dashboardPage.waitForDashboardLoad();
    
    // Check if user menu is available
    if (await dashboardPage.isUserMenuVisible()) {
      await dashboardPage.clickUserMenu();
      await page.waitForTimeout(500);
      
      // Verify menu interaction doesn't break the page
      expect(await dashboardPage.isEMPSDHeadingVisible()).toBeTruthy();
    }
  });

  test('Dashboard Content Accessibility', async ({ page }) => {
    // Login first
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    await dashboardPage.waitForDashboardLoad();
    
    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
    
    // Check for main content landmark
    const mainContent = await page.locator('main, [role="main"]').count();
    expect(mainContent).toBeGreaterThan(0);
  });
});
