const { expect } = require('./helpers');
const config = require('../config/config');

class TestUtils {
  /**
   * Wait for page to be fully loaded
   * @param {Object} page - Playwright page object
   * @param {number} timeout - Timeout in milliseconds
   */
  static async waitForPageLoad(page, timeout = 30000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Take screenshot with timestamp
   * @param {Object} page - Playwright page object
   * @param {string} name - Screenshot name
   */
  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}_${timestamp}.png`;
    await page.screenshot({ 
      path: `test-results/screenshots/${filename}`,
      fullPage: true 
    });
    return filename;
  }

  /**
   * Generate random email for testing
   * @param {string} domain - Email domain
   * @returns {string} Random email
   */
  static generateRandomEmail(domain = 'test.com') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `test_${timestamp}_${random}@${domain}`;
  }

  /**
   * Generate random string
   * @param {number} length - String length
   * @returns {string} Random string
   */
  static generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Wait for element to be visible with custom timeout
   * @param {Object} page - Playwright page object
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  static async waitForElement(page, selector, timeout = 10000) {
    await page.waitForSelector(selector, { 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Wait for element to be hidden
   * @param {Object} page - Playwright page object
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  static async waitForElementHidden(page, selector, timeout = 10000) {
    await page.waitForSelector(selector, { 
      state: 'hidden', 
      timeout 
    });
  }

  /**
   * Clear all cookies and local storage
   * @param {Object} page - Playwright page object
   */
  static async clearBrowserData(page) {
    const context = page.context();
    await context.clearCookies();

    // Best-effort: clear storage only on secure/documented origins to avoid SecurityError
    const currentUrl = page.url();
    const isHttpOrigin = /^https?:\/\//i.test(currentUrl);

    if (isHttpOrigin) {
      try {
        await page.evaluate(() => {
          try { window.localStorage && window.localStorage.clear(); } catch (_) {}
          try { window.sessionStorage && window.sessionStorage.clear(); } catch (_) {}
        });
      } catch (_) {
        // Ignore storage SecurityError
      }
    }

    // Ensure future navigations start with clean storage as early as possible
    try {
      await context.addInitScript(() => {
        try { window.localStorage && window.localStorage.clear(); } catch (_) {}
        try { window.sessionStorage && window.sessionStorage.clear(); } catch (_) {}
      });
    } catch (_) {
      // Ignore if adding script fails or already added
    }
  }

  /**
   * Get current timestamp
   * @returns {string} Current timestamp
   */
  static getCurrentTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Format test name for better readability
   * @param {string} testName - Original test name
   * @returns {string} Formatted test name
   */
  static formatTestName(testName) {
    return testName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  /**
   * Retry function with exponential backoff
   * @param {Function} fn - Function to retry
   * @param {number} maxRetries - Maximum number of retries
   * @param {number} delay - Initial delay in milliseconds
   * @returns {Promise} Function result
   */
  static async retry(fn, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Check if element exists without throwing error
   * @param {Object} page - Playwright page object
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} True if element exists
   */
  static async elementExists(page, selector) {
    try {
      await page.waitForSelector(selector, { timeout: 1000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get element text safely
   * @param {Object} page - Playwright page object
   * @param {string} selector - Element selector
   * @returns {Promise<string|null>} Element text or null
   */
  static async getElementText(page, selector) {
    try {
      const element = await page.$(selector);
      if (element) {
        return await element.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Wait for network to be idle
   * @param {Object} page - Playwright page object
   * @param {number} timeout - Timeout in milliseconds
   */
  static async waitForNetworkIdle(page, timeout = 30000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Scroll element into view
   * @param {Object} page - Playwright page object
   * @param {string} selector - Element selector
   */
  static async scrollIntoView(page, selector) {
    await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, selector);
  }
}

module.exports = TestUtils;
