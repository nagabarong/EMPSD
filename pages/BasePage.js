const { expect } = require('../utils/helpers');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Click on an element
   * @param {string} selector - Element selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - Element selector
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of an element
   * @param {string} selector - Element selector
   * @returns {Promise<string>} Element text content
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} True if element is visible
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for specific timeout
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   */
  async screenshot(name) {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }

  /**
   * Get element by role
   * @param {string} role - Element role
   * @param {Object} options - Additional options
   * @returns {Object} Playwright locator
   */
  getByRole(role, options = {}) {
    return this.page.getByRole(role, options);
  }

  /**
   * Get element by text
   * @param {string} text - Text content
   * @returns {Object} Playwright locator
   */
  getByText(text) {
    return this.page.getByText(text);
  }

  /**
   * Get element by placeholder
   * @param {string} placeholder - Placeholder text
   * @returns {Object} Playwright locator
   */
  getByPlaceholder(placeholder) {
    return this.page.getByPlaceholder(placeholder);
  }

  /**
   * Get element by label
   * @param {string} label - Label text
   * @returns {Object} Playwright locator
   */
  getByLabel(label) {
    return this.page.getByLabel(label);
  }

  /**
   * Get element by test id
   * @param {string} testId - Test id attribute
   * @returns {Object} Playwright locator
   */
  getByTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = BasePage;
