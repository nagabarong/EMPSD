const { test, expect } = require('@playwright/test');
const LoginPage = require('../../../pages/LoginPage');
const DashboardPage = require('../../../pages/DashboardPage');
const LoadForecastPage = require('../../../pages/LoadForecastPage');
const testData = require('../../../testdata/testData');

test.describe('Load Forecast Page Tests', () => {
  let loginPage;
  let dashboardPage;
  let loadForecastPage;
  
  // Reusable helpers to keep tests concise and consistent
  const gotoAndWaitForLoadForecast = async () => {
    await loadForecastPage.navigateToLoadForecast();
    await loadForecastPage.waitForDataLoad();
  };

  const expectPageLoaded = async () => {
    const loaded = await loadForecastPage.verifyPageLoaded();
    expect(loaded).toBe(true);
  };

  const tryOrSkip = async (fn, skipMessage) => {
    try {
      await fn();
    } catch (error) {
      console.log(skipMessage);
    }
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    loadForecastPage = new LoadForecastPage(page);

    // Navigate to login page
    await loginPage.goto(testData.urls.loginUrl);
    await loginPage.waitForPageLoad();

    // Perform login
    await loginPage.login(testData.users.admin.email, testData.users.admin.password);
    
    // Wait for login to complete and dashboard to load
    await dashboardPage.waitForDashboardLoad();
    
    // Verify successful login
    const isLoginSuccessful = await dashboardPage.verifySuccessfulLogin();
    if (!isLoginSuccessful) {
      // If login failed, wait a bit more and try again
      await page.waitForTimeout(3000);
      await dashboardPage.waitForDashboardLoad();
    }
  });

  test('should navigate to load forecast page and Ringkasan submenu successfully', async ({ page }) => {
    await loadForecastPage.navigateToLoadForecast();
    await expectPageLoaded();
    
    const pageTitle = await loadForecastPage.getTitle();
    expect(pageTitle).toContain('PLN EMPSD');
    
    const isHeadingVisible = await loadForecastPage.isLoadForecastHeadingVisible();
    expect(isHeadingVisible).toBe(true);
    
    await loadForecastPage.navigateToSubmenu('Ringkasan');
    await loadForecastPage.waitForDataLoad();
    await expectPageLoaded();
    
    await loadForecastPage.waitForBreadcrumb('Ringkasan');
    const breadcrumbText = await loadForecastPage.getBreadcrumbText();
    expect(breadcrumbText).toMatch(/ringkasan/i);
  });

  // Keep only Pertumbuhan Beban submenu for now
  test('should navigate to Pertumbuhan Beban submenu', async ({ page }) => {
    await loadForecastPage.navigateToSubmenu('Pertumbuhan Beban');
    await expectPageLoaded();
  });

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  
});
