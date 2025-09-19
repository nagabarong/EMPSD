const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Page elements
    this.selectors = {
      emailInput: 'input[type="email"], input[name="email"], [placeholder*="email"], [placeholder*="Email"]',
      passwordInput: 'input[type="password"], input[name="password"]',
      loginButton: 'button[type="submit"], button:has-text("Masuk"), button:has-text("Login"), button:has-text("Sign In")',
      togglePasswordButton: 'button[aria-label*="password"], button:has-text("Toggle password visibility"), button[title*="password"]',
      errorMessage: '.error, .alert, [role="alert"]',
      pageTitle: 'h1, h2, [data-testid="page-title"]'
    };

    // Alternative selectors using Playwright's getByRole
    this.locators = {
      emailInput: () => this.getByRole('textbox', { name: /alamat email|email|username/i }),
      passwordInput: () => this.getByRole('textbox', { name: /password|kata sandi/i }),
      loginButton: () => this.getByRole('button', { name: /masuk|login|sign in/i }),
      togglePasswordButton: () => this.getByRole('button', { name: /toggle password visibility|show password/i }),
      errorMessage: () => this.page.locator('[role="alert"], .error, .alert'),
      pageTitle: () => this.page.locator('h1, h2, [data-testid="page-title"]')
    };
  }

  /**
   * Navigate to login page
   * @param {string} baseUrl - Base URL of the application
   */
  async navigateToLogin(baseUrl = 'https://pln-fe.dev.embrio.id') {
    await this.goto(`${baseUrl}/login?redirect=%2F`);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to home page
   * @param {string} baseUrl - Base URL of the application
   */
  async navigateToHome(baseUrl = 'https://pln-fe.dev.embrio.id') {
    await this.goto(baseUrl);
    await this.waitForPageLoad();
  }

  /**
   * Fill email input field
   * @param {string} email - Email address
   */
  async enterEmail(email) {
    try {
      // Try using locator first (more reliable)
      await this.locators.emailInput().click();
      await this.locators.emailInput().fill(email);
    } catch (error) {
      // Fallback to selector
      await this.click(this.selectors.emailInput);
      await this.fill(this.selectors.emailInput, email);
    }
  }

  /**
   * Fill password input field
   * @param {string} password - Password
   */
  async enterPassword(password) {
    try {
      // Try using locator first (more reliable)
      await this.locators.passwordInput().click();
      await this.locators.passwordInput().fill(password);
    } catch (error) {
      // Fallback to selector
      await this.click(this.selectors.passwordInput);
      await this.fill(this.selectors.passwordInput, password);
    }
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    try {
      await this.locators.loginButton().click();
    } catch (error) {
      await this.click(this.selectors.loginButton);
    }
  }

  /**
   * Check if login button is disabled
   * @returns {Promise<boolean>} True if disabled
   */
  async isLoginButtonDisabled() {
    try {
      return await this.locators.loginButton().isDisabled();
    } catch (error) {
      try {
        const locator = this.page.locator(this.selectors.loginButton);
        return await locator.isDisabled();
      } catch (_) {
        // Fallback: check disabled attribute via evaluate
        try {
          return await this.page.evaluate((selector) => {
            const el = document.querySelector(selector);
            if (!el) return false;
            return el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true';
          }, this.selectors.loginButton);
        } catch (__){
          return false;
        }
      }
    }
  }

  /**
   * Toggle password visibility
   */
  async togglePasswordVisibility() {
    try {
      await this.locators.togglePasswordButton().click();
    } catch (error) {
      await this.click(this.selectors.togglePasswordButton);
    }
  }

  /**
   * Perform login with credentials
   * @param {string} email - Email address
   * @param {string} password - Password
   * @param {boolean} togglePassword - Whether to toggle password visibility
   */
  async login(email, password, togglePassword = true) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    
    if (togglePassword) {
      await this.togglePasswordVisibility();
    }
    
    await this.clickLoginButton();
    await this.wait(1000); // Wait for login to process
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message
   */
  async getErrorMessage() {
    try {
      return await this.locators.errorMessage().textContent();
    } catch (error) {
      return await this.getText(this.selectors.errorMessage);
    }
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorMessageVisible() {
    try {
      return await this.locators.errorMessage().isVisible();
    } catch (error) {
      return await this.isVisible(this.selectors.errorMessage);
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
   * Check if login form is visible
   * @returns {Promise<boolean>} True if login form is visible
   */
  async isLoginFormVisible() {
    try {
      return await this.locators.emailInput().isVisible() && 
             await this.locators.passwordInput().isVisible() && 
             await this.locators.loginButton().isVisible();
    } catch (error) {
      return await this.isVisible(this.selectors.emailInput) && 
             await this.isVisible(this.selectors.passwordInput) && 
             await this.isVisible(this.selectors.loginButton);
    }
  }

  /**
   * Clear all form fields
   */
  async clearForm() {
    try {
      await this.locators.emailInput().clear();
      await this.locators.passwordInput().clear();
    } catch (error) {
      await this.fill(this.selectors.emailInput, '');
      await this.fill(this.selectors.passwordInput, '');
    }
  }
}

module.exports = LoginPage;
