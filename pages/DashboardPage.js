const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Page elements
    this.selectors = {
      pageTitle: 'h1, h2, [data-testid="page-title"]',
      empsdHeading: 'h1:has-text("EMPSD"), h2:has-text("EMPSD"), [data-testid="empsd-heading"]',
      userMenu: '[data-testid="user-menu"], .user-menu, .profile-menu',
      logoutButton: 'button:has-text("Logout"), button:has-text("Keluar"), a:has-text("Logout")',
      navigationMenu: 'nav, .navigation, .sidebar',
      mainContent: 'main, .main-content, .dashboard-content'
    };

    // Alternative selectors using Playwright's getByRole
    this.locators = {
      pageTitle: () => this.page.locator('h1, h2, [data-testid="page-title"]'),
      empsdHeading: () => this.getByRole('heading', { name: /empsd/i }),
      userMenu: () => this.page.locator('[data-testid="user-menu"], .user-menu, .profile-menu'),
      logoutButton: () => this.getByRole('button', { name: /logout|keluar/i }),
      navigationMenu: () => this.page.locator('nav, .navigation, .sidebar'),
      mainContent: () => this.page.locator('main, .main-content, .dashboard-content')
    };
  }

  /**
   * Check if EMPSD heading is visible
   * @returns {Promise<boolean>} True if EMPSD heading is visible
   */
  async isEMPSDHeadingVisible() {
    try {
      return await this.locators.empsdHeading().isVisible();
    } catch (error) {
      return await this.isVisible(this.selectors.empsdHeading);
    }
  }

  /**
   * Get EMPSD heading text
   * @returns {Promise<string>} EMPSD heading text
   */
  async getEMPSDHeadingText() {
    try {
      return await this.locators.empsdHeading().textContent();
    } catch (error) {
      return await this.getText(this.selectors.empsdHeading);
    }
  }

  /**
   * Get page title text
   * @returns {Promise<string>} Page title
   */
  async getPageTitle() {
    try {
      return await this.locators.pageTitle().textContent();
    } catch (error) {
      return await this.getText(this.selectors.pageTitle);
    }
  }

  /**
   * Check if user menu is visible
   * @returns {Promise<boolean>} True if user menu is visible
   */
  async isUserMenuVisible() {
    try {
      return await this.locators.userMenu().isVisible();
    } catch (error) {
      return await this.isVisible(this.selectors.userMenu);
    }
  }

  /**
   * Click on user menu
   */
  async clickUserMenu() {
    try {
      await this.locators.userMenu().click();
    } catch (error) {
      await this.click(this.selectors.userMenu);
    }
  }

  /**
   * Click logout button
   */
  async clickLogout() {
    try {
      await this.locators.logoutButton().click();
    } catch (error) {
      await this.click(this.selectors.logoutButton);
    }
  }

  /**
   * Perform logout
   */
  async logout() {
    if (await this.isUserMenuVisible()) {
      await this.clickUserMenu();
      await this.wait(500); // Wait for menu to appear
    }
    await this.clickLogout();
    await this.waitForPageLoad();
  }

  /**
   * Check if navigation menu is visible
   * @returns {Promise<boolean>} True if navigation menu is visible
   */
  async isNavigationVisible() {
    try {
      return await this.locators.navigationMenu().isVisible();
    } catch (error) {
      return await this.isVisible(this.selectors.navigationMenu);
    }
  }

  /**
   * Check if main content is visible
   * @returns {Promise<boolean>} True if main content is visible
   */
  async isMainContentVisible() {
    try {
      return await this.locators.mainContent().isVisible();
    } catch (error) {
      return await this.isVisible(this.selectors.mainContent);
    }
  }

  /**
   * Wait for dashboard to load completely
   */
  async waitForDashboardLoad() {
    await this.waitForPageLoad();
    // Wait for key dashboard elements to be visible
    await this.page.waitForFunction(() => {
      const heading = document.querySelector('h1, h2, [data-testid="page-title"]');
      return heading && heading.textContent.includes('EMPSD');
    }, { timeout: 10000 });
  }

  /**
   * Verify successful login by checking dashboard elements
   * @returns {Promise<boolean>} True if login was successful
   */
  async verifySuccessfulLogin() {
    try {
      const isHeadingVisible = await this.isEMPSDHeadingVisible();
      const isMainContentVisible = await this.isMainContentVisible();
      
      return isHeadingVisible && isMainContentVisible;
    } catch (error) {
      return false;
    }
  }
}

module.exports = DashboardPage;
