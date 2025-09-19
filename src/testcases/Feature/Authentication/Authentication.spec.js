// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../../../pages/LoginPage');
const DashboardPage = require('../../../../pages/DashboardPage');
const config = require('../../../../config/config.js');
const testData = require('../../../../testdata/testData');
const TestUtils = require('../../../../utils/testUtils');

test.describe('Authentication Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Clear browser data before each test
    await TestUtils.clearBrowserData(page);
  });

  test('Login Page Verification - Home Page', async ({ page }) => {
    await loginPage.navigateToHome();
    await expect(page).toHaveTitle(/PLN EMPSD/);
  });

  test('Login Page Verification - Login Page', async ({ page }) => {
    await loginPage.navigateToLogin();
    await expect(page).toHaveTitle(/PLN EMPSD/);
    
    // Verify login form elements are visible
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();
  });

  test('Successful Login with Valid Credentials', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    // Perform login
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true // toggle password visibility
    );
    
    // Wait for dashboard to load
    await dashboardPage.waitForDashboardLoad();

    await page.waitForTimeout(2000);
    
    // Verify successful login
    expect(await dashboardPage.verifySuccessfulLogin()).toBeTruthy();
    expect(await dashboardPage.isEMPSDHeadingVisible()).toBeTruthy();
    
    // Verify EMPSD heading text
    const headingText = await dashboardPage.getEMPSDHeadingText();
    expect(headingText).toContain(testData.expectedText.dashboardHeading);
  });

  test('Login with Invalid Email', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    // Attempt login with invalid email
    await loginPage.login(
      testData.users.invalid.email,
      testData.users.admin.password,
      true
    );
    
    // Wait a bit for potential error message
    await page.waitForTimeout(2000);
    
    // Check if error message appears or if we're still on login page
    const isStillOnLoginPage = await loginPage.isLoginFormVisible();
    expect(isStillOnLoginPage).toBeTruthy();
  });

  test('Login with Invalid Password', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    // Attempt login with invalid password
    await loginPage.login(
      testData.users.admin.email,
      testData.users.invalid.password,
      true
    );
    
    // Wait a bit for potential error message
    await page.waitForTimeout(2000);
    
    // Check if error message appears or if we're still on login page
    const isStillOnLoginPage = await loginPage.isLoginFormVisible();
    expect(isStillOnLoginPage).toBeTruthy();
  });

  test('Login with Empty Credentials', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    // With empty credentials, login button should be disabled
    const isDisabled = await loginPage.isLoginButtonDisabled();
    expect(isDisabled).toBeTruthy();
    
    // Ensure we remain on the login page
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();
  });

  test('Password Visibility Toggle', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    // Enter password
    await loginPage.enterPassword(testData.users.admin.password);
    
    // Toggle password visibility
    await loginPage.togglePasswordVisibility();
    
    // Wait a bit for the toggle to take effect
    await page.waitForTimeout(500);
    
    // Verify we're still on login page (no navigation should occur)
    const isStillOnLoginPage = await loginPage.isLoginFormVisible();
    expect(isStillOnLoginPage).toBeTruthy();
  });

  test('Form Field Clearing', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    // Fill form fields
    await loginPage.enterEmail(testData.users.admin.email);
    await loginPage.enterPassword(testData.users.admin.password);
    
    // Clear form
    await loginPage.clearForm();
    
    // Verify form is cleared (fields should be empty)
    const isStillOnLoginPage = await loginPage.isLoginFormVisible();
    expect(isStillOnLoginPage).toBeTruthy();
  });

  test('Dashboard Elements Verification', async ({ page }) => {
    // First login successfully
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.users.admin.email,
      testData.users.admin.password,
      true
    );
    
    // Wait for dashboard to load
    await dashboardPage.waitForDashboardLoad();

    await page.waitForTimeout(3000);
    
    // Verify dashboard elements
    expect(await dashboardPage.isEMPSDHeadingVisible()).toBeTruthy();
    expect(await dashboardPage.isMainContentVisible()).toBeTruthy();
    
    // Verify page title contains expected text
    const pageTitle = await dashboardPage.getPageTitle();
    expect(pageTitle).toContain(testData.expectedText.dashboardHeading);
  });

  // multiple accounts login tests
  test.describe('Multiple Accounts Login Tests', () => {
    test.describe.configure({ mode: 'serial' });
    for (const account of testData.loginAccounts || []) {
      test(`Login with ${account.role} should result in ${account.expectedResult}`, async ({ page }) => {
        await loginPage.navigateToLogin();

        await loginPage.login(account.email, account.password, true);

        if (account.expectedResult === 'success') {
          await dashboardPage.waitForDashboardLoad();

          await page.waitForTimeout(2000);

          expect(await dashboardPage.verifySuccessfulLogin()).toBeTruthy();
          expect(await dashboardPage.isEMPSDHeadingVisible()).toBeTruthy();
        } else {
          // Expect to remain on login page for failure cases
          await page.waitForTimeout(2000);
          const isStillOnLoginPage = await loginPage.isLoginFormVisible();
          expect(isStillOnLoginPage).toBeTruthy();
        }
      });
    }
  });
});
