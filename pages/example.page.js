const BasePage = require('./BasePage');

class ExamplePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Page elements
    this.selectors = {
      // Add your selectors here
      exampleButton: 'button[data-testid="example-button"]',
      exampleInput: 'input[data-testid="example-input"]',
      exampleText: '[data-testid="example-text"]'
    };

    // Alternative selectors using Playwright's getByRole
    this.locators = {
      // Add your locators here
      exampleButton: () => this.getByRole('button', { name: /example/i }),
      exampleInput: () => this.getByRole('textbox', { name: /example/i }),
      exampleText: () => this.page.locator('[data-testid="example-text"]')
    };
  }

  /**
   * Navigate to example page
   * @param {string} baseUrl - Base URL of the application
   */
  async navigateToExample(baseUrl = 'https://pln-fe.dev.embrio.id') {
    await this.goto(`${baseUrl}/example`);
    await this.waitForPageLoad();
  }

  /**
   * Click example button
   */
  async clickExampleButton() {
    try {
      await this.locators.exampleButton().click();
    } catch (error) {
      await this.click(this.selectors.exampleButton);
    }
  }

  /**
   * Fill example input
   * @param {string} text - Text to fill
   */
  async fillExampleInput(text) {
    try {
      await this.locators.exampleInput().fill(text);
    } catch (error) {
      await this.fill(this.selectors.exampleInput, text);
    }
  }

  /**
   * Get example text
   * @returns {Promise<string>} Example text
   */
  async getExampleText() {
    try {
      return await this.locators.exampleText().textContent();
    } catch (error) {
      return await this.getText(this.selectors.exampleText);
    }
  }

  /**
   * Check if example button is visible
   * @returns {Promise<boolean>} True if button is visible
   */
  async isExampleButtonVisible() {
    try {
      return await this.locators.exampleButton().isVisible();
    } catch (error) {
      return await this.isVisible(this.selectors.exampleButton);
    }
  }
}

module.exports = ExamplePage;
